export interface Post {
  createdAt: string;
  updatedAt: string;
  identifier: string;
  title: string;
  slug: string;
  // ? means optional
  body?: string;
  subName: string;
  username: string;
  // virtual fields
  url: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
}

export interface User {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
