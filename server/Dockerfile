FROM node:14-alpine

WORKDIR /app

COPY ./ .

RUN yarn

EXPOSE 5000

ENTRYPOINT [ "yarn", "start" ]