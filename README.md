# WASM project template
Easily start a new WASM project by cloning this repo

-------------------------------------------------------------------------------

## Clone This Repo

> #### Use **one** of the following commands to clone the repo
Clone with http (if you don't have ssh set up)
```sh
git clone git@github.com:redheartbeast/wasm_project_template.git
```
Clone with ssh (if you have ssh set up)
```sh
git clone git@github.com:redheartbeast/wasm_project_template.git
```

#### (Optional) change the name of your project folder.
```sh
mv wasm_project_template new_project_name
```
* replacing `new_project_name` with whatever you want to change the name of your project too, i.e. `my_fancy_lil_project`


#### Move to the newly cloned project directory.
```sh
cd wasm_project_template
```
* replacing `wasm_project_template` with whatever you changed the name of your project too, i.e. `new_project_name`

#### Are you starting a new project or contributing to this template?
If you want to start a new project run\
1)
```sh
rm -rf .git
git init
```
2) set up your git repo in github as you normally would :)\
\
If you're contributing to this work\
1) **Thank you :D**\
2) you don't need to do anything else, just move onto the next step :)

-------------------------------------------------------------------------------

## Installing

### Dependencies
NOTE: You'll need to install emscripten separately if you haven't done so already.  [**Click here to get started with emscripten.**](https://emscripten.org/docs/getting_started/index.html)  Once there click **"Download and install"** for installation instructions.

#### npm dependencies
To install dependencies including development dependencies run
```sh
./run_install.sh -D
```
To install only production dependencies run
```sh
./run_install.sh
```
* this can be a useful starting place for a full install script once you deploy to your users
* If you have any trouble with node_modules you can reinstall node_modules with the same commands.

## Running and developing

To start the app run the following in bash
```sh
./run.sh
```
To start the app in development mode.
```sh
./run.sh dev
```
* This will run the compiler when you change the cpp file contents.
