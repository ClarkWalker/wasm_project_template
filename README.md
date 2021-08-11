
# Running and developing

To start the app run the following in bash
```sh
./run.sh
```

Use the dev flag to run in development mode.  This will run the compiler.
```sh
./run.sh dev
```

## Troubleshooting

### Express server won't shut down
Occasionally running a valid startup command such as `npm run start` or `node server.js` or `./run.sh` results in a server that won't shut down this is accompanied by node crashing and showing the error `Error: listen EADDRINUSE: address already in use :::8000`.  The manual fix is shown below...
```sh
sudo lsof -i:8000
```
output
```sh
COMMAND     PID        USER   FD   TYPE   DEVICE SIZE/OFF NODE NAME
...
node    3440115   user_name   18u  IPv6 87600688      0t0  TCP *:8000 (LISTEN)
...
```
Look under the `NAME` column for the entry that says `8000 (LISTEN)`
```sh
NAME
*:8000 (LISTEN)
```
this indicates that this process is a server that is listening on a port.  To the left of that you'll find the port number of the offending process (8000 in this case).  Verify that the port number is the port that the server was running on then kill the process by it's PID `3440115` in this case.
```sh
kill 3440115
```
