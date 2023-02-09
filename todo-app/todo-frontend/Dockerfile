FROM node:16 AS dev-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test


# The first FROM is now a stage called build-stage
FROM node:16 AS build-stage

WORKDIR /usr/src/app/

COPY --chown=node:node . .

ENV REACT_APP_BACKEND_URL=http://localhost:3000/


RUN npm install

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
