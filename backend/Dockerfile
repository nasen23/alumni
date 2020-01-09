FROM node:12-alpine

WORKDIR /usr/src/alumni

COPY . /usr/src/alumni

RUN npm i --registry=https://registry.npm.taobao.org
RUN npm i nestjs-admin --registry=https://registry.npm.taobao.org

EXPOSE 3389

CMD ["npm", "start"]
