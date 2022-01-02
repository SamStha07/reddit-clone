import { Request, Response, Router } from 'express';
import Comment from '../entities/Comment';
import Post from '../entities/Post';
import User from '../entities/User';
import Vote from '../entities/Vote';
import auth from '../middleware/auth';
import user from '../middleware/user';

const vote = async (req: Request, res: Response) => {
  const { post_identifier, post_slug, comment_identifier, vote_value } =
    req.body;

  // validate vote value
  if (![-1, 0, 1].includes(vote_value)) {
    return res.status(400).json({ value: 'Value must be -1, 0 or 1' });
  }

  try {
    const user: User = res.locals.user;
    let post = await Post.findOneOrFail({
      identifier: post_identifier,
      slug: post_slug,
    });
    let vote: Vote | undefined;
    let comment: Comment | undefined;

    if (comment_identifier) {
      // find vote by comment
      comment = await Comment.findOneOrFail({ identifier: comment_identifier });
      vote = await Vote.findOne({ user, comment });
    } else {
      // find vote by post
      vote = await Vote.findOne({ user, post });
    }

    console.log('vote', vote);

    if (!vote && vote_value === 0) {
      return res.status(404).json({ error: 'Vote not found' });
    } else if (!vote) {
      // if no vote create it
      vote = new Vote({ user, value: vote_value });
      if (comment) vote.comment = comment;
      else vote.post = post;
      await vote.save();
    } else if (vote_value === 0) {
      // if vote exists and value = 0 remove vote from DB
      await vote.remove();
    } else if (vote.value !== vote_value) {
      // if vote and vote_value has changed then update vote
      vote.value = vote_value;
      await vote.save();
    }
    post = await Post.findOneOrFail(
      { identifier: post_identifier, slug: post_slug },
      { relations: ['comments', 'comments.votes', 'sub', 'votes'] }
    );
    post.setUserVote(user);
    post.comments.forEach((c) => c.setUserVote(user));

    return res.json(post);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const router = Router();
router.post('/', user, auth, vote);

export default router;
