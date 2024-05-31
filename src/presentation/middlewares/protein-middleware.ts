import ProteinRouter from '../routers/protein-router';

export const proteinMiddleWare = (useCase: any) => ProteinRouter(useCase);
