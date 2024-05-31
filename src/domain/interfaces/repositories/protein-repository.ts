import { Protein } from '../../entities/protein';

export interface IProteinRepository {
  getProteins(query: any, options?: any): Promise<Protein[]>;
  getProtein(query: any, options?: any): Promise<Protein>;
}
