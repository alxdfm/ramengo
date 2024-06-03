import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { Order } from '../entities/order';
import { BaseRepository } from './base-repository';

export class OrderRepository extends BaseRepository<Order> {
  constructor(dataSource: DatabaseWrapper) {
    super(dataSource);
  }
}
