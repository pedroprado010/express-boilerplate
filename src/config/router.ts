import { Express } from 'express';

import authRouter from '../routes/auth';
import profileRouter from '../routes/profile';

function configRouter(app: Express): Express {
  const api_prefix = '/api/v1/';
  app.use(api_prefix, authRouter);
  app.use(api_prefix, profileRouter);
  return app;
}

export default configRouter;
