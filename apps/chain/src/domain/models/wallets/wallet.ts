import { generateKeyPairSync, createSign } from 'crypto';
import { ChainConfig } from '../../../config/chain.config';
import { Wallet } from '../../interfaces/wallet';
import { Chain } from '../chain/chain';
import { SignedTransaction } from '../transactions/signedTransaction';
import { Transaction } from '../transactions/transaction';

export class PersonalWallet implements Wallet {
  public readonly publicKey: string;
  public readonly privateKey: string;

  constructor() {
    const { privateKey, publicKey } = this.generateKeys();

    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  get address(): string {
    return this.publicKey;
  }

  public sendTransfer(amount: number, toAddress: string): SignedTransaction {
    const transaction = new Transaction(amount, this.address, toAddress);
    const sign = createSign(ChainConfig.SIGN_ALGO!);

    sign.update(transaction.toString()).end();
    const signature = sign.sign(this.privateKey);
    const signedTransaction = new SignedTransaction(transaction, signature);
    Chain.instance.addBlock(signedTransaction);
    return signedTransaction;
  }

  private generateKeys() {
    return generateKeyPairSync('rsa', {
      modulusLength: 512,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });
  }
}
