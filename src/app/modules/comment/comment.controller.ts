/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import { commentService } from './comment.service';

const getAllComments = catchAsync(async (req: Request, res: Response) => {
  const data = await commentService.getAllComments();
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'comments retrieved Successfully',
    data
  );
});

const createComment = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const data = await commentService.createComment(
    {
      ...req.body,
      author: userId,
    },
    userId
  );
  sendResponse(res, httpStatus.OK, true, 'comment posted Successfully', data);
});

export const commentController = {
  getAllComments,
  createComment,
};
