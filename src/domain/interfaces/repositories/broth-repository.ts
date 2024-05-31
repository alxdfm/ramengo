import { Broth } from '../../entities/broth';

export interface IBrothRepository {
  getBroths(query: any): Promise<Broth[]>;
  getBroth(query: any, options: any): Promise<Broth>;
}
