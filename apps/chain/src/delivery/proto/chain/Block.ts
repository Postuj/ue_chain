// Original file: src/delivery/proto/ue_chain.proto

import type { Transaction as _chain_Transaction, Transaction__Output as _chain_Transaction__Output } from '../chain/Transaction';

export interface Block {
  'blockNumber'?: (number);
  'previousHash'?: (string);
  'nonce'?: (string);
  'minerAddress'?: (string);
  'transaction'?: (_chain_Transaction | null);
}

export interface Block__Output {
  'blockNumber': (number);
  'previousHash': (string);
  'nonce': (string);
  'minerAddress': (string);
  'transaction': (_chain_Transaction__Output | null);
}
