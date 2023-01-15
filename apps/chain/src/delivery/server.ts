import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/ue_chain';
import { ChainController } from './chain.controller';

const options: protoLoader.Options = {
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const PROTO_FILE = './proto/ue_chain.proto';
const pkgDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE), options);

const proto = grpc.loadPackageDefinition(pkgDef) as unknown as ProtoGrpcType;

const chainPkg = proto.chain;

const chainController = new ChainController();
export const server = new grpc.Server();
server.addService(chainPkg.ChainService.service, chainController);


