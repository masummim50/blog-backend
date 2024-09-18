import { Types } from "mongoose";

export type ReplyType = {
    content: string;
    author: Types.ObjectId;
    comment: Types.ObjectId;
    likes: Types.ObjectId[];
    shares: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
};