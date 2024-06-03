import express from 'express';
import { Request, Response } from 'express';
import { ErrorType } from '../types';
import { INewOrderUseCase } from '../../domain/interfaces/use-cases/new-order';

export default function OrderRouter(newOrderUseCase: INewOrderUseCase) {
  const router = express.Router();

  router.post('/order', async (req: Request, res: Response) => {
    try {
      const order = await newOrderUseCase.execute(req.body);
      return res.status(201).send(order);
    } catch (err) {
      const error: ErrorType = { error: 'could not place order' };
      return res.status(500).send(error);
    }
  });

  return router;
}
