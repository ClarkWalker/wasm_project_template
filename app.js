// /* ////////////////////////////////////////////////////////////
// table
const table = new WebAssembly.Table({
    initial: 2,
    element: "anyfunc"
});

WebAssembly.instantiateStreaming(
    fetch("/bin/lib_target.wasm"))
.then((result) => {
    console.log(result);
    table.set(0, result.instance.exports.nth_fibonacci);
    table.set(1, result.instance.exports.my_add);
    table.grow(2, result.instance.exports.my_subtract);
    table.grow(3, result.instance.exports.reverse_array);
    console.log(table.get(0)(30));
    console.log(table.get(1)(9, 5));
    console.log(table.get(2)(9, 5));
    console.log(table.get(3)([5, 4, 3, 2, 1]));
});


/////////////////////////////////////////////////////////////*/
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/* ////////////////////////////////////////////////////////////
// memory
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
    // console.log(arr);
});


/////////////////////////////////////////////////////////////*/
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/* ////////////////////////////////////////////////////////////
// primary

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
