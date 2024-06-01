import server from './server';
import { TypeORMWrapper } from './data/data-sources/typeorm/typeorm-wrapper';
import { MySQLDataSource } from './data/data-sources/typeorm/mysql-data-source';
import { GetAllProteinsUseCase } from './domain/use-cases/get-all-proteins';
import { GetAllBrothsUseCase } from './domain/use-cases/get-all-broths';
import { NewOrderUseCase } from './domain/use-cases/new-order';
import { Order } from './data/data-sources/typeorm/entities/order';
import { Broth } from './data/data-sources/typeorm/entities/broth';
import { Protein } from './data/data-sources/typeorm/entities/protein';
import { proteinMiddleWare } from './presentation/middlewares/protein-middleware';
import { brothMiddleWare } from './presentation/middlewares/broth-middleware';
import { orderMiddleWare } from './presentation/middlewares/order-middleware';
import { authorizationMiddleware } from './presentation/middlewares/authorization-middleware';

const { PORT } = process.env;

(async () => {
  const database = new TypeORMWrapper(MySQLDataSource);

  server.use(
    '/',
    authorizationMiddleware,
    proteinMiddleWare(
      new GetAllProteinsUseCase(database, { proteinEntity: Protein }),
    ),
    brothMiddleWare(new GetAllBrothsUseCase(database, { brothEntity: Broth })),
    orderMiddleWare(
      new NewOrderUseCase(database, {
        orderEntity: Order,
        brothEntity: Broth,
        proteinEntity: Protein,
      }),
    ),
  );
  server.listen(PORT, () => console.log(`Running server on port ${PORT}`));
})();
