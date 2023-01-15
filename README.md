# UE Chain

## Description

Simple blockchain project consisting of two applications:

1. [Chain instance / miner](https://github.com/Postuj/ue_chain/tree/master/apps/chain)
2. [Wallet app](https://github.com/Postuj/ue_chain/blob/master/apps/wallet/README.md)

Both apps communicate via [gRPC](https://grpc.io/).

## Rules

|Name|Value|
|---|---|
|Block reward type|constant|
|Block reward|10|
|Difficulty type|constant|
|Difficulty|4|
|Initial currency count|1000|

## Prerequisites

- [Docker](https://www.docker.com/)
- [Postman](https://www.postman.com/)

## How to use

1. Import postman collections from `postman` directory
2. Set up `postman` environmental variables ([example](https://github.com/Postuj/ue_chain/blob/master/apps/wallet/README.md))
3. run `docker-compose up --build`
4. 1 chain instance and 3 wallets should initialize
5. getBalance request on `miner_wallet` shoult return `1010`
6. Try sending some transactions 💸

## Author

👨‍🎓 Maciej Siudak 182304
