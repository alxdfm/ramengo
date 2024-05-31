import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { parseDataAccordingEntity } from '../../utils/entity-parser';
import { formatDescriptionOrder } from '../../utils/format-description-order';
import { IBrothRepository } from '../interfaces/repositories/broth-repository';
import { IOrderRepository } from '../interfaces/repositories/order-repository';
import { IProteinRepository } from '../interfaces/repositories/protein-repository';
import { INewOrderUseCase } from '../interfaces/use-cases/new-order';
import { OrderNumber } from '../providers/order-number';
import { BrothRepository } from '../repositories/broth-repository';
import { OrderRepository } from '../repositories/order-repository';
import { ProteinRepository } from '../repositories/protein-repository';
import { OrderCreatedType } from '../types/order/order-created';
import { OrderEntitiesType } from '../types/order/order-entities';
import { OrderInputType } from '../types/order/order-input';

const { LAMEN_IMAGE_URL } = process.env;

export class NewOrder implements INewOrderUseCase {
  orderRepository: IOrderRepository;
  brothRepository: IBrothRepository;
  proteinRepository: IProteinRepository;
  orderEntity: any;
  brothEntity: any;
  proteinEntity: any;

  constructor(database: DatabaseWrapper, entities: OrderEntitiesType) {
    this.orderRepository = new OrderRepository(database);
    this.orderEntity = entities.orderEntity;
    this.brothRepository = new BrothRepository(database);
    this.brothEntity = entities.brothEntity;
    this.proteinRepository = new ProteinRepository(database);
    this.proteinEntity = entities.proteinEntity;
  }

  async getBroth(input: string) {
    const broth = await this.brothRepository.getBroth(this.brothEntity, {
      where: { id: input },
    });

    return broth;
  }

  async getProtein(input: string) {
    const protein = await this.proteinRepository.getProtein(
      this.proteinEntity,
      {
        where: { id: input },
      },
    );

    return protein;
  }

  async execute(input: OrderInputType): Promise<OrderCreatedType> {
    const orderNumber = await new OrderNumber().getOrderNumber();

    const broth = await this.getBroth(input.brothId);
    const protein = await this.getProtein(input.proteinId);

    const formattedEntity = parseDataAccordingEntity(new this.orderEntity(), {
      id: orderNumber,
      protein,
      broth,
    });

    const result = await this.orderRepository.createOrder(formattedEntity);

    return {
      id: result.id,
      description: formatDescriptionOrder(broth.name, protein.name),
      image: String(LAMEN_IMAGE_URL),
    };
  }
}
