import HttpError from '../errors/http-error';
import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ msg: err.message });
  }
  return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
};

export default errorHandler;