/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { userType } from '../user/user.interface';
import { userModel } from '../user/user.model';
import { gmailLoginDataType, loginDataType } from './auth.interface';

const createUser = async (data: userType): Promise<Partial<userType>> => {
  console.log('create user service', data);
  const result: any = await userModel.create(data);
  console.log('created result', result);
  const { password, ...others } = result._doc;
  console.log(others);
  return others;
};

type loginReturnType = {
  data: { email: string; name: string };
  token: string;
};

const login = async (data: loginDataType): Promise<loginReturnType> => {
  console.log('inside login: ', data);
  const user = await userModel.findOne({
    email: data.email,
  });
  console.log('login auth service: user found or not: ', user);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Credentials');
  }
  // compare password
  if (user.password) {
    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid credentials');
    }
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }
  const token = jwtHelpers.createToken(
    {
      _id: user.id,
      email: user.email,
      name: user.userName,
    },
    config.jwt.secret as Secret,
    '365days'
  );
  const userInfo = {
    data: {
      id: user.id,
      email: user.email,
      name: user.userName,
      image: user.avatarImage,
    },
    token: token,
  };
  return userInfo;
};

const gmailLogin = async (data: gmailLoginDataType): Promise<string> => {
  const user = await userModel.findOne({ email: data.email });
  // if user not found create a new user
  if (!user) {
    const result = await userModel.create(data);
    const token = jwtHelpers.createToken(
      {
        _id: result.id,
        email: result.email,
        name: result.userName,
      },
      config.jwt.secret as Secret,
      '15days'
    );
    return token;
  }
  const token = jwtHelpers.createToken(
    {
      _id: user.id,
      email: user.email,
      name: user.userName,
    },
    config.jwt.secret as Secret,
    '365days'
  );
  return token;
};
const isUsernameAvailable = async (userName: string): Promise<boolean> => {
  const user = await userModel.findOne({ userName });
  if (!user) {
    return true;
  }
  return false;
  // if user not found create a new user
};

export const authService = {
  createUser,
  login,
  gmailLogin,
  isUsernameAvailable,
};
