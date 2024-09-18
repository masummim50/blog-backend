import { CommentType } from "./comment.interface";
import { model, Schema, Types } from 'mongoose';

const commentSchema = new Schema<CommentType>({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    replies: [{ type: Types.ObjectId, ref: 'Reply' }],
    likes: [{ type: Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const commentModel = model<CommentType>('Comment', commentSchema);