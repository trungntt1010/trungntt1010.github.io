FROM node:alpine

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm install --legacy-peer-deps
COPY . /code

ENV CI=true
ENV PORT=3000
EXPOSE 3000

CMD [ "npm", "start" ]