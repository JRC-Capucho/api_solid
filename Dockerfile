FROM node:20.15.0 as build

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.15.0-alpine3.19 as production

WORKDIR /usr/src/app

COPY  --from=build /usr/src/app/package.json ./package.json
COPY  --from=build /usr/src/app/build ./build
COPY  --from=build /usr/src/app/node_modules ./node_modules
COPY  --from=build /usr/src/app/prisma ./prisma

EXPOSE 3333

CMD [ "npm","run","start" ]
