FROM node:10-alpine

RUN apk update && apk upgrade && apk add --no-cache bash git openssh

# use changes to package.json to force Docker not to use the cache
# when we change our application's react dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app/

# Install dependencies
# ADD package.json /usr/src/app/
# RUN npm install --silent

ADD . /usr/src/app/
