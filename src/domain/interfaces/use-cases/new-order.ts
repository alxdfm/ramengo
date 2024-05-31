import { OrderCreatedType } from '../../types/order/order-created';
import { OrderInputType } from '../../types/order/order-input';

export interface INewOrderUseCase {
  execute(input: OrderInputType): Promise<OrderCreatedType>;
}
