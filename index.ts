import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { build } from './core/build';

const app: Express = express();
const port = process.env.PORT;

app.get('/build', async (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
  await build();
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
