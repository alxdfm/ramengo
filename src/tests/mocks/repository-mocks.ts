import { Broth } from '../../domain/entities/broth';
import { Order } from '../../domain/entities/order';
import { Protein } from '../../domain/entities/protein';
import { IBaseRepository } from '../../domain/interfaces/repositories/base-repository';

export class MockBaseRepository<T> implements IBaseRepository<T> {
  find(query: any, options?: any): Promise<T[]> {
    throw new Error(`Method not implemented. ${query} ${options}`);
  }
  findOne(query: any, options?: any): Promise<T> {
    throw new Error(`Method not implemented. ${query} ${options}`);
  }
  save(entity: any): Promise<T> {
    throw new Error(`Method not implemented. ${entity}`);
  }
}

export class MockProteinRepository extends MockBaseRepository<Protein> {}

export class MockBrothRepository extends MockBaseRepository<Broth> {}

export class MockOrderRepository extends MockBaseRepository<Order> {}
