export class ChainConfig {
  public static DIFFICULTY: number = process.env.DIFFICULTY ? +process.env.DIFFICULTY : 4;
  public static MINING_REWARD: number = process.env.MINING_REWARD ? +process.env.MINING_REWARD : 10;
  public static GENESIS_WALLET_BALANCE: number = process.env.GENESIS_WALLET_BALANCE
    ? +process.env.GENESIS_WALLET_BALANCE
    : 10000;
  public static HASH_ALGO = 'SHA256';
  public static SIGN_ALGO = 'SHA256';
  public static MINING_HASH_ALGO = 'MD5';
}
