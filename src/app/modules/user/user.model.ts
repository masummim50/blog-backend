import { Schema, model, Types } from 'mongoose';
import { userType } from './user.interface';

const userSchema = new Schema<userType>(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    posts: [{ type: Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
    replies: [{ type: Types.ObjectId, ref: 'Reply' }],
    communities: [{ type: Types.ObjectId, ref: 'Community' }],
    followers: [{ type: Types.ObjectId, ref: 'User' }],
    following: [{ type: Types.ObjectId, ref: 'User' }],
    sharedPosts: [{ type: Types.ObjectId, ref: 'Post' }],
    coverImage: { type: String, default: '' },
    avatarImage: { type: String, default: '' },
    info: { type: String, default: '' },
  },
  { timestamps: true }
);

export const userModel = model<userType>('User', userSchema);
