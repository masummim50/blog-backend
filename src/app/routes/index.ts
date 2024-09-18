import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { userRoutes } from '../modules/user/user.route';
import { communityRoutes } from '../modules/communities/communities.route';
import { postRoutes } from '../modules/post/post.route';
import { commentRoutes } from '../modules/comment/comment.route';
import { repliesRoutes } from '../modules/replies/replies.route';

const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/community',
    route: communityRoutes,
  },
  {
    path: '/post',
    route: postRoutes,
  },
  {
    path: '/comment',
    route: commentRoutes,
  },
  {
    path: '/reply',
    route: repliesRoutes,
  },
];

routes.forEach(route => router.use(route.path, route.route));
export default router;
