import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { Order } from '../entities/order';
import { IOrderRepository } from '../interfaces/repositories/order-repository';
import { OrderInputType } from '../types/order/order-input';
import { BaseRepository } from './base-repository';

export class OrderRepository
  extends BaseRepository<Order>
  implements IOrderRepository
{
  constructor(dataSource: DatabaseWrapper) {
    super(dataSource);
  }

  async createOrder(input: OrderInputType): Promise<Order> {
    return this.dataSource.save(input);
  }
}
