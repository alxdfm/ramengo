import { DatabaseWrapper } from '../../data/interfaces/database-wrapper';

export abstract class BaseRepository<T> {
  dataSource: DatabaseWrapper;

  constructor(dataSource: DatabaseWrapper) {
    this.dataSource = dataSource;
  }

  async find(query: any, options?: any): Promise<T[]> {
    return this.dataSource.find(query, options);
  }

  async findOne(query: any, options?: any): Promise<T> {
    return this.dataSource.findOne(query, options);
  }

  async save(entity: any): Promise<T> {
    return this.dataSource.save(entity);
  }
}
