import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/routes';
import { json } from 'body-parser';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(json());
app.use('/api', routes);

export default app;
