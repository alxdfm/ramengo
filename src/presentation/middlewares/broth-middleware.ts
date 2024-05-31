import BrothRouter from '../routers/broth-router';

export const brothMiddleWare = (useCase: any) => BrothRouter(useCase);
