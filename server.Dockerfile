FROM node:lts-alpine

RUN mkdir /home/node/server/

WORKDIR /home/node/server

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --production

COPY server server
COPY database database

RUN ls -a

EXPOSE 8080

CMD node server/server.js