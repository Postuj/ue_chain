import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/ue_chain';
import { ChainProviderImpl } from './chainProvider';

const options: protoLoader.Options = {
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const PORT = process.env.PORT ? +process.env.PORT : 3160;
const HOST = process.env.HOST ?? '127.0.0.1';
const PROTO_FILE = './proto/ue_chain.proto';
const pkgDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE), options);
const proto = grpc.loadPackageDefinition(pkgDef) as unknown as ProtoGrpcType;

console.log(`🌐 Connecting to gRPC server on ${HOST}:${PORT}`);

export const client = new proto.chain.ChainService(
  `${HOST}:${PORT}`,
  grpc.credentials.createInsecure(),
);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);

const onClientReady = async () => {
  console.log('🔁 gRPC client ready');
};

client.waitForReady(deadline, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  onClientReady();
});
