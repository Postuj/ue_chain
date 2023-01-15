import { MinerWallet } from '../wallets/minerWallet';
import { ChainConfig } from '../../../config/chain.config';
import { VerifiedTransaction } from './varifiedTransaction';
import { Transaction } from './transaction';
import { createSign } from 'crypto';

export class GenesisTransaction extends VerifiedTransaction {
  constructor() {
    const transaction = new Transaction(
      ChainConfig.GENESIS_WALLET_BALANCE,
      'genesis',
      MinerWallet.instance.address,
    );
    const sign = createSign(ChainConfig.SIGN_ALGO);

    sign.update(transaction.toString()).end();
    const signature = sign.sign(MinerWallet.instance.privateKey);
    super(transaction, signature);
  }
}
