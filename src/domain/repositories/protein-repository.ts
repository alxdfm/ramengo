import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';
import { Protein } from '../entities/protein';
import { BaseRepository } from './base-repository';

export class ProteinRepository extends BaseRepository<Protein> {
  constructor(dataSource: DatabaseWrapper) {
    super(dataSource);
  }
}
