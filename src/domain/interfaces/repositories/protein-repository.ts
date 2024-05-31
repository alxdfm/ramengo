import { Protein } from '../../entities/protein';

export interface IProteinRepository {
  getProteins(query: any): Promise<Protein[]>;
  getProtein(query: any, options: any): Promise<Protein>;
}
