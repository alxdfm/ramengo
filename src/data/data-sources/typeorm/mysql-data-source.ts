import { DataSource } from 'typeorm';
import { Protein } from './entities/protein';
import { Broth } from './entities/broth';
import { Order } from './entities/order';

const {
  MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_HOST,
  MYSQL_PORT,
} = process.env;

export const MySQLDataSource = new DataSource({
  type: 'mysql',
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  username: MYSQL_USER,
  password: MYSQL_ROOT_PASSWORD,
  database: MYSQL_DATABASE,
  logging: false,
  entities: [Protein, Broth, Order],
  synchronize: true,
});
