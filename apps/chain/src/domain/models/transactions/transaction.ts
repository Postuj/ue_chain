import { Stringifiable } from '../utils/stringifiable';

export class Transaction extends Stringifiable {
  constructor(
    public readonly amount: number,
    public readonly from: string,
    public readonly to: string,
  ) {
    super();
  }
}
