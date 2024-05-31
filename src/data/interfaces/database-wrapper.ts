export interface DatabaseWrapper {
  find(query: any): Promise<any[]>;
  save(entity: any): Promise<any>;
}
