import { parseDataAccordingEntity } from '../../utils/entity-parser';
import { formatDescriptionOrder } from '../../utils/format-description-order';
import { IBrothRepository } from '../interfaces/repositories/broth-repository';
import { IOrderRepository } from '../interfaces/repositories/order-repository';
import { IProteinRepository } from '../interfaces/repositories/protein-repository';
import { INewOrderUseCase } from '../interfaces/use-cases/new-order';
import { OrderNumber } from '../providers/order-number';
import { OrderCreatedType } from '../types/order/order-created';
import { EntitiesType } from '../types/entities';
import { OrderInputType } from '../types/order/order-input';
import { ApiError } from '../../errors/api-errors';

const { LAMEN_IMAGE_URL } = process.env;

export class NewOrderUseCase implements INewOrderUseCase {
  orderRepository: IOrderRepository;
  brothRepository: IBrothRepository;
  proteinRepository: IProteinRepository;
  orderEntity: any;
  brothEntity: any;
  proteinEntity: any;

  constructor(
    repositories: {
      orderRepository: IOrderRepository;
      brothRepository: IBrothRepository;
      proteinRepository: IProteinRepository;
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

    const result = await this.orderRepository.createOrder(formattedEntity);
    const description = formatDescriptionOrder(broth.name, protein.name);

    return {
      id: result.id,
      description: description,
      image: String(LAMEN_IMAGE_URL),
    };
  }
}
