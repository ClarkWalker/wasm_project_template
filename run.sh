#bin/#!/usr/bin/env bash

if [ "$#" -lt 1 ]; then
    nodemon --exec npm run start
else
    nodemon --exec npm run $1
fi

exit 0
