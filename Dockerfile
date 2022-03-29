# FROM node:latest

# WORKDIR /arkham-ui

# # COPY . /arkham-ui
# VOLUME $(pwd):/arkham-ui

# EXPOSE 3000

FROM node:14-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

# RUN npm install

EXPOSE 3000


CMD [ "npm", "start"]