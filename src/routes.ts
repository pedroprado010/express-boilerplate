import { Express } from 'express';
import { hello } from './controllers/hello';

export const addRoutes = (app: Express) => {
  app.get('/api/v1/hello', hello);

  return app;
};