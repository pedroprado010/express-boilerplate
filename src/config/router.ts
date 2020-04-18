import fs from 'fs';
import path from 'path';
import { Router, Express } from 'express';


function configRouter(expressApp: Express): Express {
  const routesDir = path.resolve(__dirname, '../routes');
  const dir = fs.readdirSync(routesDir);
  const jsFiles = dir.filter((file) => file.endsWith('.js') && file !== 'index.js');
  return jsFiles.reduce((app, fileName) => {
    const filePath = path.resolve(routesDir, fileName);
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const router = require(filePath).default;
    if (!(Object.getPrototypeOf(router) === Router)) {
      throw new Error(`Invalid file, should default export an express.Router.\n ${filePath}.`);
    }
    app.use('/api/v1/', router);
    return app;
  }, expressApp);
}

export default configRouter;
