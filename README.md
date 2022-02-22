## A CLI to initialize an application using typescript with some preconfigured files for:

* *Nodemon*
* *Eslint*
* *Git pre commit hook*
* *.editorconfig*

## Install:

* Using npx(recommended): `npx ts-gun -s`
* Install globally: `npm i -g ts-gun`

## Usage (require to install _ts-gun_ as global dependency):

* `ts-gun --help` or `ts-gun -h`
* `ts gun [OPTION]`

#### Options:
* `-h, --help: show help menu`
* `-s, --skip: use pnpm as package manager and install all tools(eslint, install node_module, nodemon, editorconfig, pre-commit-hook, init git repository). Recommended`
* `-g, --git: initialize new git repository`
* `-i, --install: install node_modules`
* `-n, --nodemon: integrate nodemon to project`
* `-e, --eslint: integrate eslint to project. Use airbnb-base style guide`
* `-pch, --pre-commit-hook: use pre-commit-hook. Will run script "lint" and "test" in package.json file`
* `-ecfg, --editorconfig: create .editorconfig file`

#### Support and Improvement:
* Open an issue in: https://github.com/thaiducdung255/ts-gun/issues
* Contact me via Gmail: mducdung255@gmail.com
