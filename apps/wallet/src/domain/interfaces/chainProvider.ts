export interface ChainProvider {
  getAddress(): string;
  getBalance(): Promise<number>;
  sendTransaction(amount: number, to: string): Promise<void>;
}
