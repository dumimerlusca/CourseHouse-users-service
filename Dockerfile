FROM node:lts

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

RUN yarn prisma generate --schema ./prisma/schema.prisma

CMD ["yarn","start"]