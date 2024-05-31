import express from 'express';
import { Request, Response } from 'express';
import { IGetAllProteinsUseCase } from '../../domain/interfaces/use-cases/get-all-proteins';
import { ErrorType } from '../types';

export default function ProteinRouter(
  getAllProteinsUseCase: IGetAllProteinsUseCase,
) {
  const router = express.Router();

  router.get('/proteins', async (req: Request, res: Response) => {
    try {
      const proteins = await getAllProteinsUseCase.execute();
      res.send(proteins);
    } catch (err) {
      const error: ErrorType = { error: 'could not get proteins' };
      res.status(500).send(error);
    }
  });

  return router;
}
