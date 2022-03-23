FROM node:latest

WORKDIR /arkham-ui

COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm i

CMD ["npm", "start"]