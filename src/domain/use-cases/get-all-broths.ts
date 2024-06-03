import { Broth } from '../entities/broth';
import { IBaseRepository } from '../interfaces/repositories/base-repository';
import { IGetAllBrothsUseCase } from '../interfaces/use-cases/get-all-broths';
import { EntitiesType } from '../types/entities';

export class GetAllBrothsUseCase implements IGetAllBrothsUseCase {
  brothRepository: IBaseRepository<Broth>;
  brothEntity: any;

  constructor(brothRepository: IBaseRepository<Broth>, entities: EntitiesType) {
    this.brothRepository = brothRepository;
    this.brothEntity = entities.brothEntity;
  }

  async execute(): Promise<Broth[]> {
    const result = await this.brothRepository.find(this.brothEntity);
    return result;
  }
}
