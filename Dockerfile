FROM node:6.2.0

EXPOSE 5002

ADD . /polisClientAdmin
WORKDIR /polisClientAdmin

RUN npm install
CMD npm start; sleep infinity
