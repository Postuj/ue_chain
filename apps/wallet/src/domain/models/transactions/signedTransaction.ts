import { Transaction } from './transaction';

export class SignedTransaction {
  constructor(public readonly transaction: Transaction, public readonly signature: Buffer) {}
}
