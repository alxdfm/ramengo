import { DataSource } from 'typeorm';
import { DatabaseWrapper } from '../interfaces/database-wrapper';

export class TypeOrmDataSource implements DatabaseWrapper {
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

  find(query: any): Promise<any[]> {
    return this.database.manager.find(query);
  }
}