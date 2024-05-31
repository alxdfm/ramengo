import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { Broth } from '../entities/broth';
import { IBrothRepository } from '../interfaces/repositories/broth-repository';

export class BrothRepository implements IBrothRepository {
  dataSource: DatabaseWrapper;

  constructor(dataSource: DatabaseWrapper) {
    this.dataSource = dataSource;
  }

  async getBroths(query: any): Promise<Broth[]> {
    return this.dataSource.find(query);
  }

  async getBroth(query: any, options?: any): Promise<Broth> {
    return this.dataSource.findOne(query, options);
  }
}
