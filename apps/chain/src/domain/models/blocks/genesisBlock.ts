import { createHash } from 'crypto';
import { Block } from './block';
import { GenesisTransaction } from '../transactions/genesisTransaction';
import { ChainConfig } from '../../../config/chain.config';

export class GenesisBlock extends Block {
  public readonly timestamp: number = Date.now();
  public readonly previousHash: string = 'genesis';
  constructor() {
    super(0, 'genesis', new GenesisTransaction(), 'genesis');
  }

  public get hash(): string {
    const stringified = this.toString();
    const hash = createHash(ChainConfig.HASH_ALGO);
    hash.update(stringified).end();
    return hash.digest('hex');
  }
}
