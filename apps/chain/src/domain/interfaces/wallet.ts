import { SignedTransaction } from '../models/transactions/signedTransaction';

export interface Wallet {
  readonly publicKey: string;
  readonly privateKey: string;
  get address(): string;
  sendTransfer(amount: number, toAddress: string): SignedTransaction;
}
