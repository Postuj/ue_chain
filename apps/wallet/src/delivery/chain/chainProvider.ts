import { ChainProvider } from '../../domain/interfaces/chainProvider';
import { PersonalWallet } from '../../domain/models/wallets/personalWallet';
import { client } from './client';

export class ChainProviderImpl implements ChainProvider {
  private readonly wallet = PersonalWallet.instance;

  getAddress(): string {
    return this.wallet.address;
  }

  getBalance(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      client.getBalance(
        {
          address: this.wallet.address,
        },
        (err, res) => {
          if (err) {
            console.error(err);
            reject();
            return;
          }
          resolve(res!.balance);
        },
      );
    });
  }
  
  sendTransaction(amount: number, to: string): Promise<void> {
    const signedTransaction = this.wallet.sendTransfer(amount, to);
    return new Promise<void>((resolve, reject) => {
      client.sendTransaction(
        {
          ...signedTransaction.transaction,
          signature: signedTransaction.signature,
        },
        (err, _) => {
          if (err) {
            console.error(err);
            reject();
            return;
          }

          resolve();
        },
      );
    });
  }
}
