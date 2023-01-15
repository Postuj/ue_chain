export class MinerKeysNotFoundError extends Error {
  constructor() {
    super('Keys for miner wallet not found.');
  }
}

export class UnableToSaveMinerKeysError extends Error {
  constructor() {
    super('Unable to save miner wallet keys.');
  }
}
