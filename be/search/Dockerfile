FROM node:20-alpine

WORKDIR /search

COPY search/package.json .

RUN npm install

COPY middleware /middleware

COPY search/ .

EXPOSE 8080

CMD ["npm", "start"]