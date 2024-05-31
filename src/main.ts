import server from './server';
import { TypeORMWrapper } from './data/data-sources/typeorm/typeorm-wrapper';
import { MySQLDataSource } from './data/data-sources/typeorm/mysql-data-source';
import ProteinRouter from './presentation/routers/protein-router';
import { GetAllProteins } from './domain/use-cases/get-all-proteins';
import BrothRouter from './presentation/routers/broth-router';
import { GetAllBroths } from './domain/use-cases/get-all-broths';
import OrderRouter from './presentation/routers/order-router';
import { NewOrder } from './domain/use-cases/new-order';
import { Order } from './data/data-sources/typeorm/entities/order';
import { Broth } from './data/data-sources/typeorm/entities/broth';
import { Protein } from './data/data-sources/typeorm/entities/protein';

(async () => {
  const database = new TypeORMWrapper(MySQLDataSource);

  const proteinMiddleWare = ProteinRouter(new GetAllProteins(database)); // TODO: Adicionar entity aqui também
  const brothMiddleWare = BrothRouter(new GetAllBroths(database)); // TODO: Adicionar entity aqui também
  const orderMiddleWare = OrderRouter(
    new NewOrder(database, {
      orderEntity: Order,
      brothEntity: Broth,
      proteinEntity: Protein,
    }),
  );

  server.use('/', proteinMiddleWare, brothMiddleWare, orderMiddleWare);
  server.listen(3030, () => console.log('Running on http://localhost:3030'));
})();
