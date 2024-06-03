import { Request, Response, Router } from 'express';
import { ErrorType } from '../types';
import { INewOrderUseCase } from '../../domain/interfaces/use-cases/new-order';

export default function OrderRouter(
  newOrderUseCase: INewOrderUseCase,
  router: Router,
) {
  router.post('/order', async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const order = await newOrderUseCase.execute(req.body);
      return res.status(201).send(order);
    } catch (err: any) {
      const error: ErrorType = { error: err.errorMessage } || {
        error: 'could not place order',
      };

      return res.status(err.status || 500).send(error);
    }
  });

  return router;
}
