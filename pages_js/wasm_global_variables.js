const global = new WebAssembly.Global({value: "i32", mutable:true}, 0);

WebAssembly.instantiateStreaming(
    fetch("/resources/wat/global.wasm"),
    {js: {global}}
).then(({instance}) => {
    console.log(instance);
    console.log(instance.exports.getGlobal());
    global.value = 3;
    console.log(global.value);
    console.log(instance.exports.incGlobal());
    console.log(instance.exports.getGlobal());
});
