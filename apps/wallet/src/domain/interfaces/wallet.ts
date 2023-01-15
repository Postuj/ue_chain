import { SignedTransaction } from '../models/transactions/signedTransaction';

export interface Wallet {
  readonly publicKey: string;
  readonly privateKey: string;
  sendTransfer(amount: number, toAddress: string): SignedTransaction;
  get address(): string;
}
