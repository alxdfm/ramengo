import { Protein } from '../../entities/protein';

export interface IProteinRepository {
  getProteins(query: any): Promise<Protein[]>;
}
