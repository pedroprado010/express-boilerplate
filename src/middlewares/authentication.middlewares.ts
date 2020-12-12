import { RequestHandler, Response } from 'express';
import HttpError from '../errors/http-error';
import { TokenPayload } from '../models/account.model';
import { verifyJWT } from '../services/security.service';

const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new HttpError('unauthorized', 'Authorization header is empty.');
    }
    const payload = await verifyJWT<TokenPayload>(token);
    res.locals.token = payload;
    next();
  } catch (error) {
    next(error);
  }
};

export function getToken(res: Response): TokenPayload {
  return res.locals.token;
}

export default isAuthenticated;
