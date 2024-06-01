import { Request, Response, NextFunction } from 'express';

export const checkOrderDataMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  const isMissingInput = !body.brothId || !body.proteinId;

  if (isMissingInput) {
    res.status(400).send({ error: 'both brothId and proteinId are required' });
  }

  return next();
};