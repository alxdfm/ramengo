import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { Order } from '../entities/order';
import { IOrderRepository } from '../interfaces/repositories/order-repository';
import { OrderInputType } from '../types/order/order-input';

export class OrderRepository implements IOrderRepository {
  private dataSource: DatabaseWrapper;

  constructor(dataSource: DatabaseWrapper) {
    this.dataSource = dataSource;
  }

  async createOrder(input: OrderInputType): Promise<Order> {
    return this.dataSource.save(input);
  }

  async getOrder(query: any, options?: any): Promise<Order> {
    return this.dataSource.findOne(query, options);
  }
}
