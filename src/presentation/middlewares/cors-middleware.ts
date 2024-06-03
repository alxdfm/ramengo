import { NextFunction, Request, Response } from 'express';

export const allowCrossDomain = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, x-api-key',
  );

  next();
};
