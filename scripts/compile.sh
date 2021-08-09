#bin/#!/usr/bin/env bash

#########
# g++ -std=c++17
#
#########

echo "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";

MAIN_CPP="./src/main.cpp"
LIB_CPP="./src/lib.cpp"

MAIN_TARGET_OUT="./bin/main_target.out"
LIB_TARGET_JS="./bin/lib_target.js"
LIB_TARGET_WASM="./bin/lib_target.wasm"
LIB_TARGET_WAT="./bin/lib_target.wat"

g++ -std=gnu++17 "$MAIN_CPP" -o "$MAIN_TARGET_OUT"
echo "RESULTS"
./"$MAIN_TARGET_OUT"
## testing emscriptin
# em++ LIB_CPP -o ../bin/lib_target.js

## convert wasm output to "human readable" wat
# /home/heartbeast/projects/wasm/wabt/bin/wasm2wat lib_target.wasm -o lib_target.wat

##################################################
################# output options #################
##################################################
# ./testing/test_run;

# ls

exit 0;
