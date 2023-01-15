import { Transaction } from './transaction';

export class VerifiedTransaction extends Transaction {
  public readonly signature: string;
  constructor(transaction: Transaction, _signature: Buffer) {
    super(transaction.amount, transaction.from, transaction.to);
    this.signature = _signature.toString('hex');
  }
}
