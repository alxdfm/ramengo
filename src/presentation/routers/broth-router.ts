import express from 'express';
import { Request, Response } from 'express';
import { IGetAllBrothsUseCase } from '../../domain/interfaces/use-cases/get-all-broths';
import { ErrorType } from '../types';

export default function BrothRouter(getAllBrothsUseCase: IGetAllBrothsUseCase) {
  const router = express.Router();

  router.get('/broths', async (req: Request, res: Response) => {
    try {
      const broths = await getAllBrothsUseCase.execute();
      res.send(broths);
    } catch (err) {
      const error: ErrorType = { error: 'could not get broths' };
      res.status(500).send(error);
    }
  });

  return router;
}
