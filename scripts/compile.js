
// imports
const exec = require("child_process").exec;
const filewatcher = require('filewatcher');
const watcher = filewatcher();

// file locations
const main_cpp  = "./src/main.cpp";
const lib_cpp   = "./src/lib.cpp";

const main_out  = "./bin/main_target.out";
const lib_js    = "./bin/lib_target.js";
const lib_wasm  = "./bin/lib_target.wasm";
const lib_wat   = "./bin/lib_target.wat";

// cpp exported functions list
const exported_functions = `-s EXPORTED_FUNCTIONS="[${"'_" + [
    "my_add",
    "my_subtract",
    "nth_fibonacci",
    "reverse_array"
].join("', '_") + "'"}]"`;

// compiler commands
const wasm_compile = [
    "em++",
    "--no-entry",
    main_cpp,
    // lib_cpp,
    `-o ${lib_wasm}`,
    // /*///////////////////////////
        exported_functions,
        /*/
        "-s LINKABLE=1 -s EXPORT_ALL=1",
    // *////////////////////////////
    "-s STANDALONE_WASM",
    "-Os"
].join(" ")

const wasm2wat = `./node_modules/wat-wasm/bin/wasm2wat ${lib_wasm} -o ${lib_wat}`

const std_compile = `g++ -std=gnu++17 ${main_cpp} -o ${main_out}`;

////////////////////////////////////////////////////////////
// definitions
const error_pad = function (err, title="", standard_error=true) {
    if (standard_error) {
        standard_error = "standard ";
    } else {
        standard_error = "non standard ";
    }
    const padding = 1;
    const width = process.stdout.columns - (padding * 2);
    const message = `\
    ${standard_error}error from (${title}):
${" ".repeat(padding)}${"_".repeat(width)}
${" ".repeat(padding)}${"—".repeat(width)}
${" ".repeat(padding)}${"—".repeat(width)}
${" ".repeat(padding)}${"_".repeat(width)}

${err}
${" ".repeat(padding)}${"—".repeat(width)}
${" ".repeat(padding)}${"_".repeat(width)}
${" ".repeat(padding)}${"_".repeat(width)}
${" ".repeat(padding)}${"—".repeat(width)}`;
    console.error(message);
}


const bash_exec = function (title, command=false, callback=null, cb_args=[]) {
    if (! command) {
        command = title;
    }
    console.log(`${title}:`);
    exec(command, function (error, stdOut, stdErr) {
        if (error) {
            error_pad(error, title, false);
        }
        if (stdErr) {
            error_pad(stdErr, title);
        }
        console.log(stdOut);
        if (typeof(callback) == "function") {
            callback(...cb_args);
        }
    });
}


const start_server = function (verbose=true) {
    const server = require('../server.js');
    if (verbose) {
        console.log("restarting server");
    }
    return server;
}

////////////////////////////////////////////////////////////
// implementations

// watch a file
watcher.add("./src/lib.cpp");
watcher.add("./src/main.cpp");
watcher.add("./");

// console.log("./scripts/compile.js: running");
start_server();
bash_exec("npm run test");

watcher.on('change', function(file, stat) {
    if (file == "./src/main.cpp") {
        console.log("\n\n\n\n\n\n\n\n\n\n\n");
        console.log(`compiling using: $ ${std_compile}\n`);
        bash_exec("std_compile", std_compile,
            bash_exec, ["main_out", main_out,
                bash_exec, ["npm run test", "", start_server]
            ]
        );
    } else if (file == "./src/lib.cpp") {
        console.log("\n\n\n\n\n\n\n\n\n\n\n");
        console.log(`compiling using: $ ${wasm_compile}\n`);
        bash_exec("wasm_compile", wasm_compile,
            bash_exec, ["std_compile", std_compile,
                bash_exec, ["main_out", main_out,
                    bash_exec, ["wasm2wat", wasm2wat,
                        bash_exec, ["npm run test", "", start_server]
                    ]
                ]
            ]
        );
    } else {
        // bash_exec("npm run test");
    }

    if (!stat) console.log('deleted');
});

console.log("./scripts/compile.js: monitoring for file changes");
