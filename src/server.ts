import express from 'express';
import { addRoutes } from './routes.js';

export const app = express();

app.use(express.json());
app.use('/', express.static('public'));

addRoutes(app);
