import { Request, Response } from 'express';
import { IGetAllBrothsUseCase } from '../../domain/interfaces/use-cases/get-all-broths';
import { ErrorType } from '../types';
import { Router } from 'express';

export default function BrothRouter(
  getAllBrothsUseCase: IGetAllBrothsUseCase,
  router: Router,
) {
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
