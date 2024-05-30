import { Protein } from '../../entities/protein';

export interface IGetAllProteinsUseCase {
  execute(): Promise<Protein[]>;
}
