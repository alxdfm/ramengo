import { Protein } from '../entities/protein';
import { IProteinRepository } from '../interfaces/repositories/protein-repository';
import { IGetAllProteinsUseCase } from '../interfaces/use-cases/get-all-proteins';
import { EntitiesType } from '../types/entities';

export class GetAllProteinsUseCase implements IGetAllProteinsUseCase {
  proteinRepository: IProteinRepository;
  proteinEntity: any;

  constructor(proteinRepository: IProteinRepository, entities: EntitiesType) {
    this.proteinRepository = proteinRepository;
    this.proteinEntity = entities.proteinEntity;
  }

  async execute(): Promise<Protein[]> {
    const result = await this.proteinRepository.getProteins(this.proteinEntity);
    return result;
  }
}
