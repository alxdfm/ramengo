export interface DatabaseWrapper {
  find(query: any, options?: any): Promise<any[]>;
  findOne(query: any, options?: any): Promise<any>;
  save(entity: any): Promise<any>;
}
