import express from 'express';
import * as core from 'express-serve-static-core';
import { chainRouter } from './chainRouter';

export class Server {
  private readonly app: core.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use('/api/chain', chainRouter);
  }

  listen() {
    const PORT = process.env.SERVER_PORT ?? 3001;
    this.app.listen(PORT, () => {
      console.log('Server listening on port: ', PORT);
    });
  }
}
