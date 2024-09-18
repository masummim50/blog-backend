import { Types } from 'mongoose';

export type postType = {
  title: string;
  image: string;
  lowImage: string;
  content: string;
  author: Types.ObjectId;
  comments: Types.ObjectId[];
  replies: Types.ObjectId[];
  likes: Types.ObjectId[];
  shares: Types.ObjectId[];
  tags: string[];
  community: Types.ObjectId[] | null;
  views: number;
  createdAt: Date;
  updatedAt: Date;
};
