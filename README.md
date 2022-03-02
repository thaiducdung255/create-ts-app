## A CLI to initialize an application using typescript with some preconfigured files for:

* *Nodemon*
* *Eslint*
* *Git pre-commit hook*
* *.editorconfig*

## Install:

* Using npx: `npx ts-gun -s`
* Install globally: `npm i -g ts-gun`

## Usage:

* `ts-gun --help` or `ts-gun -h` for more details
* `ts gun` or `ts gun [OPTION]`
* `ts gun` or `ts gun [OPTION]`

#### Options:
* `-h, --help: show help menu`
* `-a, --all: use pnpm as package manager and install all tools(eslint, install node_module, nodemon, editorconfig, pre-commit-hook, init git repository).`
* `-g, --git: initialize new git repository`
* `-i, --install: install node_modules`
* `-n, --nodemon: integrate nodemon to project`
* `-l, --eslint: integrate eslint to project. Use airbnb-base style guide`
* `-p, --pre-commit-hook: use pre-commit-hook. Will run script "lint" and "test" in package.json file`
* `-e, --editorconfig: create .editorconfig file`

#### Examples:
* `ts-gun`: create a new folder with configuration files. Recomended
* `ts-gun -a`: skip all prompts and create configuration files at current directory. Use `ts-gun -h` for more detail
* `ts-gun -tile`: setup typescript for project, install `node_modules`, create a `.eslintrc.json` and `.editorconfig` file in current directory,

#### Notes:
* Only `ts-gun` command will **create a folder** with configuration files in it. Other commands only create configuration files in current directory
* Option `--nodemon` or `-n` **only works** for typescript projects

###### Commands:
* Command to start project: `npm start` or `pnpm start` or `yarn start`
* Command to start project in watch mode(live reloading source code): `npm run dev` or `pnpm dev` or `yarn run dev`
* Command to check for eslint errors: `npm run lint` or `pnpm lint` or `yarn run lint`
* Command to run test (not configurated yet): `npm run test` or `pnpm test` or `yarn test`

###### Typescript option:
* Source code must be placed in `/src` directory, `.js` files will be placed in `/dist` directory. View `tsconfig.json` file for more details
* Project entry point (first file run when project start) if `--ts` option is set: `/src/main.ts`

###### Nodemon option:
* Same as `Typescript option` section. View `nodemon.json` file for more details

###### Eslint option:
* Use `airbnb-base` as coding style
* Some rules may not work property for different IDEs. Only tested on Neovim 0.6. Thus, you may need to edit file `.eslintrc.json` if you have problems with eslint or open an issue in the github repository

## Change log:
### 2.0.0
* Change option `--skip` to `-all`
* Will create a new folder with configuration file if command `ts-gun` is called.
* For `--eslint` option, will create file `.eslintrc.json` instead of `.eslintrc.js`. Because `.eslintrc.json`file supports Schema Store (https://www.schemastore.org/json/)
* Rename options `-pch` and `-ecfg` to `-p` and `-e`. The old options do not work for commands that use multiple options.

## Support and Improvement:
* Open an issue in: https://github.com/thaiducdung255/ts-gun/issues
* Contact me via Gmail: mducdung255@gmail.com

