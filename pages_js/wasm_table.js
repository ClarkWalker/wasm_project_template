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
