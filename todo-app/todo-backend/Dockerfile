FROM node:16

WORKDIR /usr/src/app/backend

COPY --chown=node:node . .

RUN npm ci

ENV npm run dev

USER node

CMD npm start
