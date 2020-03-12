FROM node:12-alpine AS build_base

WORKDIR /tmp/vue-build

COPY . .

RUN npm install
RUN npm run build

# image
FROM node:12-alpine

LABEL maintainer="henrique.schmidt@somosphi.com"

RUN addgroup -S www && \
  adduser http -S -G www --no-create-home --disabled-password && \
  mkdir /www

ENV TZ Etc/UTC

COPY --from=build_base /tmp/vue-build/dist/ /www/dist/
COPY package.json /www/
COPY package-lock.json /www/
COPY server.js /www/

WORKDIR /www

RUN npm install --production

RUN chmod -R 665 /www && \
  chown -R http:www /www

USER http:www

EXPOSE 3000
RUN ls
RUN exit 1

CMD ["node server.js"]