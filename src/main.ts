import { TypeORMWrapper } from './data/data-sources/typeorm/typeorm-wrapper';
import { MySQLDataSource } from './data/data-sources/typeorm/mysql-data-source';
import ProteinRouter from './presentation/routers/protein-router';
import { GetAllProteins } from './domain/use-cases/get-all-proteins';
import server from './server';

(async () => {
  const database = new TypeORMWrapper(MySQLDataSource);

  const proteinMiddleWare = ProteinRouter(new GetAllProteins(database));

  server.use('/', proteinMiddleWare);
  server.listen(3030, () => console.log('Running on http://localhost:3030'));
})();
