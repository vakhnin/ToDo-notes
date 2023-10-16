FROM node:18-alpine

RUN mkdir -p ./node_modules && chown -R node:node ./

WORKDIR ./

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "App.js" ]