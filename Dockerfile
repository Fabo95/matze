# Dockerfile

# base image
FROM node:18-alpine

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . .

# start app
EXPOSE 3000
CMD npm run start