import express from 'express';
import { newurlValidation } from '../middlewares/newurl.middleware.js';
import { authValidation } from '../middlewares/auth.middleware.js';
import { deleteurlValidation } from '../middlewares/deleteurl.middleware.js';
import { postUrl, getUrl, openUrl, deleteURL } from '../controllers/urls.controller.js';

const urlsRouter = express.Router();

urlsRouter.post('/urls/shorten', authValidation, newurlValidation, postUrl);
urlsRouter.get('/urls/:id', getUrl);
urlsRouter.delete('/urls/:id', authValidation, deleteurlValidation ,deleteURL);
urlsRouter.get('/urls/open/:shortUrl', openUrl);

export default urlsRouter;