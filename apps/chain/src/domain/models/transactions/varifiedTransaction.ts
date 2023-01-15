import { Transaction } from './transaction';

export class VerifiedTransaction extends Transaction {
  public readonly signature: string;
  constructor(transaction: Transaction, _signature: Buffer) {
    const fromHex = Buffer.from(transaction.from, 'utf-8').toString('hex');
    const toHex = Buffer.from(transaction.to, 'utf-8').toString('hex');
    super(transaction.amount, fromHex, toHex);
    this.signature = _signature.toString('hex');
  }
}
