const express = require("express");
const app = express();
const port = 8000;

app.use(express.static(__dirname + ""));

express.static.mime.types[".wasm"] = "application/wasm";

const server = app.listen(port, (err) => {
  if (err) {
    res.send("closing..");
    app.close();
  }
  console.log(`Server running on port: ${port}`);
});

module.exports = server;
