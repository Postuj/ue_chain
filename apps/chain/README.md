# Chain instance

Simple blockchain instance implemented using [Node.js](https://nodejs.org/en/), which was not best choice for creating this kind of application and I do regret choosing it. Application communicates via [gRPC](https://grpc.io/).

## Example usage
```ts
import 'dotenv/config';
import { Chain } from './domain/models/chain/chain';
import { MinerWallet } from './domain/models/wallets/minerWallet';
import { PersonalWallet as Wallet } from './domain/models/wallets/wallet';

const minerWallet = MinerWallet.instance;
const john = new Wallet();
const amanda = new Wallet();
const dave = new Wallet();

dave.sendTransfer(500, john.address); // ❌
dave.sendTransfer(500, dave.address); // ❌
minerWallet.sendTransfer(500, dave.address); // ✅
minerWallet.sendTransfer(52, john.address); // ✅
minerWallet.sendTransfer(23, amanda.address); // ✅
minerWallet.sendTransfer(45, john.address); // ✅
dave.sendTransfer(100, amanda.address); // ✅

console.log('dave', Chain.instance.getAccountBalance(dave.address));
console.log('john', Chain.instance.getAccountBalance(john.address));
console.log('amanda', Chain.instance.getAccountBalance(amanda.address));
console.log('minerWallet', Chain.instance.getAccountBalance(minerWallet.address));

```