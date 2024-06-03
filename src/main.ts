import server from './server';
import { TypeORMWrapper } from './data/data-sources/typeorm/typeorm-wrapper';
import { MySQLDataSource } from './data/data-sources/typeorm/mysql-data-source';
import { GetAllProteinsUseCase } from './domain/use-cases/get-all-proteins';
import { GetAllBrothsUseCase } from './domain/use-cases/get-all-broths';
import { NewOrderUseCase } from './domain/use-cases/new-order';
import { Order } from './data/data-sources/typeorm/entities/order';
import { Broth } from './data/data-sources/typeorm/entities/broth';
import { Protein } from './data/data-sources/typeorm/entities/protein';
import { authorizationMiddleware } from './presentation/middlewares/authorization-middleware';
import proteinRouter from './presentation/routers/protein-router';
import brothRouter from './presentation/routers/broth-router';
import orderRouter from './presentation/routers/order-router';
import { ProteinRepository } from './domain/repositories/protein-repository';
import { BrothRepository } from './domain/repositories/broth-repository';
import { OrderRepository } from './domain/repositories/order-repository';

const { PORT } = process.env;

(async () => {
  const database = new TypeORMWrapper(MySQLDataSource);

  const proteinRepository = new ProteinRepository(database);
  const brothRepository = new BrothRepository(database);
  const orderRepository = new OrderRepository(database);

  server.use(authorizationMiddleware);

  server.use(
    orderRouter(
      new NewOrderUseCase(
        { orderRepository, brothRepository, proteinRepository },
        {
          orderEntity: Order,
          brothEntity: Broth,
          proteinEntity: Protein,
        },
      ),
    ),
  );
  server.use(
    proteinRouter(
      new GetAllProteinsUseCase(proteinRepository, { proteinEntity: Protein }),
    ),
  );
  server.use(
    brothRouter(
      new GetAllBrothsUseCase(brothRepository, { brothEntity: Broth }),
    ),
  );

  server.listen(PORT, () => console.log(`Running server on port ${PORT}`));
})();
