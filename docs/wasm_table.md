# Exploring the "Table" object in WASM

The WASM "Table" object is a resizeable typed array of references

like memory it is accessible by JS and WASM

tables only contain <function reference types> as elements

tables are read only but their indices are stored in linear memory

there are 3 methods associated with tables
    * .set()
        * safely update the table values
    * .get()
        * safely read the table values
    * .grow()
        * safely grow the table values
