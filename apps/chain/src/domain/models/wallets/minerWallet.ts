import { createSign, generateKeyPairSync } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { ChainConfig } from '../../../config/chain.config';
import {
  MinerKeysNotFoundError,
  UnableToSaveMinerKeysError,
} from '../../errors/walletMissingKeysErrors';
import { Wallet } from '../../interfaces/wallet';
import { Chain } from '../chain/chain';
import { SignedTransaction } from '../transactions/signedTransaction';
import { Transaction } from '../transactions/transaction';

type KeyPair = {
  privateKey: string;
  publicKey: string;
};

export class MinerWallet implements Wallet {
  public readonly publicKey: string;
  public readonly privateKey: string;
  private static _instance: Wallet;

  private constructor() {
    const { privateKey, publicKey } = this.loadKeys();

    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  get address(): string {
    return this.publicKey;
  }

  public static get instance(): Wallet {
    if (!this._instance) this._instance = new MinerWallet();
    return this._instance;
  }

  sendTransfer(amount: number, toAddress: string): SignedTransaction {
    const transaction = new Transaction(amount, this.address, toAddress);
    const sign = createSign(ChainConfig.SIGN_ALGO);

    sign.update(transaction.toString()).end();
    const signature = sign.sign(this.privateKey);
    const signedTransaction = new SignedTransaction(transaction, signature);
    Chain.instance.addBlock(signedTransaction);
    return signedTransaction;
  }

  private loadKeys(): KeyPair {
    console.log('🔑 Loading miner keys...');
    try {
      return this.readKeysFromFile();
    } catch (_) {
      console.log('🏭 Miner keys not found, creating new key pair for miner...');
      return this.generateKeys();
    }
  }

  private generateKeys() {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
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
    this.saveKeysInFiles(privateKey, publicKey);
    return { privateKey, publicKey };
  }

  private prepareKeysDir() {
    if (!existsSync('./keys')) mkdirSync('./keys');
  }

  private readKeysFromFile(): KeyPair {
    try {
      const privateKey = readFileSync('keys/private_key.pem', { encoding: 'utf-8' });
      const publicKey = readFileSync('keys/public_key.pem', { encoding: 'utf-8' });
      return { privateKey, publicKey };
    } catch (_) {
      throw new MinerKeysNotFoundError();
    }
  }

  private saveKeysInFiles(privateKey: string, publicKey: string) {
    try {
      this.prepareKeysDir();
      writeFileSync('keys/private_key.pem', privateKey);
      writeFileSync('keys/public_key.pem', publicKey);
    } catch (_) {
      throw new UnableToSaveMinerKeysError();
    }
  }
}
