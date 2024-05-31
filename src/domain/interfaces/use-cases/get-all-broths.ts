import { Broth } from '../../entities/broth';

export interface IGetAllBrothsUseCase {
  execute(): Promise<Broth[]>;
}
