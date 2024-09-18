import express from 'express';
import auth from '../../middlewares/auth';
import { userController } from './user.controller';

const router = express.Router();

router.get('/', auth(), userController.getAllUsers);
router.get('/avatar', auth(), userController.getUserAvatar);
router.get('/search/:searchText', auth(), userController.getSearchedUsers);
router.get('/:id', userController.getUserById);
router.get('/profile/:userName', userController.getUserByUserName);
router.patch('/:id', auth(), userController.updateUserById);
router.delete('/:id', auth(), userController.deleteUserById);
router.post('/follow/:id', auth(), userController.updateFollowCount);

export const userRoutes = router;
