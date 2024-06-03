import { Broth } from '../../data/data-sources/typeorm/entities/broth';
import { Order } from '../../data/data-sources/typeorm/entities/order';
import { Protein } from '../../data/data-sources/typeorm/entities/protein';
import { Order as OrderDomain } from '../../domain/entities/order';
import { IBrothRepository } from '../../domain/interfaces/repositories/broth-repository';
import { IOrderRepository } from '../../domain/interfaces/repositories/order-repository';
import { IProteinRepository } from '../../domain/interfaces/repositories/protein-repository';
import { OrderInputType } from '../../domain/types/order/order-input';
import { NewOrderUseCase } from '../../domain/use-cases/new-order';
import { ApiError } from '../../errors/api-errors';

const getOrderNumberMock = jest.fn();

jest.mock('../../domain/providers/order-number', () => {
  return jest.fn().mockImplementation(() => {
    return { getOrderNumber: getOrderNumberMock };
  });
});

describe('get-all-proteins', () => {
  class MockProteinRepository implements IProteinRepository {
    getProtein(query: any, options?: any): Promise<Protein> {
      throw new Error(`Method not implemented. ${query} ${options}`);
    }
    getProteins(query: any, options?: any): Promise<Protein[]> {
      throw new Error(`Method not implemented. ${query} ${options}`);
    }
  }

  class MockBrothRepository implements IBrothRepository {
    getBroth(query: any, options?: any): Promise<Broth> {
      throw new Error(`Method not implemented. ${query} ${options}`);
    }
    getBroths(query: any, options?: any): Promise<Broth[]> {
      throw new Error(`Method not implemented. ${query} ${options}`);
    }
  }

  class MockOrderRepository implements IOrderRepository {
    createOrder(input: OrderInputType): Promise<OrderDomain> {
      throw new Error(`Method not implemented. ${input}`);
    }
  }

  let mockProteinRepository: IProteinRepository;
  let mockBrothRepository: IBrothRepository;
  let mockOrderRepository: IOrderRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockProteinRepository = new MockProteinRepository();
    mockBrothRepository = new MockBrothRepository();
    mockOrderRepository = new MockOrderRepository();
  });

  describe('execute', () => {
    process.env.LAMEN_IMAGE_URL = 'dev';
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
        .spyOn(mockProteinRepository, 'getProtein')
        .mockImplementation(() => Promise.resolve(protein));

      jest
        .spyOn(mockBrothRepository, 'getBroth')
        .mockImplementation(() => Promise.resolve(broth));

      jest
        .spyOn(mockOrderRepository, 'createOrder')
        .mockImplementation(() => Promise.resolve(order));

      const newOrderUseCase = new NewOrderUseCase(
        {
          brothRepository: mockBrothRepository,
          proteinRepository: mockProteinRepository,
          orderRepository: mockOrderRepository,
        },
        {
          brothEntity: Broth,
          proteinEntity: Protein,
          orderEntity: Order,
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
        .spyOn(mockProteinRepository, 'getProtein')
        .mockImplementation(() => Promise.resolve(null as any));

      jest
        .spyOn(mockBrothRepository, 'getBroth')
        .mockImplementation(() => Promise.resolve(null as any));

      jest
        .spyOn(mockOrderRepository, 'createOrder')
        .mockImplementation(() => Promise.resolve(null as any));

      const newOrderUseCase = new NewOrderUseCase(
        {
          brothRepository: mockBrothRepository,
          proteinRepository: mockProteinRepository,
          orderRepository: mockOrderRepository,
        },
        {
          brothEntity: Broth,
          proteinEntity: Protein,
          orderEntity: Order,
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
