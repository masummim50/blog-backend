import { Schema, model, Types } from 'mongoose';
import { postType } from './post.interface';

const postSchema = new Schema<postType>(
  {
    title: { type: String, required: true },
    image: { type: String },
    lowImage: { type: String },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
    replies: [{ type: Types.ObjectId, ref: 'Reply' }],
    likes: [{ type: Types.ObjectId, ref: 'User' }],
    shares: [{ type: Types.ObjectId, ref: 'User' }],
    tags: [{ type: String, required: true }],
    community: { type: Types.ObjectId, ref: 'Community', default: null },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const postModel = model<postType>('Post', postSchema);
