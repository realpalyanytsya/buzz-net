import type { Post, Community, User, Vote, Comment } from '@prisma/client';

export interface CommunityPost extends Post {
  community: Community;
  votes: Vote[];
  author: User;
  comments: Comment[];
}

export type PostTitle = Pick<Post, 'title'>['title'];
export type PostId = Pick<Post, 'id'>['id'];
export type PostCreatedAt = Pick<Post, 'createdAt'>['createdAt'];
export type PostContent = Pick<Post, 'content'>['content'];

export type AuthorUsername = Pick<User, 'username'>['username'];