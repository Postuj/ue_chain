import 'dotenv/config';
import { server } from './delivery/server';
import * as grpc from '@grpc/grpc-js';
import { Chain } from './domain/models/chain/chain';

console.log('ENVIRONMENT:', process.env.ENV);
console.log('GENESIS:', process.env.GENESIS === 'true');
console.log('DIFFICULTY:', process.env.DIFFICULTY);

const PORT = process.env.PORT ? +process.env.PORT : 3160;
const HOST = process.env.HOST ?? 'localhost';

Chain.instance;

server.bindAsync(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }

  server.start();
  console.log(`Server listening on: ${HOST}:${port}`);
});
