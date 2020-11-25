import { RequestHandler, Response } from 'express';
import HttpError from '../errors/http-error';
import { verifyJWT } from '../services/security';

const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new HttpError('unauthorized', 'Authorization header is empty.');
    }
    res.locals.token = await verifyJWT(token);
    next();
  } catch (error) {
    next(error);
  }
};

export function getToken<T>(res: Response): T  {
  return res.locals.token;
}

export default isAuthenticated;
