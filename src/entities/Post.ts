import { Exclude, Expose } from 'class-transformer';
import {
  Entity as TOEntity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  OneToMany,
  AfterLoad,
} from 'typeorm';
import { makeId, slugify } from '../util/helpers';
import Comment from './Comment';
import Entity from './Entity';
import Sub from './Sub';
import User from './User';
import Vote from './Vote';

@TOEntity('posts')
export default class Post extends Entity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }

  @Index()
  @Column()
  identifier: string; // 7 character Id

  @Column()
  title: string;

  @Index()
  @Column()
  slug: string;

  @Column({ nullable: true, type: 'text' })
  body: string;

  @Column()
  subName: string;

  @Column()
  username: string;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
  sub: Sub;

  // @Exclude()
  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  // using transformer
  @Expose() get url(): string {
    return `/r/${this.subName}/${this.identifier}/${this.slug}`;
  }

  @Expose() get commentCount(): number {
    return this.comments?.length;
  }

  // total vote score
  @Expose() get voteScore(): number {
    return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), 0);
  }

  protected userVote: number;
  setUserVote(user: User) {
    // checks if there is current user voted or not and gives the current voted user index
    // is user sends vote_value 0 then votes will be removed so username won't match and gives index = -1
    const index = this.votes?.findIndex((v) => v.username === user.username);
    // if username not matched then index=-1
    // username matches, gives the indexes in votes array
    // userVote will be the value of vote by current user
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }
  // NOTE: OR
  // protected url: string;
  // @AfterLoad()
  // createFields() {
  //   this.url = `/r/${this.subName}/${this.identifier}/${this.slug}`;
  // }

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(7);
    this.slug = slugify(this.title);
  }
}
