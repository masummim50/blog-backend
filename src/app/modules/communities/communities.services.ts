import { userModel } from '../user/user.model';
import { communityModel } from './communities.model';

const createCommunity = async (data: {
  name: string;
  description: string;
  creator: string;
  rules?: string[];
}) => {
  const community = await communityModel.create(data);

  return community;
};

const updateCommunityById = async (
  communityId: string,
  userId: string,
  data
) => {
  const update = await communityModel.findOneAndUpdate(
    { _id: communityId, creator: userId },
    data,
    { new: true }
  );
  return update;
};

const getAllCommunity = async () => {
  const all = await communityModel.find();
  return all;
};

const getUsersCommunities = async (userId: string) => {
  const communities = await userModel
    .find({
      _id: userId,
    })
    .select('communities')
    .populate('communities');

  return communities[0].communities;
};

const getCommunitiesCreatedByUser = async (userId: string) => {
  const communities = await communityModel
    .find({
      creator: userId,
    })
    .select('name members createdAt posts image');
  return communities;
};

const getCommunityById = async (id: string) => {
  const community = await communityModel
    .findById(id)
    .populate({ path: 'creator', select: '_id userName' });
  return community;
};

const subscribe = async (userId: string, communityId: string) => {
  const community = await communityModel.findByIdAndUpdate(
    communityId,
    {
      $push: { members: userId },
    },
    { new: true }
  );
  await userModel.findByIdAndUpdate(userId, {
    $push: { communities: communityId },
  });
  return community;
};
const unSubscribe = async (userId: string, communityId: string) => {
  const community = await communityModel.findByIdAndUpdate(
    communityId,
    {
      $pull: { members: userId },
    },
    { new: true }
  );
  await userModel.findByIdAndUpdate(userId, {
    $pull: { communities: communityId },
  });
  return community;
};

export const communitiesServices = {
  getUsersCommunities,
  createCommunity,
  getCommunitiesCreatedByUser,
  getAllCommunity,
  getCommunityById,
  subscribe,
  unSubscribe,
  updateCommunityById,
};
