import { config } from 'dotenv';

config();

let app;

import('./server.js').then(async (server) => {
  app = server.app;
  app.listen(1234);
});
