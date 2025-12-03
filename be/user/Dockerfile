FROM node:20-alpine

WORKDIR /user

COPY user/package.json .

RUN npm install

COPY middleware /middleware

COPY user/ .

EXPOSE 8080

CMD ["npm", "start"]