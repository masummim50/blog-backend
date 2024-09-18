import express from 'express';
import auth from '../../middlewares/auth';
import { repliesController } from './replies.controller';

const router = express.Router();

router.post('/create', auth(), repliesController.createReply);

export const repliesRoutes = router;
