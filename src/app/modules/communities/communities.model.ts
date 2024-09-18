import { Schema, model, Types } from 'mongoose';
import { CommunityType } from './communities.interface';

const communitySchema = new Schema<CommunityType>({
  name: { type: String, required: true },
  rules: [{ type: String }],
  image: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  members: [{ type: Types.ObjectId, ref: 'User' }],
  posts: [{ type: Types.ObjectId, ref: 'Post' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const communityModel = model<CommunityType>(
  'Community',
  communitySchema
);
