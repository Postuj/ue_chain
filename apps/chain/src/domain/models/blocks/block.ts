import { createHash } from 'crypto';
import { ChainConfig } from '../../../config/chain.config';
import { VerifiedTransaction } from '../transactions/varifiedTransaction';
import { Stringifiable } from '../utils/stringifiable';

export class Block extends Stringifiable {
  public readonly timestamp: number = Date.now();
  constructor(
    public readonly blockNumber: number,
    public readonly previousHash: string,
    public readonly transaction: VerifiedTransaction,
    public readonly minerAddress: string,
    public nonce?: number,
  ) {
    super();
  }

  public get hash(): string {
    const stringified = this.toString();
    const hash = createHash(ChainConfig.HASH_ALGO);
    hash.update(stringified).end();
    return hash.digest('hex');
  }
}
