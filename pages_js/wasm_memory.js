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
