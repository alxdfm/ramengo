import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { Protein } from '../entities/protein';
import { IProteinRepository } from '../interfaces/repositories/protein-repository';
import { BaseRepository } from './base-repository';

export class ProteinRepository
  extends BaseRepository<Protein>
  implements IProteinRepository
{
  constructor(dataSource: DatabaseWrapper) {
    super(dataSource);
  }

  async getProteins(query: any): Promise<Protein[]> {
    return this.dataSource.find(query);
  }

  async getProtein(query: any, options?: any): Promise<Protein> {
    return this.dataSource.findOne(query, options);
  }
}
