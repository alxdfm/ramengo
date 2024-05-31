import { Order } from '../../entities/order';
import { OrderInputType } from '../../types/order/order-input';

export interface IOrderRepository {
  createOrder(input: OrderInputType): Promise<Order>;
}
