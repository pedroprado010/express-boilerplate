import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import configServer from './config/server';

const httpServer = configServer(express());

httpServer.listen(3000, () => {
  console.log('server booted on port 3000');
});
