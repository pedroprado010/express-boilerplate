import { Express } from 'express';
import http, { Server } from 'http';
// import https from 'https';
// import fs from 'fs';

function configServer(app: Express): Server {
  // const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
  // const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
  // var credentials = {key: privateKey, cert: certificate};


  // var httpsServer = https.createServer(credentials, app);
  return http.createServer(app);
}

export default configServer;
