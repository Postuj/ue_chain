import { generateKeyPairSync, createSign } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { ChainConfig } from '../../../config/chain.config';
import { KeysNotFoundError, UnableToSaveWalletKeysError } from '../../errors/keysNotFoundError';
import { Wallet } from '../../interfaces/wallet';
import { SignedTransaction } from '../transactions/signedTransaction';
import { Transaction } from '../transactions/transaction';

type KeyPair = {
  privateKey: string;
  publicKey: string;
};

export class PersonalWallet implements Wallet {
  private static _instance: Wallet;
  public readonly publicKey: string;
  public readonly privateKey: string;

  constructor() {
    const { privateKey, publicKey } = this.loadKeys();

    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  get address(): string {
    return this.publicKey;
  }

  public static get instance(): Wallet {
    if (!this._instance) this._instance = new PersonalWallet();
    return this._instance;
  }

  public sendTransfer(amount: number, toAddress: string): SignedTransaction {
    const transaction = new Transaction(amount, this.address, toAddress);
    const sign = createSign(ChainConfig.SIGN_ALGO!);

    sign.update(transaction.toString()).end();
    const signature = sign.sign(this.privateKey);
    const signedTransaction = new SignedTransaction(transaction, signature);
    return signedTransaction;
  }

  private loadKeys(): KeyPair {
    console.log('🔑 Loading wallet keys...');
    if (process.env.GENESIS !== 'true') return this.generateKeys();

    console.log('🌱 Genesis wallet, loading keys...');
    try {
      return this.readKeysFromFile();
    } catch (_) {
      console.log('🏭 Wallet keys not found, creating new key pair...');
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
      throw new KeysNotFoundError();
    }
  }

  private saveKeysInFiles(privateKey: string, publicKey: string) {
    try {
      this.prepareKeysDir();
      writeFileSync('keys/private_key.pem', privateKey);
      writeFileSync('keys/public_key.pem', publicKey);
    } catch (_) {
      throw new UnableToSaveWalletKeysError();
    }
  }
}
