FROM node:20-alpine

WORKDIR /purchase

COPY purchase/package.json .

RUN npm install

COPY middleware /middleware

COPY purchase/ .

EXPOSE 8080

CMD ["npm", "start"]