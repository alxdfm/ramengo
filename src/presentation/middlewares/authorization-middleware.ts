import { Request, Response, NextFunction } from 'express';

const { API_KEY, ALLOW_ORIGIN } = process.env;

export const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.header('Access-Control-Allow-Origin', ALLOW_ORIGIN);
  const apiKey = req.headers['x-api-key'];

  const isEmptyApiKey = !apiKey;

  if (isEmptyApiKey) {
    return res.status(403).send({ error: 'x-api-key header missing' });
  }

  const apiKeyIsWrong = apiKey !== API_KEY;

  if (apiKeyIsWrong) {
    return res.status(401).send({ error: 'wrong x-api-key' });
  }

  return next();
};
