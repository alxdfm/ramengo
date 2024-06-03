import { Broth as DBBroth } from '../../data/data-sources/typeorm/entities/broth';
import { Order as DBOrder } from '../../data/data-sources/typeorm/entities/order';
import { Protein as DBProtein } from '../../data/data-sources/typeorm/entities/protein';
import { Broth } from '../../domain/entities/broth';
import { Order } from '../../domain/entities/order';
import { Protein } from '../../domain/entities/protein';
import { NewOrderUseCase } from '../../domain/use-cases/new-order';
import { ApiError } from '../../errors/api-errors';
import {
  MockBaseRepository,
  MockBrothRepository,
  MockOrderRepository,
  MockProteinRepository,
} from '../mocks/repository-mocks';

const getOrderNumberMock = jest.fn();

jest.mock('../../domain/providers/order-number', () => {
  return jest.fn().mockImplementation(() => {
    return { getOrderNumber: getOrderNumberMock };
  });
});

describe('get-all-proteins', () => {
  let mockProteinRepository: MockBaseRepository<Protein>;
  let mockBrothRepository: MockBaseRepository<Broth>;
  let mockOrderRepository: MockBaseRepository<Order>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockProteinRepository = new MockProteinRepository();
    mockBrothRepository = new MockBrothRepository();
    mockOrderRepository = new MockOrderRepository();
  });

  describe('execute()', () => {
    it('should return correct data according repository return', async () => {
      const order = {
        id: '19239',
        proteinId: '5',
        brothId: '1',
      };

      const broth = {
        id: '1',
        imageInactive: 'https://test.br/inactive',
        imageActive: 'https://test.br/active',
        name: 'Broth test',
        description: 'Description broth test',
        price: 21,
      };

      const protein = {
        id: '5',
        imageInactive: 'https://test.br/inactive',
        imageActive: 'https://test.br/active',
        name: 'Protein test',
        description: 'Description protein test',
        price: 22,
      };

      const response = {
        id: '19239',
        description: 'Broth test and Protein test Ramen',
        image: 'undefined',
      };

      getOrderNumberMock.mockResolvedValue(null);

      jest
        .spyOn(mockProteinRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(protein));

      jest
        .spyOn(mockBrothRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(broth));

      jest
        .spyOn(mockOrderRepository, 'save')
        .mockImplementation(() => Promise.resolve(order));

      const newOrderUseCase = new NewOrderUseCase(
        {
          brothRepository: mockBrothRepository,
          proteinRepository: mockProteinRepository,
          orderRepository: mockOrderRepository,
        },
        {
          brothEntity: DBBroth,
          proteinEntity: DBProtein,
          orderEntity: DBOrder,
        },
      );

      const result = await newOrderUseCase.execute({
        brothId: '1',
        proteinId: '5',
      });
      expect(result).toStrictEqual(response);
    });

    it('should return correct data according repository return', async () => {
      getOrderNumberMock.mockResolvedValue(null);

      jest
        .spyOn(mockProteinRepository, 'find')
        .mockImplementation(() => Promise.resolve(null as any));

      jest
        .spyOn(mockBrothRepository, 'find')
        .mockImplementation(() => Promise.resolve(null as any));

      jest
        .spyOn(mockOrderRepository, 'save')
        .mockImplementation(() => Promise.resolve(null as any));

      const newOrderUseCase = new NewOrderUseCase(
        {
          brothRepository: mockBrothRepository,
          proteinRepository: mockProteinRepository,
          orderRepository: mockOrderRepository,
        },
        {
          brothEntity: DBBroth,
          proteinEntity: DBProtein,
          orderEntity: DBOrder,
        },
      );

      expect(
        async () =>
          await newOrderUseCase.execute({
            brothId: '1',
          } as any),
      ).rejects.toThrow(
        new ApiError('both brothId and proteinId are required', 400),
      );
    });
  });
});
