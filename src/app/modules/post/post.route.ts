import express from 'express';
import auth from '../../middlewares/auth';
import { postController } from './post.controller';

const router = express.Router();

router.get('/', postController.getAllPosts);
router.get('/trending', postController.getTrendingPosts);
router.get('/community/:id', postController.getPostsByCommunityId);
router.get('/shared/:username', postController.getSharedPosts);
router.get('/trending/:tag', postController.getTrendingPostsByTag);
router.patch('/share/:id', auth(), postController.sharePost);

router.get('/:id', postController.getPostById);

router.post('/create', auth(), postController.createPost);
router.patch(`/like/:id`, auth(), postController.likePost);
router.patch(`/unlike/:id`, auth(), postController.unLikePost);
router.get('/:id/posts', postController.getPostsByUserId);

export const postRoutes = router;
