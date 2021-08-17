# Exploring the "Memory" object in WASM

In WASM "memory" is represented as a contiguous range of untyped bytes
    this is called linear memory

Linear memory is organized in pages
where each page is 64KB

| 0 | 1 | 2 | 3 | 4 | ... | Linear Memory |
| - |   |   |   |   |     |               |

* memory is variable and is represented in units of 64KB pages

* bytes (*pages?) are addressed starting from the offset 0

* memory constraints can be specified by a developer by setting a minimum and or a maximum memory size in units of pages.

* memory can be grown in units of pages as the program runs, up until the maximum if a maximum number of pages is specified.
    * since memory is contiguous when growing memory it is possible that the new required memory will exceed the bounds of the available memory (not exceeding the maximum specified memory).  
    In such an event the entire program memory can/will be relocated to a new block where the new required amount of contiguous memory is available

* Internal memory can be accessed with the operators `load` and `store` `load` reads and `store` writes

* memory can only store 1 of the 4 primitives [i32 i64 f32 f64]

* a WASM instance can only use 1 memory object

* in terms of javascript a memory instance can be thought of as a re sizable array buffer which is a kind of byte array.
