import { RequestHandler } from 'express';
import { db } from '../utils/database.js';

export const hello: RequestHandler = async (req, res) => {
  res.status(200);
  
  const dbTest = await db.raw('select \'1\'');

  console.log({ dbTest });
  res.json({ good: 1 });
};