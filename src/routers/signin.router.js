import express from 'express';
import { signinValidation } from '../middlewares/signin.middleware.js';
import { postLogin } from '../controllers/sessions.controller.js';

const signinRouter = express.Router();

signinRouter.post('/signin', signinValidation, postLogin);

export default signinRouter;