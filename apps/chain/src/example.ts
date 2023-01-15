import 'dotenv/config';
import { Chain } from './domain/models/chain/chain';
import { MinerWallet } from './domain/models/wallets/minerWallet';
import { PersonalWallet as Wallet } from './domain/models/wallets/wallet';

console.log('ENVIRONMENT:', process.env.ENV);
console.log('GENESIS:', process.env.GENESIS === 'true');
console.log('DIFFICULTY:', process.env.DIFFICULTY);

const minerWallet = MinerWallet.instance;
const satoshi = new Wallet();
const bob = new Wallet();
const alice = new Wallet();

satoshi.sendTransfer(500, bob.address); // ❌
satoshi.sendTransfer(500, satoshi.address); // ❌
minerWallet.sendTransfer(500, satoshi.address); // ✅
minerWallet.sendTransfer(52, bob.address); // ✅
minerWallet.sendTransfer(23, alice.address); // ✅
minerWallet.sendTransfer(45, bob.address); // ✅
satoshi.sendTransfer(100, alice.address); // ✅

console.log('satoshi', Chain.instance.getAccountBalance(satoshi.address));
console.log('bob', Chain.instance.getAccountBalance(bob.address));
console.log('alice', Chain.instance.getAccountBalance(alice.address));
console.log('minerWallet', Chain.instance.getAccountBalance(minerWallet.address));
