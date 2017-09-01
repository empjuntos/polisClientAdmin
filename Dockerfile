FROM node:6.2.0

ENV SERVICE_URL=http://polis-server:5000

EXPOSE 5002

ADD . /polisClientAdmin
WORKDIR /polisClientAdmin

RUN npm install
CMD npm start
