FROM node:alpine

WORKDIR /home/app

COPY package.json yarn.* ./

RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "start"]
