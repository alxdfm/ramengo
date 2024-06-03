import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { Broth } from '../entities/broth';
import { BaseRepository } from './base-repository';

export class BrothRepository extends BaseRepository<Broth> {
  constructor(dataSource: DatabaseWrapper) {
    super(dataSource);
  }
}
