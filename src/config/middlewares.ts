import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';

function configMiddlewares(app: Express): Express {
  app.use(helmet());
  app.use(bodyParser.json());
  const publicDir = path.resolve(__dirname, '../../public');
  app.use('/', express.static(publicDir));
  return app;
}

export default configMiddlewares;
