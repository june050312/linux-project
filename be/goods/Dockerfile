FROM node:20-alpine

WORKDIR /goods

COPY goods/package.json .

RUN npm install

COPY middleware /middleware

COPY goods/ .

EXPOSE 8080

CMD ["npm", "start"]