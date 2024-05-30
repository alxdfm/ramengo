import express from 'express';

import { Router, Request, Response } from 'express';
import { MysqlDataSource } from './data/typeorm/mysql';
import { TypeOrmDataSource } from './data/typeorm/data-source';
import { Protein } from './data/typeorm/entities/protein';

const app = express();

const route = Router();

app.use(express.json());

const database = new TypeOrmDataSource(MysqlDataSource);

route.get('/', async (req: Request, res: Response) => {
  const data = await database.find(Protein);
  res.json({ message: `data: ${data}` });
});

app.use(route);

const PORT = 3030;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
