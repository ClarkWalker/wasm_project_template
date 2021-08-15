console.log("\n\n\n\n\n\n");
// const server = require('../server.js');

const exec = require("child_process").exec;
const filewatcher = require('filewatcher');

const MAIN_CPP  = "./src/main.cpp";
const LIB_CPP   = "./src/lib.cpp";

const MAIN_OUT  = "./bin/main_target.out";
const LIB_JS    = "./bin/lib_target.js";
const LIB_WASM  = "./bin/lib_target.wasm";

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

// const watcher = filewatcher({persistent: false});
const watcher = filewatcher();

const error_pad = function (error, stdErr, title="") {
  console.log("\n\n\n\n\n\n\n\n\n\n\n");
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(`error from ${title}:`);
  console.log("\n");
  console.log(error);
  console.log("\n");
  console.log("____________________________________________________");
  console.log("————————————————————————————————————————————————————");
  console.log("————————————————————————————————————————————————————");
  console.log("____________________________________________________");
  console.log(`stdErr from ${title}:`);
  console.log("\n");
  console.log(stdErr);
  console.log("\n");
  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
}


const bash_exec = function (title, command, callback=null, cb_args=[]) {
  console.log(title);
  exec(command, function (error, stdOut, stdErr) {
    if (error || stdErr) {
      error_pad(error, stdErr, title);
    }
    console.log(stdOut);
    if (typeof(callback) == "function") {
      callback(...cb_args);
    }
  });
}


const start_server = function () {
  const server = require('../server.js');
  console.log("restarting server");
  return server;
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
    bash_exec("STD_COMPILE", STD_COMPILE,
      bash_exec, ["MAIN_OUT", MAIN_OUT, start_server]
    );
  } else if (file == "./src/lib.cpp") {
    bash_exec("WASM_COMPILE", WASM_COMPILE,
      bash_exec, ["STD_COMPILE", STD_COMPILE,
        bash_exec, ["MAIN_OUT", MAIN_OUT, start_server]
      ]
    );
  }
  if (!stat) console.log('deleted');
});

console.log("./scripts/compile.js: monitoring for file changes");
