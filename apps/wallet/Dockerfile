FROM node:18-alpine

WORKDIR /chain

COPY yarn.lock package*.json .env ./keys ./

RUN yarn install --frozen-lockfile

COPY . .

ENV PORT=3160

RUN yarn build

EXPOSE 3160

CMD [ "yarn", "start:prod" ]