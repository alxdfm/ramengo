import server from './server';
import { TypeORMWrapper } from './data/data-sources/typeorm/typeorm-wrapper';
import { MySQLDataSource } from './data/data-sources/typeorm/mysql-data-source';
import ProteinRouter from './presentation/routers/protein-router';
import { GetAllProteins } from './domain/use-cases/get-all-proteins';
import BrothRouter from './presentation/routers/broth-router';
import { GetAllBroths } from './domain/use-cases/get-all-broth';

(async () => {
  const database = new TypeORMWrapper(MySQLDataSource);

  const proteinMiddleWare = ProteinRouter(new GetAllProteins(database));
  const brothMiddleWare = BrothRouter(new GetAllBroths(database));

  server.use('/', proteinMiddleWare, brothMiddleWare);
  server.listen(3030, () => console.log('Running on http://localhost:3030'));
})();
