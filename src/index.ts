import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import configApp from './config';
import logger from './utils/logger';

const httpServer = configApp(express());

httpServer.listen(3000, () => {
  logger.log('server booted on port 3000');
});
