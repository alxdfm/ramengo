import { Request, Response, Router } from 'express';
import { IGetAllProteinsUseCase } from '../../domain/interfaces/use-cases/get-all-proteins';
import { ErrorType } from '../types';

export default function ProteinRouter(
  getAllProteinsUseCase: IGetAllProteinsUseCase,
  router: Router,
) {
  router.get('/proteins', async (req: Request, res: Response) => {
    try {
      const proteins = await getAllProteinsUseCase.execute();
      return res.send(proteins);
    } catch (err) {
      const error: ErrorType = { error: 'could not get proteins' };
      return res.status(500).send(error);
    }
  });

  return router;
}
