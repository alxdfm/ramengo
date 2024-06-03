import { parseDataAccordingEntity } from '../../utils/entity-parser';
import { formatDescriptionOrder } from '../../utils/format-description-order';
import { INewOrderUseCase } from '../interfaces/use-cases/new-order';
import OrderNumber from '../providers/order-number';
import { OrderCreatedType } from '../types/order/order-created';
import { EntitiesType } from '../types/entities';
import { OrderInputType } from '../types/order/order-input';
import { ApiError } from '../../errors/api-errors';
import { Order } from '../entities/order';
import { Broth } from '../entities/broth';
import { Protein } from '../entities/protein';
import { IBaseRepository } from '../interfaces/repositories/base-repository';

const { LAMEN_IMAGE_URL } = process.env;

export class NewOrderUseCase implements INewOrderUseCase {
  orderRepository: IBaseRepository<Order>;
  brothRepository: IBaseRepository<Broth>;
  proteinRepository: IBaseRepository<Protein>;
  orderEntity: any;
  brothEntity: any;
  proteinEntity: any;

  constructor(
    repositories: {
      orderRepository: IBaseRepository<Order>;
      brothRepository: IBaseRepository<Broth>;
      proteinRepository: IBaseRepository<Protein>;
    },
    entities: EntitiesType,
  ) {
    this.orderRepository = repositories.orderRepository;
    this.orderEntity = entities.orderEntity;
    this.brothRepository = repositories.brothRepository;
    this.brothEntity = entities.brothEntity;
    this.proteinRepository = repositories.proteinRepository;
    this.proteinEntity = entities.proteinEntity;
  }

  async getBroth(input: string) {
    const broth = await this.brothRepository.findOne(this.brothEntity, {
      where: { id: input },
    });

    return broth;
  }

  async getProtein(input: string) {
    const protein = await this.proteinRepository.findOne(this.proteinEntity, {
      where: { id: input },
    });

    return protein;
  }

  validateInput(input: OrderInputType) {
    if (!input.brothId || !input.proteinId) {
      throw new ApiError('both brothId and proteinId are required', 400);
    }
  }

  async execute(input: OrderInputType): Promise<OrderCreatedType> {
    this.validateInput(input);

    const orderNumber = await new OrderNumber().getOrderNumber();

    const broth = await this.getBroth(input.brothId);
    const protein = await this.getProtein(input.proteinId);

    const formattedEntity = parseDataAccordingEntity(new this.orderEntity(), {
      id: orderNumber,
      protein,
      broth,
    });

    const result = await this.orderRepository.save(formattedEntity);
    const description = formatDescriptionOrder(broth.name, protein.name);

    return {
      id: result.id,
      description: description,
      image: String(LAMEN_IMAGE_URL),
    };
  }
}
