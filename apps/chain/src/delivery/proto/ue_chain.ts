import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ChainServiceClient as _chain_ChainServiceClient, ChainServiceDefinition as _chain_ChainServiceDefinition } from './chain/ChainService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  chain: {
    BalanceRequest: MessageTypeDefinition
    BalanceResponse: MessageTypeDefinition
    Block: MessageTypeDefinition
    BlockRequest: MessageTypeDefinition
    BlocksResponse: MessageTypeDefinition
    ChainService: SubtypeConstructor<typeof grpc.Client, _chain_ChainServiceClient> & { service: _chain_ChainServiceDefinition }
    Transaction: MessageTypeDefinition
  }
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
    }
  }
}

