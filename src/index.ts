import dotenv from 'dotenv';
import express from 'express';
import configApp from './config';

dotenv.config();

const httpServer = configApp(express());

httpServer.listen(3000, () => {
  console.log('server booted on port 3000');
});
