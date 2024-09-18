import express from 'express';
import { communitiesController } from './communities.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', communitiesController.getAllCommunity);
router.post('/create', auth(), communitiesController.createCommunity);
router.patch('/update/:id', auth(), communitiesController.updateCommunityById);
router.get(
  '/createdbyuser',
  auth(),
  communitiesController.getCommunitiesCreatedByUser
);
router.get('/:id', communitiesController.getCommunityById);
router.patch('/subscribe/:id', auth(), communitiesController.subscribe);
router.patch('/unsubscribe/:id', auth(), communitiesController.unSubscribe);
router.get('/user/:userid', communitiesController.getUsersCommunities);

export const communityRoutes = router;
