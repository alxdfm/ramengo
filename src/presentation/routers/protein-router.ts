import express from 'express';
import { Request, Response } from 'express';
import { IGetAllProteinsUseCase } from '../../domain/interfaces/use-cases/get-all-proteins';
import { ErrorType } from '../types';

export default function ProteinRouter(
  getAllContactsUseCase: IGetAllProteinsUseCase,
) {
  const router = express.Router();

  router.get('/proteins', async (req: Request, res: Response) => {
    try {
      const contacts = await getAllContactsUseCase.execute();
      res.send(contacts);
    } catch (err) {
      const error: ErrorType = { error: 'could not get proteins' };
      res.status(500).send(error);
    }
  });

  return router;
}
