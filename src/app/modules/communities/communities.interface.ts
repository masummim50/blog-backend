import mongoose, { Types } from 'mongoose';

export type CommunityType = {
  name: string;
  rules: string[];
  image: string;
  coverImage: string;
  description: string;
  creator: mongoose.Types.ObjectId;
  members: Types.ObjectId[];
  posts: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};
