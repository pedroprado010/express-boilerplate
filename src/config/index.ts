import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import authRouter from '../routes/auth';
import profileRouter from '../routes/profile';
import http, { Server } from 'http';

export default function configureApp(app: Express): Server {
  /**
   * Middlewares
   */
  app.use(helmet());
  app.use(bodyParser.json());
  const publicDir = path.resolve(__dirname, '../../public');
  app.use('/', express.static(publicDir));

  /**
   * Routes
   */
  const api_prefix = '/api/v1/';
  app.use(api_prefix, authRouter);
  app.use(api_prefix, profileRouter);

  /**
   * Server
   */
  // const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
  // const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
  // var credentials = {key: privateKey, cert: certificate};

  // var httpsServer = https.createServer(credentials, app);
  return http.createServer(app);
}
