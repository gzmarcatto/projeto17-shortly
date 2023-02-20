import { Router } from "express";
import * as baseController from "../controllers/base.controller.js";
import { validateSchemaBase } from "../middlewares/base.middleware.js";

const baseRouter = Router();

baseRouter.post(`/customers`, validateSchemaBase, baseController.postBase);

export default baseRouter;
