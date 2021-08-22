#bin/#!/usr/bin/env bash

rm -rf ./node_modules
if [ "$#" -lt 1 ]; then
    npm install --production
else
    npm install -D
fi

exit 0;
