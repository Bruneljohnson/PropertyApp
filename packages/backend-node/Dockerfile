FROM node:18.16.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json .
RUN npm install --strict-ssl=false

COPY . .
RUN npm run build

EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]