FROM node:lts-alpine

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir /home/node/app/

WORKDIR /home/node/app

COPY package.json package.json
COPY package-lock.json package-lock.json

ENV
    DB_USER="admin"
    DB_PASSWORD="73p4K-sFGgHfhpH"


RUN npm install --production

COPY .next .next
COPY public public
COPY server server
COPY database database

RUN ls -a

EXPOSE 8080

CMD npm run start