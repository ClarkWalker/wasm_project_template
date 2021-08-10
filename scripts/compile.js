const exec = require("child_process").exec;
const filewatcher = require('filewatcher');

const watcher = filewatcher();

const MAIN_CPP          = "./src/main.cpp";
const LIB_CPP           = "./src/lib.cpp";

const MAIN_OUT   = "./bin/main_target.out";
const LIB_JS     = "./bin/lib_target.js";
const LIB_WASM   = "./bin/lib_target.wasm";
const LIB_WAT    = "./bin/lib_target.wat";

const STD_COMPILE   = `g++ -std=gnu++17 ${MAIN_CPP} -o ${MAIN_OUT}`;
const WASM_COMPILE  = `em++ ${LIB_CPP} -o ${LIB_JS}`;
const WASM_TO_WAT   = "/home/heartbeast/projects/wasm/wabt/bin/wasm2wat";
const WAT_COMPILE   = `${WASM_TO_WAT} ${LIB_WASM}.wasm -o ${LIB_WAT}`;




// watch a file
watcher.add("./src/lib.cpp");
watcher.add("./src/main.cpp");
watcher.add("./");

console.log("./scripts/compile.js: compiling source to bin");
watcher.on('change', function(file, stat) {
    if (file == "./src/main.cpp") {
        exec(STD_COMPILE, function (error, stdOut, stdErr) {
            console.log(stdOut);
            exec(`${MAIN_OUT}`, function (error, stdOut, stdErr) {
                console.log(stdOut);
            });
        });
    }
    else if (file == "./src/lib.cpp") {
        exec(STD_COMPILE, function (error, stdOut, stdErr) {
            // console.log(stdOut);
        });
        exec(WASM_COMPILE, function (error, stdOut, stdErr) {
            // console.log(stdOut);
        });
        exec(WAT_COMPILE, function (error, stdOut, stdErr) {
            // console.log(stdOut);
        });
        exec(`${MAIN_OUT}`, function (error, stdOut, stdErr) {
            console.log(stdOut);
        });
    }
    else {
        console.log("floooooop");
        exec("nodemon", function (error, stdOut, stdErr) {
            // console.log(stdOut);
        });
    }
    if (!stat) console.log('deleted');
});

console.log("./scripts/compile.js: finished all");
