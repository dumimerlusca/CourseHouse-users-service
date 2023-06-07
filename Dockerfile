FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN yarn install --production

COPY . .

RUN yarn build

CMD ["yarn","start"]