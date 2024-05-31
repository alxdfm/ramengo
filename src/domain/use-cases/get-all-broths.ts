import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { Broth } from '../entities/broth';
import { IBrothRepository } from '../interfaces/repositories/broth-repository';
import { IGetAllBrothsUseCase } from '../interfaces/use-cases/get-all-broths';
import { BrothRepository } from '../repositories/broth-repository';
import { OrderEntitiesType } from '../types/order/order-entities';

export class GetAllBroths implements IGetAllBrothsUseCase {
  brothRepository: IBrothRepository;
  brothEntity: any;

  constructor(database: DatabaseWrapper, entities: OrderEntitiesType) {
    this.brothRepository = new BrothRepository(database);
    this.brothEntity = entities.brothEntity;
  }

  async execute(): Promise<Broth[]> {
    const result = await this.brothRepository.getBroths(this.brothEntity);
    return result;
  }
}
