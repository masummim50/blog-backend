import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { communitiesServices } from './communities.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { replyServies } from './replies.service';

const createReply = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userid;
  const data = await replyServies.createReply(userId, req.body);

  sendResponse(res, httpStatus.OK, true, 'Reply created successfully', data);
});

export const repliesController = {
  createReply,
};
