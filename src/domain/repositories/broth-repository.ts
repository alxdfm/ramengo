import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { Broth } from '../entities/broth';
import { IBrothRepository } from '../interfaces/repositories/broth-repository';
import { BaseRepository } from './base-repository';

export class BrothRepository
  extends BaseRepository<Broth>
  implements IBrothRepository
{
  constructor(dataSource: DatabaseWrapper) {
    super(dataSource);
  }

  async getBroths(query: any): Promise<Broth[]> {
    return this.dataSource.find(query);
  }

  async getBroth(query: any, options?: any): Promise<Broth> {
    return this.dataSource.findOne(query, options);
  }
}
