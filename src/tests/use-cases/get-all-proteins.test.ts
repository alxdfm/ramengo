import { Protein as DBProtein } from '../../data/data-sources/typeorm/entities/protein';
import { Protein } from '../../domain/entities/protein';
import { GetAllProteinsUseCase } from '../../domain/use-cases/get-all-proteins';
import {
  MockBaseRepository,
  MockProteinRepository,
} from '../mocks/repository-mocks';

describe('get-all-proteins', () => {
  let mockProteinRepository: MockBaseRepository<Protein>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockProteinRepository = new MockProteinRepository();
  });

  describe('execute()', () => {
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
        .spyOn(mockProteinRepository, 'find')
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
