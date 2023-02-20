import express from 'express';
import { authValidation } from '../middlewares/auth.middleware.js';
import { getUserInfo } from '../controllers/users.controller.js';

const usersRouter = express.Router();

usersRouter.get('/users/me', authValidation, getUserInfo);

export default usersRouter;