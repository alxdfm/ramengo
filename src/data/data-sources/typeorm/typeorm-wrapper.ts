import { DataSource } from 'typeorm';
import { DatabaseWrapper } from '../../interfaces/database-wrapper';

export class TypeORMWrapper implements DatabaseWrapper {
  private database: DataSource;

  constructor(database: DataSource) {
    database
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
    this.database = database;
  }

  find(query: any, options?: any): Promise<any[]> {
    return this.database.manager.find(query, options);
  }

  findOne(query: any, options?: any): Promise<any> {
    return this.database.manager.findOne(query, options);
  }

  save(entity: any): Promise<any[]> {
    return this.database.manager.save(entity);
  }
}
