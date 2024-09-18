import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(authValidation.create),
  authController.createUser
);
router.post(
  '/signin',
  validateRequest(authValidation.login),
  authController.login
);
router.post(
  '/signin/gmail',
  validateRequest(authValidation.gmailLogin),
  authController.gmailLogin
);

router.get(
  '/isusernameavailable/:username',
  authController.isUsernameAvailable
);

export const authRoutes = router;
