import { Broth } from '../entities/broth';
import { IBrothRepository } from '../interfaces/repositories/broth-repository';
import { IGetAllBrothsUseCase } from '../interfaces/use-cases/get-all-broths';
import { EntitiesType } from '../types/entities';

export class GetAllBrothsUseCase implements IGetAllBrothsUseCase {
  brothRepository: IBrothRepository;
  brothEntity: any;

  constructor(brothRepository: IBrothRepository, entities: EntitiesType) {
    this.brothRepository = brothRepository;
    this.brothEntity = entities.brothEntity;
  }

  async execute(): Promise<Broth[]> {
    const result = await this.brothRepository.getBroths(this.brothEntity);
    return result;
  }
}
