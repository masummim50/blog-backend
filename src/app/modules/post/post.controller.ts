/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { postService } from './post.service';

const createPost = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any)._id;
  const postData = { ...req.body, author: (req.user as any)._id };

  const data = await postService.createPost(postData, userId);
  sendResponse(res, httpStatus.OK, true, 'post created Successfully', data);
  sendResponse(res, httpStatus.OK, true, 'post created Successfully', {});
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  console.log('page params: ', req.query);
  const page =
    parseInt(
      (Array.isArray(req.query?.page)
        ? req.query.page[0]
        : req.query?.page) as string,
      10
    ) || 1;

  const limit = 3;
  const skip = (page - 1) * limit;
  const { posts, totalPosts } = await postService.getAllPosts(limit, skip);

  const totalPages = Math.ceil(totalPosts / limit);

  // Determine the next page; if there's no more data, set it to null
  const nextPage = page < totalPages ? page + 1 : null;

  // Create the meta object
  const meta = {
    page: page,
    size: limit,
    total: totalPosts,
    totalPage: totalPages,
  };

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'posts retrieved Successfully',
    posts,
    meta
  );
});
const getPostsByCommunityId = catchAsync(
  async (req: Request, res: Response) => {
    console.log('page params: ', req.query);
    const id = req.params.id;
    const page =
      parseInt(
        (Array.isArray(req.query?.page)
          ? req.query.page[0]
          : req.query?.page) as string,
        10
      ) || 1;

    const limit = 3;
    const skip = (page - 1) * limit;
    const { posts, totalPosts } = await postService.getPostsByCommunityId(
      id,
      limit,
      skip
    );

    const totalPages = Math.ceil(totalPosts / limit);

    // Determine the next page; if there's no more data, set it to null
    const nextPage = page < totalPages ? page + 1 : null;

    // Create the meta object
    const meta = {
      page: page,
      size: limit,
      total: totalPosts,
      totalPage: totalPages,
    };

    sendResponse(
      res,
      httpStatus.OK,
      true,
      'community Posts retrieved Successfully',
      posts,
      meta
    );
  }
);
const getSharedPosts = catchAsync(async (req: Request, res: Response) => {
  console.log('page params: ', req.query);
  const userName = req.params.username;
  const page =
    parseInt(
      (Array.isArray(req.query?.page)
        ? req.query.page[0]
        : req.query?.page) as string,
      10
    ) || 1;

  const limit = 3;
  const skip = (page - 1) * limit;
  const { posts, totalPosts } = await postService.getSharedPosts(
    userName,
    limit,
    skip
  );

  const totalPages = Math.ceil(totalPosts / limit);

  // Determine the next page; if there's no more data, set it to null
  const nextPage = page < totalPages ? page + 1 : null;

  // Create the meta object
  const meta = {
    page: page,
    size: limit,
    total: totalPosts,
    totalPage: totalPages,
  };

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'posts retrieved Successfully',
    posts,
    meta
  );
});

const getTrendingPosts = catchAsync(async (req: Request, res: Response) => {
  console.log('page params: ', req.query);
  const page =
    parseInt(
      (Array.isArray(req.query?.page)
        ? req.query.page[0]
        : req.query?.page) as string,
      10
    ) || 1;

  const limit = 3;
  const skip = (page - 1) * limit;
  const { posts, totalPosts } = await postService.getTrendingPosts(limit, skip);

  const totalPages = Math.ceil(totalPosts / limit);

  // Determine the next page; if there's no more data, set it to null
  const nextPage = page < totalPages ? page + 1 : null;

  // Create the meta object
  const meta = {
    page: page,
    size: limit,
    total: totalPosts,
    totalPage: totalPages,
  };

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Trending posts retrieved Successfully',
    posts,
    meta
  );
});
const getTrendingPostsByTag = catchAsync(
  async (req: Request, res: Response) => {
    console.log('page params: ', req.query);
    const tag = req.params.tag;
    const page =
      parseInt(
        (Array.isArray(req.query?.page)
          ? req.query.page[0]
          : req.query?.page) as string,
        10
      ) || 1;

    const limit = 3;
    const skip = (page - 1) * limit;
    const { posts, totalPosts } = await postService.getTrendingPostsByTag(
      tag,
      limit,
      skip
    );

    const totalPages = Math.ceil(totalPosts / limit);

    // Determine the next page; if there's no more data, set it to null
    const nextPage = page < totalPages ? page + 1 : null;

    // Create the meta object
    const meta = {
      page: page,
      size: limit,
      total: totalPosts,
      totalPage: totalPages,
    };

    sendResponse(
      res,
      httpStatus.OK,
      true,
      'trending posts by tag retrieved Successfully',
      posts,
      meta
    );
  }
);

const getPostById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await postService.getPostById(id);
  sendResponse(res, httpStatus.OK, true, 'post created Successfully', data);
});

const getPostsByUserId = catchAsync(async (req: Request, res: Response) => {
  console.log('page params: ', req.query);
  const page =
    parseInt(
      (Array.isArray(req.query?.page)
        ? req.query.page[0]
        : req.query?.page) as string,
      10
    ) || 1;

  const limit = 3;
  const skip = (page - 1) * limit;
  const { posts, totalPosts } = await postService.getPostsByUserId(
    req.params.id,
    limit,
    skip
  );

  const totalPages = Math.ceil(totalPosts / limit);

  // Determine the next page; if there's no more data, set it to null
  const nextPage = page < totalPages ? page + 1 : null;

  // Create the meta object
  const meta = {
    page: page,
    size: limit,
    total: totalPosts,
    totalPage: totalPages,
  };

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'posts retrieved Successfully',
    posts,
    meta
  );
});

const likePost = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any)._id;
  const data = await postService.likePost(req.params.id, userId);
  sendResponse(res, httpStatus.OK, true, 'post liked Successfully', data);
});
const unLikePost = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any)._id;
  const data = await postService.unLikePost(req.params.id, userId);
  sendResponse(res, httpStatus.OK, true, 'post liked Successfully', data);
});
const sharePost = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any)._id;
  const postId = req.params.id;
  const data = await postService.sharePost(postId, userId);
  sendResponse(res, httpStatus.OK, true, 'post shared Successfully', data);
});

export const postController = {
  getAllPosts,
  createPost,
  getPostById,
  getPostsByUserId,
  likePost,
  unLikePost,
  getTrendingPosts,
  getTrendingPostsByTag,
  sharePost,
  getSharedPosts,
  getPostsByCommunityId,
};
