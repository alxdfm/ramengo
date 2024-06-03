export interface IBaseRepository<T> {
  find(query: any, options?: any): Promise<T[]>;
  findOne(query: any, options?: any): Promise<T>;
  save(entity: any): Promise<T>;
}
