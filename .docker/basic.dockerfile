FROM node:20-alpine
LABEL author="khanhnguyendev <khanhnguyen.vlu@gmail.com>"

WORKDIR /appp

COPY package.json yarn.lock ./
RUN apk add --no-cache git \
  && yarn install --frozen-lockfile \
  && yarn cache clean

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]