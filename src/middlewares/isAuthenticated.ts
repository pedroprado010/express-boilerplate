import { RequestHandler } from 'express';
import { verifyJWT } from '../services/security';

const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('');
    }
    await verifyJWT(token);
    next()
  } catch (error) {
    next(error);
  }
}

export default isAuthenticated;
