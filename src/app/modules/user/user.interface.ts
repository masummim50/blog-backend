import { Types } from 'mongoose';

export type userType = {
  userName: string;
  email: string;
  password?: string;
  posts: Types.ObjectId[];
  comments: Types.ObjectId[];
  replies: Types.ObjectId[];
  communities: Types.ObjectId[];
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  sharedPosts: Types.ObjectId[];
  coverImage: string;
  avatarImage: string;
  info: string;
};
