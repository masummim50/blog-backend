import { commentModel } from './comment.model';
import { CommentType } from './comment.interface';
import { postModel } from '../post/post.model';
import { userModel } from '../user/user.model';

const getAllComments = async (): Promise<Partial<CommentType>[]> => {
  const comments = await commentModel.find({});
  return comments;
};

const getCommentById = async (
  id: string
): Promise<Partial<CommentType> | null> => {
  const comment = await commentModel.findById(id);
  return comment || null;
};

const createComment = async (
  commentData: CommentType,
  userId: string
): Promise<CommentType> => {
  const comment = await commentModel.create(commentData);
  await postModel.findByIdAndUpdate(commentData.post, {
    $push: { comments: comment._id },
  });
  await userModel.findByIdAndUpdate(userId, {
    $push: { comments: comment._id },
  });

  return comment;
};

const updateCommentById = async (
  id: string,
  commentData: CommentType
): Promise<CommentType | null> => {
  const updatedComment = await commentModel.findByIdAndUpdate(id, commentData, {
    new: true,
  });
  return updatedComment || null;
};

const deleteCommentById = async (id: string): Promise<void> => {
  await commentModel.findByIdAndDelete(id);
};

export const commentService = {
  getAllComments,
  getCommentById,
  createComment,
  updateCommentById,
  deleteCommentById,
};
