import express from "express";
import cors from "cors";
import "dotenv/config";

import { listenServer } from "./database/response.js";
import signupRouter from "./routers/signup.router.js";
import signinRouter from "./routers/signin.router.js";
import urlsRouter from "./routers/urls.router.js";
import usersRouter from "./routers/users.router.js";
import rankingRouter from "./routers/ranking.router.js";

const PORT = process.env.PORT || 5000;
const server = express();
server.use(cors());
server.use(express.json());

server.use(signupRouter).use(signinRouter).use(urlsRouter).use(usersRouter).use(rankingRouter);

server.listen(PORT, listenServer(PORT));
