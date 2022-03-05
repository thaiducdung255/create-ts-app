## A CLI to initialize an application using typescript with some preconfigured files for:

* *Nodemon*
* *Eslint*
* *Git pre-commit hook*
* *.editorconfig*

## Install:

* Using ts-gun without install it: `npx ts-gun`
* Install globally: `npm i -g ts-gun`

## Usage:

* `ts-gun --help` or `ts-gun -h` for more details
* `ts gun` or `ts gun [OPTION]`

#### Options:
* `-h, --help: show help menu`
* `-a, --all: use pnpm as package manager and install all tools(eslint, install node_module, nodemon, editorconfig, pre-commit-hook, init git repository) in current directory.`
* `-g, --git: initialize new git repository`
* `-i, --install: install node_modules`
* `-r, --nodemon: integrate nodemon to project`
* `-l, --eslint: integrate eslint to project. Use airbnb-base style guide`
* `-p, --pre-commit-hook: use pre-commit-hook. Will run script "lint" and "test" in package.json file`
* `-e, --editorconfig: create .editorconfig file`
* `-n, --name: will create a folder with given name in current directory. other configuration files will be placed inside this folder`
* `--npm: use npm as package manager when using with option --install`
* `--pnpm: use npm as package manager when using with option --install`
* `--yarn: use npm as package manager when using with option --install`

#### Examples:
* `ts-gun`: create a new folder with configuration files. Recomended
* `ts-gun -an nodejs`: skip all prompts and create configuration files in a new folder named `nodejs`. Use `ts-gun -h` for more detail
* `ts-gun -tile --yarn`: setup typescript for project, install `node_modules` using `yarn`, create a `.eslintrc.json` and `.editorconfig` file in current directory,

#### Notes:
* **Do not** use both options `--name` and package manager options(`--yarn`, `--npm`, `-pnpm`) in one command: this is the problem of `arg`. Use `ts-gun` instead
* Option `--nodemon` currently **only works** for typescript projects. I strongly recommend use typescript instead of javascript
* Option `--eslint` currently **only works** for typescript projects. I strongly recommend use typescript instead of javascript

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
* Known problem: sometimes , newest versions of typescript do not supported by Eslint, you may need to downgrade typescript version to make sure eslint can work

## Change log:
### 3.0.0
* Change alias of nodemon option from `-n` to `-r`
* Add new option: `--name` and its alias `-n`: the name of the new created folder by `ts-gun`, other configuration files will be placed inside this folder
* Add new option: `--npm`: use npm as package manager when install dependencies
* Add new option: `--pnpm`: use pnpm as package manager when install dependencies
* Add new option: `--yarn`: use yarn as package manager when install dependencies

### 2.0.0
* Change option `--skip` to `-all`
* Will create a new folder with configuration file if command `ts-gun` is called.
* For `--eslint` option, will create file `.eslintrc.json` instead of `.eslintrc.js`. Because `.eslintrc.json`file supports Schema Store (https://www.schemastore.org/json/)
* Rename options `-pch` and `-ecfg` to `-p` and `-e`. The old options do not work for commands that use multiple options.

## Support and Improvement:
* Open an issue in: https://github.com/thaiducdung255/ts-gun/issues
* Contact me via Gmail: mducdung255@gmail.com
