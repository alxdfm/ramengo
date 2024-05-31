import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { parseDataAccordingEntity } from '../../utils/entity-parser';
import { IOrderRepository } from '../interfaces/repositories/order-repository';
import { INewOrderUseCase } from '../interfaces/use-cases/new-order';
import { OrderNumber } from '../providers/order-number';
import { OrderRepository } from '../repositories/order-repository';
import { OrderCreatedType } from '../types/order/order-created';
import { OrderEntityType } from '../types/order/order-entity';
import { OrderInputType } from '../types/order/order-input';

export class NewOrder implements INewOrderUseCase {
  orderRepository: IOrderRepository;
  orderEntity: any;

  constructor(database: DatabaseWrapper, orderEntity: OrderEntityType) {
    this.orderRepository = new OrderRepository(database);
    this.orderEntity = orderEntity.orderEntity;
  }

  async execute(input: OrderInputType): Promise<OrderCreatedType> {
    const orderNumber = await new OrderNumber().getOrderNumber();

    const formattedEntity = parseDataAccordingEntity(new this.orderEntity(), {
      id: orderNumber,
      proteinId: input.proteinId,
      brothId: input.brothId,
    });

    const result = await this.orderRepository.createOrder(formattedEntity);

    return {
      id: result.id,
      description: '',
      image: '',
    };
  }
}
