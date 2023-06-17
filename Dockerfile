FROM node:lts-alpine

COPY . .
COPY . .

RUN ls -a

EXPOSE 3000

CMD npm run start