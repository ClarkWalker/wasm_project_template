// /* ///////////////////////////////////////////////////

let memory = new WebAssembly.Memory({
    initial: 128,
    maximum: 128
});

// memory.grow(10); // grows memory by 10 64 KB pages, thorws error if over max
let arr = new Uint32Array(memory.buffer);

const importObject = {
    env: {
        memory: memory
    }
};

WebAssembly.instantiateStreaming(
    fetch("/bin/lib_target.wasm"), importObject)
.then(({instance, module}) => {
    for(let i = 0; i < 30; i++) {
        arr[i] = i + 1;
    }
    instance.exports.reverse_array(0, 30);
    console.log(arr);
});

/*/////////////////////////

const js_nth_fibonacci = function (n) {
    if (n <= 1) {
        return 1;
    }
    return js_nth_fibonacci( n - 1 ) + js_nth_fibonacci( n - 2 );
}
WebAssembly.instantiateStreaming(
    fetch("/bin/lib_target.wasm"), {})
    .then( response => {
        console.log( response );
        console.log( "results of wasm functions below" );
        console.log( "30 + 12 : ", response.instance.exports.my_add(30, 12) );
        console.log( "30 - 12 : ", response.instance.exports.my_subtract(30, 12) );

        console.time("cpp_nth_fibonacci");
        console.log(
            "30th fibonacci number: ",
            response.instance.exports.nth_fibonacci(30)
        );
        console.timeEnd("cpp_nth_fibonacci");

        console.time("js_nth_fibonacci");
        console.log(
            "30th fibonacci number: ",
            js_nth_fibonacci(30)
        );
        console.timeEnd("js_nth_fibonacci");
    });
///////////////////////////////////////////// */
