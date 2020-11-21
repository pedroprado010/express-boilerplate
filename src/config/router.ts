import { Express } from 'express';

import authRouter from '../routes/auth';

function configRouter(app: Express): Express {
  app.use('api/v1/', authRouter);
  return app;
}

export default configRouter;
