FROM node:10-alpine as build-deps

RUN apk update && apk upgrade && apk add --no-cache bash git openssh

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build


FROM nginx:1-alpine

COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
