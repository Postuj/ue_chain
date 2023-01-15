import * as grpc from '@grpc/grpc-js';
import { Chain } from '../domain/models/chain/chain';
import { SignedTransaction } from '../domain/models/transactions/signedTransaction';
import { Transaction } from '../domain/models/transactions/transaction';
import { BalanceRequest__Output } from './proto/chain/BalanceRequest';
import { BalanceResponse } from './proto/chain/BalanceResponse';
import { BlockRequest__Output } from './proto/chain/BlockRequest';
import { BlocksResponse } from './proto/chain/BlocksResponse';
import { ChainServiceHandlers } from './proto/chain/ChainService';
import { Transaction__Output } from './proto/chain/Transaction';
import { Empty } from './proto/google/protobuf/Empty';

export class ChainController implements ChainServiceHandlers {
  [name: string]: import('@grpc/grpc-js').UntypedHandleCall;
  getBalance(
    req: grpc.ServerUnaryCall<BalanceRequest__Output, BalanceResponse>,
    res: grpc.sendUnaryData<BalanceResponse>,
  ) {
    try {
      res(null, {
        balance: Chain.instance.getAccountBalance(req.request.address),
      });
    } catch (_) {
      res({ code: grpc.status.INTERNAL, message: 'Cannot get balance' });
    }
  }

  getBlocks(
    req: grpc.ServerUnaryCall<BlockRequest__Output, BlocksResponse>,
    res: grpc.sendUnaryData<BlocksResponse>,
  ) {}

  sendTransaction(
    req: grpc.ServerUnaryCall<Transaction__Output, Empty>,
    res: grpc.sendUnaryData<Empty>,
  ) {
    const { amount, from, to, signature } = req.request;
    const transaction = new Transaction(amount, from, to);
    const signedTransaction = new SignedTransaction(transaction, signature);
    Chain.instance.addBlock(signedTransaction);
    res(null, {} as Empty);
  }
}
