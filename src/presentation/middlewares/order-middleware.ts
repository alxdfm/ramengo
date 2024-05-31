import OrderRouter from '../routers/order-router';

export const orderMiddleWare = (useCase: any) => OrderRouter(useCase);
