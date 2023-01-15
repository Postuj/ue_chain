export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GENESIS_WALLET_BALANCE: string;
      DIFFICULTY: string;
      GENESIS: string;
      MINING_REWARD: string;
      PORT: string;
      HOST: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
