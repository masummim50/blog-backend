/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { postModel } from './post.model';
import { postType } from './post.interface';
import { userModel } from '../user/user.model';
import { communityModel } from '../communities/communities.model';

const createPost = async (
  post: postType,
  userId: string
): Promise<postType> => {
  const newPost = await postModel.create(post);
  await userModel.findByIdAndUpdate(userId, {
    $push: { posts: newPost._id },
  });
  if (post.community) {
    await communityModel.findByIdAndUpdate(post.community, {
      $push: { posts: newPost._id },
    });
  }
  return newPost;
};
const getAllPosts = async (limit: number, skip: number) => {
  const totalPosts = await postModel.find({}).countDocuments();
  const posts = await postModel
    .find({})
    .populate('author')
    .select('-password')
    .populate('community')
    .select('_id name')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  return { posts, totalPosts };
};
const getPostsByCommunityId = async (
  communityId: string,
  limit: number,
  skip: number
) => {
  const totalPosts = await postModel
    .find({ community: communityId })
    .countDocuments();
  const posts = await postModel
    .find({ community: communityId })
    .populate('author')
    .select('-password')
    .populate('community')
    .select('_id name')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  return { posts, totalPosts };
};

const getSharedPosts = async (
  userName: string,
  limit: number,
  skip: number
) => {
  const result = await userModel.aggregate([
    // Match the specific user by their _id
    { $match: { userName } },

    // Project only the sharedPosts array
    { $project: { sharedPosts: 1 } },

    // Add a field for the count of sharedPosts
    { $addFields: { sharedPostCount: { $size: '$sharedPosts' } } },

    // Project the sharedPostCount field (return only the count)
    { $project: { sharedPostCount: 1 } },
  ]);

  const totalPosts = result.length > 0 ? result[0].sharedPostCount : 0;
  const postResult = await userModel.aggregate([
    // Match the specific user by ID
    { $match: { userName } },

    // Project only the sharedPosts array
    { $project: { sharedPosts: 1 } },

    // Unwind the sharedPosts array to turn each element into a separate document
    { $unwind: '$sharedPosts' },

    // Paginate using skip and limit
    { $skip: skip },
    { $limit: limit },

    // Optionally: Lookup the Post details (optional depending on your use case)
    {
      $lookup: {
        from: 'posts', // Collection name containing posts
        localField: 'sharedPosts',
        foreignField: '_id',
        as: 'sharedPostDetails',
      },
    },
    { $unwind: '$sharedPostDetails' },

    // Nested lookup to populate the author field from the User collection
    {
      $lookup: {
        from: 'users', // The name of the User collection
        localField: 'sharedPostDetails.author', // The author field in the Post schema
        foreignField: '_id',
        as: 'sharedPostDetails.author',
      },
    },

    // Project the relevant fields: sharedPostDetails, including author info (_id, userName, avatarImage, email)
    {
      $project: {
        'sharedPostDetails._id': 1,
        'sharedPostDetails.title': 1,
        'sharedPostDetails.content': 1,
        'sharedPostDetails.likes': 1,
        'sharedPostDetails.comments': 1,
        'sharedPostDetails.views': 1,
        'sharedPostDetails.image': 1,
        'sharedPostDetails.shares': 1,
        'sharedPostDetails.createdAt': 1,
        'sharedPostDetails.author._id': 1,
        'sharedPostDetails.author.userName': 1,
        'sharedPostDetails.author.avatarImage': 1,
        'sharedPostDetails.author.email': 1,
      },
    },

    // Project the sharedPostDetails array
    { $project: { sharedPostDetails: 1 } },
  ]);

  // Return the array of shared post details
  // const posts = postResult.map(item => item.sharedPostDetails);
  const posts = postResult.map(item => {
    return {
      ...item.sharedPostDetails,
      author: item.sharedPostDetails.author[0],
    };
  });

  return { posts, totalPosts };
};

const getTrendingPosts = async (limit: number, skip: number) => {
  const totalPosts = await postModel.find({}).countDocuments();
  const posts = await postModel
    .find({})
    .sort({ views: -1 })
    .populate('author')
    .select('-password')
    .populate('community')
    .select('_id name')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  return { posts, totalPosts };
};
const getTrendingPostsByTag = async (
  tag: string,
  limit: number,
  skip: number
) => {
  // const totalPosts = await postModel.find({}).countDocuments();
  const totalPosts = await postModel
    .find({
      tags: { $in: [new RegExp(tag, 'i')] }, // 'i' flag makes it case-insensitive
    })
    .countDocuments();
  const posts = await postModel
    .find({
      tags: { $in: [new RegExp(tag, 'i')] }, // 'i' flag makes it case-insensitive
    })
    .sort({ views: -1 })
    .populate('author')
    .select('-password')
    .populate('community')
    .select('_id name')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  return { posts, totalPosts };
};

const getPostById = async (id: string) => {
  const post = await postModel
    .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
    .populate({ path: 'author', select: '_id userName email coverImage' })
    .populate({ path: 'likes', select: '_id userName coverImage' })
    .populate({
      path: 'comments',
      select: '_id content createdAt',
      populate: [
        { path: 'author', select: '_id userName coverImage' },
        {
          path: 'replies',
          select: '_id content',
          populate: [{ path: 'author', select: '_id userName coverImage' }],
        },
      ],
    })
    .populate({ path: 'community', select: '_id name' });

  return post;
};

const getPostsByUserId = async (
  userId: string,
  limit: number,
  skip: number
) => {
  console.log('getting posts by user id: ', userId, limit, skip);
  const totalPosts = await postModel.find({ author: userId }).countDocuments();
  const posts = await postModel
    .find({ author: userId })
    .populate('author')
    .select('-password')
    .populate('community')
    .select('_id name')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  return { posts, totalPosts };
};

const likePost = async (postId: string, userId: string) => {
  console.log('like post service: ', postId, userId);
  const updatedPost = await postModel.findByIdAndUpdate(
    postId,
    {
      $push: { likes: userId },
    },
    { new: true }
  );
  console.log('liked post: ', updatedPost);
  return updatedPost;
};
const unLikePost = async (postId: string, userId: string) => {
  console.log('like post service: ', postId, userId);
  const updatedPost = await postModel.findByIdAndUpdate(
    postId,
    {
      $pull: { likes: userId },
    },
    { new: true }
  );
  console.log('liked post: ', updatedPost);
  return updatedPost;
};

const sharePost = async (postId: string, userId: string) => {
  await userModel.findByIdAndUpdate(userId, {
    $push: { sharedPosts: postId },
  });
  const updatedPost = await postModel.findByIdAndUpdate(
    postId,
    {
      $push: { shares: userId },
    },
    { new: true }
  );
  return updatedPost;
};

export const postService = {
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
