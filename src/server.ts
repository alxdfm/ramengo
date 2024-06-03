import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());
server.post('/sd', (req, res, next) => {
  console.log('>>', req.body);
  res.send({ test: req.body });
});

export default server;
