import HttpError from '../errors/http-error';
import { ErrorRequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }
  if (err instanceof HttpError) {
    return res.status(err.status).json({ msg: err.message });
  }
  return res.status(500).json({ msg: 'INTERNAL SERVER ERROR' });
};

export default errorHandler;
