import 'dotenv/config';
import { Server } from './delivery/server/server';

const server = new Server();
server.listen();
