import express from 'express';
import cors from 'cors';
import { authorizationMiddleware } from './presentation/middlewares/authorization-middleware';

const server = express();
server.use(express.json());
server.use(authorizationMiddleware);
server.use(cors());

export default server;
