/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { communitiesServices } from './communities.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { unsubscribe } from 'diagnostics_channel';

const createCommunity = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any)._id;
  const communityData = { ...req.body, creator: userId };
  const data = await communitiesServices.createCommunity(communityData);

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Community created successfully',
    data
  );
});

const updateCommunityById = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any)._id;
  const communityId = req.params.id;
  const update = req.body;
  const data = await communitiesServices.updateCommunityById(
    communityId,
    userId,
    update
  );

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Community updated successfully',
    data
  );
});
const getAllCommunity = catchAsync(async (req: Request, res: Response) => {
  const data = await communitiesServices.getAllCommunity();

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Community created successfully',
    data
  );
});

const getUsersCommunities = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userid;
  const data = await communitiesServices.getUsersCommunities(userId);

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Communities retrieved successfully',
    data
  );
});

const getCommunitiesCreatedByUser = catchAsync(
  async (req: Request, res: Response) => {
    const userId = (req.user as any)._id;
    const data = await communitiesServices.getCommunitiesCreatedByUser(userId);

    sendResponse(
      res,
      httpStatus.OK,
      true,
      'Communities retrieved successfully',
      data
    );
  }
);

const getCommunityById = catchAsync(async (req: Request, res: Response) => {
  const communityId = req.params.id;
  const data = await communitiesServices.getCommunityById(communityId);

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Community retrieved successfully',
    data
  );
});

const subscribe = catchAsync(async (req: Request, res: Response) => {
  const communityId = req.params.id;
  const userId = (req.user as any)._id;
  const data = await communitiesServices.subscribe(userId, communityId);

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Community subscribed successfully',
    data
  );
});

const unSubscribe = catchAsync(async (req: Request, res: Response) => {
  const communityId = req.params.id;
  const userId = (req.user as any)._id;
  const data = await communitiesServices.unSubscribe(userId, communityId);

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Community un-subscribed successfully',
    data
  );
});

export const communitiesController = {
  getUsersCommunities,
  createCommunity,
  getCommunitiesCreatedByUser,
  getAllCommunity,
  getCommunityById,
  subscribe,
  unSubscribe,
  updateCommunityById,
};
