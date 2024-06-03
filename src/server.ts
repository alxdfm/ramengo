import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.text());
server.use(cors());

export default server;
