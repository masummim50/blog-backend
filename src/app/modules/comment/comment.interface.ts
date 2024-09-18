import {  Types } from 'mongoose';

export type CommentType = {
    content: string;
    author: Types.ObjectId;
    post: Types.ObjectId;
    replies: Types.ObjectId[];
    likes: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
};

