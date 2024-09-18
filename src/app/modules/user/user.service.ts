import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { userType } from './user.interface';
import { userModel } from './user.model';

const getAllUsers = async (): Promise<Partial<userType>[]> => {
  const users = await userModel.find({}).select('-password');
  return users;
};

const getUserAvatar = async (userId: string) => {
  const image = await userModel.findById(userId).select('avatarImage');
  return image;
};

const getSearchedUsers = async (
  searchString: string
): Promise<Partial<userType>[]> => {
  const users = userModel
    .find({
      $or: [
        { name: { $regex: searchString, $options: 'i' } }, // 'i' option makes the search case-insensitive
        { email: { $regex: searchString, $options: 'i' } },
      ],
    })
    .select('-password');
  return users;
};

const getUserById = async (id: string): Promise<Partial<userType> | null> => {
  const user = await userModel.findById(id).select('-password');
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  return user;
};
const getUserByUserName = async (
  userName: string
): Promise<Partial<userType> | null> => {
  const user = await userModel.find({ userName }).select('-password');
  if (user.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  return user[0];
};

const updateUserById = async (
  id: string,
  payload: Partial<userType>
): Promise<Partial<userType>> => {
  const user = await userModel
    .findByIdAndUpdate(id, payload, { new: true })
    .select('-password');
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Could not update user');
  }
  return user;
};

const deleteUserById = async (id: string) => {
  const user = await userModel.deleteOne({
    _id: id,
  });
  return user;
};

const updateFollowCount = async (userId: string, idToFollow: string) => {
  const transaction = await mongoose.startSession();
  transaction.startTransaction();
  const updateUser = await userModel.updateOne(
    { _id: userId },
    { $addToSet: { followed: idToFollow } }
  );
  const otherUser = await userModel.updateOne(
    { _id: idToFollow },
    { $addToSet: { followers: userId } }
  );
  if (!otherUser.matchedCount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User to follow does not exist');
  }
  return updateUser;
};

export const userService = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updateFollowCount,
  getSearchedUsers,
  getUserByUserName,
  getUserAvatar,
};
