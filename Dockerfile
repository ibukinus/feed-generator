FROM node:20 as builder
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ ./.yarn/
RUN yarn install --immutable

COPY . .

FROM node:20-slim
ENV NODE_ENV production
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY  . .

# USER node
EXPOSE 3000

CMD ["yarn", "start"]