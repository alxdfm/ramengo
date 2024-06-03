import express, { Request, Response } from 'express';
import { IGetAllBrothsUseCase } from '../../domain/interfaces/use-cases/get-all-broths';
import { ErrorType } from '../types';

export default function brothRouter(getAllBrothsUseCase: IGetAllBrothsUseCase) {
  const router = express.Router();

  router.get('/broths', async (req: Request, res: Response) => {
    try {
      const broths = await getAllBrothsUseCase.execute();
      return res.send(broths);
    } catch (err) {
      const error: ErrorType = { error: 'could not get broths' };
      return res.status(500).send(error);
    }
  });

  return router;
}
