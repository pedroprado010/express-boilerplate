import { RequestHandler } from 'express';

export const hello: RequestHandler = (req, res) => {
  res.status(200);
  res.json({ good: 1 });
};