import express from 'express';
import cors from 'cors';

const server = express();
server.use(async (req, res, next) => {
  console.log(req.body);
  cors();
  next();
});
server.use(express.json());

export default server;
