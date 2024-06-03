import express from 'express';
import { Request, Response } from 'express';
import { ErrorType } from '../types';
import { INewOrderUseCase } from '../../domain/interfaces/use-cases/new-order';
import { checkOrderDataMiddleware } from '../middlewares/check-order-data-middleware';

export default function OrderRouter(newOrderUseCase: INewOrderUseCase) {
  const router = express.Router();

  router.post(
    '/order',
    // checkOrderDataMiddleware,
    async (req: Request, res: Response) => {
      try {
        const order = await newOrderUseCase.execute(req.body);
        return res.status(201).send(order);
      } catch (err) {
        const error: ErrorType = { error: 'could not place order' };
        return res.status(500).send(error);
      }
    },
  );

  return router;
}
