import { Schema, model, Types } from 'mongoose';
import { ReplyType } from './replies.interface';


const replySchema = new Schema<ReplyType>({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
    likes: [{ type: Types.ObjectId, ref: 'User' }],
    shares: [{ type: Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const replyModel = model<ReplyType>('Reply', replySchema);