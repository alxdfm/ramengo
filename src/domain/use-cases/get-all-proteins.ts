import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { Protein } from '../entities/protein';
import { IProteinRepository } from '../interfaces/repositories/protein-repository';
import { IGetAllProteinsUseCase } from '../interfaces/use-cases/get-all-proteins';
import { ProteinRepository } from '../repositories/protein-repository';
import { OrderEntitiesType } from '../types/order/order-entities';

export class GetAllProteins implements IGetAllProteinsUseCase {
  proteinRepository: IProteinRepository;
  proteinEntity: any;

  constructor(database: DatabaseWrapper, entities: OrderEntitiesType) {
    this.proteinRepository = new ProteinRepository(database);
    this.proteinEntity = entities.proteinEntity;
  }

  async execute(): Promise<Protein[]> {
    const result = await this.proteinRepository.getProteins(this.proteinEntity);
    return result;
  }
}
