import { Protein } from '../entities/protein';
import { IBaseRepository } from '../interfaces/repositories/base-repository';
import { IGetAllProteinsUseCase } from '../interfaces/use-cases/get-all-proteins';
import { EntitiesType } from '../types/entities';

export class GetAllProteinsUseCase implements IGetAllProteinsUseCase {
  proteinRepository: IBaseRepository<Protein>;
  proteinEntity: any;

  constructor(
    proteinRepository: IBaseRepository<Protein>,
    entities: EntitiesType,
  ) {
    this.proteinRepository = proteinRepository;
    this.proteinEntity = entities.proteinEntity;
  }

  async execute(): Promise<Protein[]> {
    const result = await this.proteinRepository.find(this.proteinEntity);
    return result;
  }
}
