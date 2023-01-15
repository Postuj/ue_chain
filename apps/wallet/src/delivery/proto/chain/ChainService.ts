// Original file: src/delivery/proto/ue_chain.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { BalanceRequest as _chain_BalanceRequest, BalanceRequest__Output as _chain_BalanceRequest__Output } from '../chain/BalanceRequest';
import type { BalanceResponse as _chain_BalanceResponse, BalanceResponse__Output as _chain_BalanceResponse__Output } from '../chain/BalanceResponse';
import type { BlockRequest as _chain_BlockRequest, BlockRequest__Output as _chain_BlockRequest__Output } from '../chain/BlockRequest';
import type { BlocksResponse as _chain_BlocksResponse, BlocksResponse__Output as _chain_BlocksResponse__Output } from '../chain/BlocksResponse';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { Transaction as _chain_Transaction, Transaction__Output as _chain_Transaction__Output } from '../chain/Transaction';

export interface ChainServiceClient extends grpc.Client {
  getBalance(argument: _chain_BalanceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chain_BalanceResponse__Output>): grpc.ClientUnaryCall;
  getBalance(argument: _chain_BalanceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chain_BalanceResponse__Output>): grpc.ClientUnaryCall;
  getBalance(argument: _chain_BalanceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chain_BalanceResponse__Output>): grpc.ClientUnaryCall;
  getBalance(argument: _chain_BalanceRequest, callback: grpc.requestCallback<_chain_BalanceResponse__Output>): grpc.ClientUnaryCall;
  getBalance(argument: _chain_BalanceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chain_BalanceResponse__Output>): grpc.ClientUnaryCall;
  getBalance(argument: _chain_BalanceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chain_BalanceResponse__Output>): grpc.ClientUnaryCall;
  getBalance(argument: _chain_BalanceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chain_BalanceResponse__Output>): grpc.ClientUnaryCall;
  getBalance(argument: _chain_BalanceRequest, callback: grpc.requestCallback<_chain_BalanceResponse__Output>): grpc.ClientUnaryCall;
  
  getBlocks(argument: _chain_BlockRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chain_BlocksResponse__Output>): grpc.ClientUnaryCall;
  getBlocks(argument: _chain_BlockRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chain_BlocksResponse__Output>): grpc.ClientUnaryCall;
  getBlocks(argument: _chain_BlockRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chain_BlocksResponse__Output>): grpc.ClientUnaryCall;
  getBlocks(argument: _chain_BlockRequest, callback: grpc.requestCallback<_chain_BlocksResponse__Output>): grpc.ClientUnaryCall;
  getBlocks(argument: _chain_BlockRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chain_BlocksResponse__Output>): grpc.ClientUnaryCall;
  getBlocks(argument: _chain_BlockRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chain_BlocksResponse__Output>): grpc.ClientUnaryCall;
  getBlocks(argument: _chain_BlockRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chain_BlocksResponse__Output>): grpc.ClientUnaryCall;
  getBlocks(argument: _chain_BlockRequest, callback: grpc.requestCallback<_chain_BlocksResponse__Output>): grpc.ClientUnaryCall;
  
  sendTransaction(argument: _chain_Transaction, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendTransaction(argument: _chain_Transaction, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendTransaction(argument: _chain_Transaction, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendTransaction(argument: _chain_Transaction, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendTransaction(argument: _chain_Transaction, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendTransaction(argument: _chain_Transaction, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendTransaction(argument: _chain_Transaction, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendTransaction(argument: _chain_Transaction, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
}

export interface ChainServiceHandlers extends grpc.UntypedServiceImplementation {
  getBalance: grpc.handleUnaryCall<_chain_BalanceRequest__Output, _chain_BalanceResponse>;
  
  getBlocks: grpc.handleUnaryCall<_chain_BlockRequest__Output, _chain_BlocksResponse>;
  
  sendTransaction: grpc.handleUnaryCall<_chain_Transaction__Output, _google_protobuf_Empty>;
  
}

export interface ChainServiceDefinition extends grpc.ServiceDefinition {
  getBalance: MethodDefinition<_chain_BalanceRequest, _chain_BalanceResponse, _chain_BalanceRequest__Output, _chain_BalanceResponse__Output>
  getBlocks: MethodDefinition<_chain_BlockRequest, _chain_BlocksResponse, _chain_BlockRequest__Output, _chain_BlocksResponse__Output>
  sendTransaction: MethodDefinition<_chain_Transaction, _google_protobuf_Empty, _chain_Transaction__Output, _google_protobuf_Empty__Output>
}
