export class KeysNotFoundError extends Error {
  constructor() {
    super('Wallet keys not found.');
  }
}

export class UnableToSaveWalletKeysError extends Error {
  constructor() {
    super('Unable to save wallet keys.');
  }
}