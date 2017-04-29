#! /bin/bash

current_environment="$RUN_ENV"

env_file="config/env/dev.env"

if [ ! -f "$env_file" ];
then
  echo "Please, setup the environment variables"
  exit 1
fi  

source $env_file

# DEBUG=http,express:* nodemon app.js
node dev-server.js
echo
echo "RUNNING CLIENT ADMIN";
echo
