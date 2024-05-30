export interface DatabaseWrapper {
  find(query: any): Promise<any[]>;
}
