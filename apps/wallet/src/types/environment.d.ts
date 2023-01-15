export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GENESIS: string;
      SERVER_PORT: string;
      PORT: string;
      HOST: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
