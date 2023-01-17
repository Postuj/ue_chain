import { createVerify } from 'crypto';
import { Block } from '../blocks/block';
import { GenesisBlock } from '../blocks/genesisBlock';
import { MinerWallet } from '../wallets/minerWallet';
import { SignedTransaction } from '../transactions/signedTransaction';
import { Transaction } from '../transactions/transaction';
import { ChainConfig } from '../../../config/chain.config';
import { VerifiedTransaction } from '../transactions/varifiedTransaction';

export class Chain {
  private static _instance?: Chain;
  public static get instance(): Chain {
    if (!this._instance) this._instance = new Chain();
    return this._instance!;
  }

  public blocks: Block[];

  private constructor() {
    const minedGenesisBlock = this.mine(new GenesisBlock());
    console.log('🌱 Genesis block mined');
    this.blocks = [minedGenesisBlock];
  }

  get lastBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  public addBlock(signedTransaction: SignedTransaction) {
    if (!this.verifyTransaction(signedTransaction)) return;

    const block = new Block(
      this.blocks.length,
      this.lastBlock.hash,
      new VerifiedTransaction(signedTransaction.transaction, signedTransaction.signature),
      MinerWallet.instance.address,
    );
    const minedBlock = this.mine(block);
    console.log('🎆 Block mined, solution: ', minedBlock.nonce);

    this.blocks.push(block);
  }

  public getAccountBalance(address: string): number {
    const addressHex = Buffer.from(address, 'utf-8').toString('hex');
    let balance = 0;

    const blocksWithAccountTransactions = this.blocks.filter(
      (block) => block.transaction.from === addressHex || block.transaction.to === addressHex,
    );

    blocksWithAccountTransactions.forEach((block) => {
      const transaction = block.transaction;
      if (block.minerAddress === addressHex) balance += ChainConfig.MINING_REWARD;
      if (transaction.to === addressHex) balance += transaction.amount;
      if (transaction.from === addressHex) balance -= transaction.amount;
    });

    return balance;
  }

  private verifyTransaction(signedTransaction: SignedTransaction): boolean {
    if (signedTransaction.transaction.from === signedTransaction.transaction.to) {
      console.log('❌ Transaction sent to same address, aborting...');
      return false;
    }
    if (!this.isSenderAccountOwner(signedTransaction)) {
      console.log('❌ Transaction sender is not an owner of the account, aborting...');
      return false;
    }
    if (!this.canSendAmount(signedTransaction.transaction)) {
      console.log('❌ Transaction amount is higher than sender balance, aborting...');
      return false;
    }

    console.log('✅ Transaction verified');

    return true;
  }

  private isSenderAccountOwner(signedTransaction: SignedTransaction): boolean {
    const verifier = createVerify(ChainConfig.SIGN_ALGO);
    verifier.update(signedTransaction.transaction.toString());

    return verifier.verify(signedTransaction.transaction.from, signedTransaction.signature);
  }

  private canSendAmount(transaction: Transaction): boolean {
    const balance = this.getAccountBalance(transaction.from);
    return balance >= transaction.amount;
  }

  private mine(block: Block): Block {
    const difficulty = ChainConfig.DIFFICULTY;
    const difficultyStr = '0'.repeat(difficulty);
    let solution = 0;
    console.log('⛏  mining...');

    while (true) {
      block.nonce = solution;
      const digest = block.hash;

      if (digest.substring(0, difficulty) === difficultyStr) return block;

      solution++;
    }
  }
}
