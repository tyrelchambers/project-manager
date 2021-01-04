FROM node:alpine

WORKDIR /app

RUN mkdir -p /node_modules && chown -R node:node /node_modules
COPY --chown=node:node . .

ENV PATH /node_modules/.bin:$PATH
COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]

