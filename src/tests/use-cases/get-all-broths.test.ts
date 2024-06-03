import { Broth as DBBroth } from '../../data/data-sources/typeorm/entities/broth';
import { Broth } from '../../domain/entities/broth';
import { GetAllBrothsUseCase } from '../../domain/use-cases/get-all-broths';
import {
  MockBaseRepository,
  MockBrothRepository,
} from '../mocks/repository-mocks';

describe('get-all-broths', () => {
  let mockBrothRepository: MockBaseRepository<Broth>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockBrothRepository = new MockBrothRepository();
  });

  describe('execute()', () => {
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
        .spyOn(mockBrothRepository, 'find')
        .mockImplementation(() => Promise.resolve(broths));

      const getBrothsUseCase = new GetAllBrothsUseCase(mockBrothRepository, {
        brothEntity: DBBroth,
      });

      const result = await getBrothsUseCase.execute();
      expect(result).toStrictEqual(broths);
    });
  });
});
