import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { Broth as DBBroth } from '../../data/data-sources/typeorm/entities/broth';
import { Broth } from '../entities/broth';
import { IBrothRepository } from '../interfaces/repositories/broth-repository';
import { IGetAllBrothsUseCase } from '../interfaces/use-cases/get-all-broths';
import { BrothRepository } from '../repositories/broth-repository';

export class GetAllBroths implements IGetAllBrothsUseCase {
  brothRepository: IBrothRepository;

  constructor(database: DatabaseWrapper) {
    this.brothRepository = new BrothRepository(database);
  }

  async execute(): Promise<Broth[]> {
    const result = await this.brothRepository.getBroths(DBBroth);
    return result;
  }
}
