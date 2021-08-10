
WebAssembly.instantiateStreaming(fetch("/bin/lib_target.wasm"), {})
.then( response => {
    console.log( response );
    // console.log( "results of wasm functions below" );
    // console.log( "30 + 12 : ", response.instance.exports.my_add(30, 12) );
    // console.log( "30 - 12 : ", response.instance.exports.my_subtract(30, 12) );
    // console.log( "30th fib: ", response.instance.exports.nth_fibonacci(30) );
});
