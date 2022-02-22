## A CLI to initialize an application using typescript with some preconfigured files for:

* *Nodemon*
* *Eslint*
* *Git pre commit hook*
* *.editorconfig*

## Install:

* Using npx(recommended): `npx ts-gun -s`
* Install globally: `npm i -g ts-gun`

## Usage:

* `ts gun [OPTION]` (requires install ts-gun as global dependency)

### Options:
* -h, --help: show help menu
* -s, --skip: use pnpm as package manager and install all tools(eslint, install node_module, nodemon, editorconfig, pre-commit-hook, init git repository). Recommended
* -g, --git: initialize new git repository
* -i, --install: install node_modules
* -n, --nodemon: integrate nodemon to project
* -e, --eslint: integrate eslint to project. Use airbnb-base style guide
* -pch, --pre-commit-hook: use pre-commit-hook. Will run script "lint" and "test" in package.json file
* -ecfg, --editorconfig: create .editorconfig file
