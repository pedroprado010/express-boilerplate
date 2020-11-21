import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import configApp from './config';

const httpServer = configApp(express());

httpServer.listen(3000, () => {
  console.log('server booted on port 3000');
});
