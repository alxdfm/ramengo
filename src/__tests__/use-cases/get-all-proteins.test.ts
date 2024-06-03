import { Protein as DBProtein } from '../../data/data-sources/typeorm/entities/protein';
import { Protein } from '../../domain/entities/protein';
import { IProteinRepository } from '../../domain/interfaces/repositories/protein-repository';
import { GetAllProteinsUseCase } from '../../domain/use-cases/get-all-proteins';

describe('get-all-proteins', () => {
  class MockProteinRepository implements IProteinRepository {
    getProtein(query: any, options?: any): Promise<Protein> {
      throw new Error(`Method not implemented. ${query} ${options}`);
    }
    getProteins(query: any, options?: any): Promise<Protein[]> {
      throw new Error(`Method not implemented. ${query} ${options}`);
    }
  }
  let mockProteinRepository: IProteinRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockProteinRepository = new MockProteinRepository();
  });

  describe('execute', () => {
    it('should return correct data according repository return', async () => {
      const proteins = [
        {
          id: '1',
          imageInactive: 'https://test.br/inactive',
          imageActive: 'https://test.br/active',
          name: 'Test',
          description: 'Description test',
          price: 2,
        },
      ];

      jest
        .spyOn(mockProteinRepository, 'getProteins')
        .mockImplementation(() => Promise.resolve(proteins));

      const getBrothsUseCase = new GetAllProteinsUseCase(
        mockProteinRepository,
        {
          brothEntity: DBProtein,
        },
      );

      const result = await getBrothsUseCase.execute();
      expect(result).toStrictEqual(proteins);
    });
  });
});
