import express, { Request, Response } from 'express';
import { ErrorType } from '../types';
import { INewOrderUseCase } from '../../domain/interfaces/use-cases/new-order';

export default function orderRouter(newOrderUseCase: INewOrderUseCase) {
  const router = express.Router();

  router.post('/order', async (req: Request, res: Response) => {
    try {
      const jsonParsedInput = JSON.parse(req.body);
      const order = await newOrderUseCase.execute(jsonParsedInput);
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
