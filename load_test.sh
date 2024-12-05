#!/bin/bash

if [ $# -ne 1 ] || { [ "$1" != "sqlite" ] && [ "$1" != "redis" ]; }; then
    echo "Usage: load_test.sh <sqlite|redis>"
    exit 1
fi

if [ "$1" == "sqlite" ]; then
    k6 run -e PORT=3000 k6-200.js
fi

if [ "$1" == "redis" ]; then
    k6 run -e PORT=4000 k6-200.js
fi
