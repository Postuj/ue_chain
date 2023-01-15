// Original file: src/delivery/proto/ue_chain.proto


export interface Transaction {
  'from'?: (string);
  'to'?: (string);
  'amount'?: (number);
  'signature'?: (Buffer | Uint8Array | string);
}

export interface Transaction__Output {
  'from': (string);
  'to': (string);
  'amount': (number);
  'signature': (Buffer);
}
