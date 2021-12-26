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
}
