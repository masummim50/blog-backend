import { replyModel } from './replies.model';

const createReply = async (data: any) => {
  const result = await replyModel.create(data);
  return result;
};

export const replyServies = {
  createReply,
};
