import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { Protein as DBProtein } from '../../data/data-sources/typeorm/entities/protein';
import { Protein } from '../entities/protein';
import { IProteinRepository } from '../interfaces/repositories/protein-repository';
import { IGetAllProteinsUseCase } from '../interfaces/use-cases/get-all-proteins';
import { ProteinRepository } from '../repositories/protein-repository';

export class GetAllProteins implements IGetAllProteinsUseCase {
  proteinRepository: IProteinRepository;

  constructor(database: DatabaseWrapper) {
    this.proteinRepository = new ProteinRepository(database);
  }

  async execute(): Promise<Protein[]> {
    const result = await this.proteinRepository.getProteins(DBProtein);
    return result;
  }
}
