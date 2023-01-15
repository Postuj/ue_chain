export abstract class Stringifiable {
  toString() {
    return JSON.stringify(this);
  }
}
