
#!/bin/bash

PROTO_DIR=./src/delivery/proto/

# Chain App
cd apps/chain

if [ -d ${PROTO_DIR} ]; then rm -rf ${PROTO_DIR}; fi

mkdir ${PROTO_DIR}

cp -R ../../proto/ ./src/delivery/

# Generate types
yarn proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=${PROTO_DIR} ${PROTO_DIR}*.proto


# Wallet App
cd ../wallet

if [ -d ${PROTO_DIR} ]; then rm -rf ${PROTO_DIR}; fi

mkdir ${PROTO_DIR}

cp -R ../../proto/ ./src/delivery/

# Generate types
yarn proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=${PROTO_DIR} ${PROTO_DIR}*.proto


