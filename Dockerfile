FROM node:20

USER node
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
