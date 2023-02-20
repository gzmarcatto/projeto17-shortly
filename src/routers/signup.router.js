import express from 'express';
import { signupValidation } from '../middlewares/signup.middleware.js';
import { postNewUser } from '../controllers/users.controller.js';

const signupRouter = express.Router();

signupRouter.post('/signup', signupValidation, postNewUser);

export default signupRouter;