import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { Protein } from '../entities/protein';
import { IProteinRepository } from '../interfaces/repositories/protein-repository';

export class ProteinRepository implements IProteinRepository {
  dataSource: DatabaseWrapper;

  constructor(dataSource: DatabaseWrapper) {
    this.dataSource = dataSource;
  }

  getProteins(query: any): Promise<Protein[]> {
    return this.dataSource.find(query);
  }
}
