import { Broth as DBBroth } from '../../data/data-sources/typeorm/entities/broth';
import { Broth } from '../../domain/entities/broth';
import { IBrothRepository } from '../../domain/interfaces/repositories/broth-repository';
import { GetAllBrothsUseCase } from '../../domain/use-cases/get-all-broths';

describe('get-all-broths', () => {
  class MockBrothRepository implements IBrothRepository {
    getBroth(query: any, options?: any): Promise<Broth> {
      throw new Error(`Method not implemented. ${query} ${options}`);
    }
    getBroths(query: any, options?: any): Promise<Broth[]> {
      throw new Error(`Method not implemented. ${query} ${options}`);
    }
  }
  let mockBrothRepository: IBrothRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockBrothRepository = new MockBrothRepository();
  });

  describe('execute', () => {
    it('should return correct data according repository return', async () => {
      const broths = [
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
        .spyOn(mockBrothRepository, 'getBroths')
        .mockImplementation(() => Promise.resolve(broths));

      const getBrothsUseCase = new GetAllBrothsUseCase(mockBrothRepository, {
        brothEntity: DBBroth,
      });

      const result = await getBrothsUseCase.execute();
      expect(result).toStrictEqual(broths);
    });
  });
});
