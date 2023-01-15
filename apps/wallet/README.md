# Wallet application

Simple wallet implemented using [Node.js](https://nodejs.org/en/). It consists of [gRPC](https://grpc.io/) clinet for communication with [Blockchain instance](https://github.com/Postuj/ue_chain/tree/master/apps/chain) and `REST API` for user interactions.

## Example

### *Miner wallet* balance
![image](https://user-images.githubusercontent.com/59115438/212570741-99e35fe5-29b6-48b4-8364-23eb965c2fbb.png)

### *Wallet 2* balance
![image](https://user-images.githubusercontent.com/59115438/212570775-2c8a735b-31d9-4ce2-b1a9-d5e12b4117ae.png)

### Transaction *Miner wallet* -> *Wallet 2*
![image](https://user-images.githubusercontent.com/59115438/212570895-d7537ba9-b5ac-4a99-abc4-09035ec1c9c3.png)

### *Miner wallet* balance after transaction
Note: `860 = 1000 - 150 + 10` because 10 is a minig reward
![image](https://user-images.githubusercontent.com/59115438/212570985-77ddc99c-7b2c-45ad-87c5-8ee64f397851.png)

### *Wallet 2* balance after transaction
![image](https://user-images.githubusercontent.com/59115438/212571057-d71bc4a1-fea1-4895-9afa-a33831937a29.png)

## Postman env vars
Note: Before testing send `get_address` request for each wallet address in order to save it in vars
![image](https://user-images.githubusercontent.com/59115438/212571088-28713b8e-355e-4f6e-981f-0f911fbc4b77.png)


