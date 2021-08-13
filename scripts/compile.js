console.log("\n\n\n\n\n\n");

const exec = require("child_process").exec;
const filewatcher = require('filewatcher');

const MAIN_CPP  = "./src/main.cpp";
const LIB_CPP   = "./src/lib.cpp";

const MAIN_OUT  = "./bin/main_target.out";
const LIB_JS    = "./bin/lib_target.js";
const LIB_WASM  = "./bin/lib_target.wasm";
const LIB_WAT   = "./bin/lib_target.wat";

const STD_COMPILE = `g++ -std=gnu++17 ${MAIN_CPP} -o ${MAIN_OUT}`;

/////////////////////////////////

/* // -- legacy commands but may still be useful 
const WASM_COMPILE = `em++ ${LIB_CPP} -o ${LIB_JS}`;

const WASM_OPTIONS =
    "-s EXPORT_ALL=1 -s LINKABLE=1 -s STANDALONE_WASM -Os --no-entry"
// */ // --

const WASM_FUNCTIONS = [
    "my_add", "my_subtract", "nth_fibonacci"
].join("', '_");
const WASM_OPTIONS =
    `-s EXPORTED_FUNCTIONS="[${"'_" + WASM_FUNCTIONS + "'"}]" -s STANDALONE_WASM --no-entry -Os`;
const WASM_COMPILE =
    `em++ --no-entry ${MAIN_CPP} -o ${LIB_WASM} ${WASM_OPTIONS}`;

console.log("\ncompiling using:");
console.log(WASM_COMPILE);
console.log("\n");
/////////////////////////////////

const WASM_TO_WAT = "/home/heartbeast/projects/wasm/wabt/bin/wasm2wat";
const WAT_COMPILE = `${WASM_TO_WAT} ${LIB_WASM}.wasm -o ${LIB_WAT}`;

// const watcher = filewatcher({persistent: false});
const watcher = filewatcher();

function error_pad(a, b) {
    console.log("\n\n\n\n\n\n\n\n\n\n\n");
    console.log("####################################################");
    console.log("####################################################");
    console.log("\n");
    console.log(a);
    console.log("\n");
    console.log("####################################################");
    console.log("####################################################");
    console.log("\n");
    console.log(b);
}


function standard_compile_and_run() {
    console.log("compiling", MAIN_CPP);
    // start_server()
    exec(STD_COMPILE, function (error, stdOut, stdErr) {
        if (error || stdErr) {
            error_pad(error, stdErr);
        } else {
            console.log(stdOut);
            exec(`${MAIN_OUT}`, function (error, stdOut, stdErr) {
                if (error || stdErr) {
                    error_pad(error, stdErr);
                } else {
                    console.log(stdOut);
                }
            });
        }
    });
}


function wasm_compile() {
    console.log("compiling wasm");
    exec(WASM_COMPILE, function (error, stdOut, stdErr) {
        if (error || stdErr) {
            error_pad(error, stdErr);
        } else {
            exec(WAT_COMPILE, function (error, stdOut, stdErr) {
                if (error || stdErr) {
                    error_pad(error, stdErr);
                } else {
                    standard_compile_and_run()
                }
            });
        }
    });
}


function start_server() {
    console.log("restarting server");
    exec("node server.js", function (error, stdOut, stdErr) {
        if (error || stdErr) {
            error_pad(error, stdErr);
        } else {
            console.log(["stdOut", stdOut]);
        }
    });
}

////////////////////////////////////////////////////////////

// watch a file
watcher.add("./src/lib.cpp");
watcher.add("./src/main.cpp");
watcher.add("./");

console.log("./scripts/compile.js: running");
start_server();

watcher.on('change', function(file, stat) {
    if (file == "./src/main.cpp") {
        standard_compile_and_run();
    }
    else if (file == "./src/lib.cpp") {
        wasm_compile();
    }

    if (!stat) console.log('deleted');
});

console.log("./scripts/compile.js: monitoring for file changes");
