## A CLI to initialize an application using typescript with some preconfigured files for:

* *Nodemon*
* *Eslint*
* *Commitlint + Husky*
* *.editorconfig*

## Install:

* Using ts-gun without install it: `npx ts-gun`
* Install globally: `npm i -g ts-gun`

## Usage:

* `ts-gun` or `ts-gun [OPTION]`
* `ts-gun --help` or `ts-gun -h` for help

#### Options:
* `-h, --help`: show help menu
* `-a, --all`: use pnpm as package manager and install all tools(eslint, install node_module, nodemon, editorconfig, commitlint, init git repository)
* `-g, --git`: initialize new git repository
* `-r, --nodemon`: integrate nodemon to project
* `-l, --eslint`: integrate eslint to project. Use airbnb-base style guide
* `-c, --commitlint`: use pre-commit-hook using husky. Will run script "test" and "lint" in package.json file. Besides, check commit message for each commit based on commitlint
* `-e, --editorconfig`: create .editorconfig file
* `-n, --name`: will create a folder with given name in current directory. other configuration files will be placed inside this folder
* `--npm`: use npm as package manager
* `--ts`: integrate typescript to project
* `--pnpm`: use npm as package manager
* `--yarn`: use npm as package manager

#### Examples:
* `ts-gun`: create a new folder with configuration files. Recomended
* `ts-gun -an nodejs`: skip all prompts and create configuration files in a new folder named `nodejs`. Use `ts-gun -h` for more detail
* `ts-gun -tle --yarn`: setup typescript for project, install `node_modules` using `yarn`, create a `.eslintrc.json` and `.editorconfig` file in current directory,

#### Notes:
* **Do not** use both options `--name` and package manager options(`--yarn`, `--npm`, `-pnpm`) in one command: this is the problem of `arg` library. Use `ts-gun` instead
* Option `--nodemon` currently **only works** for typescript projects. I strongly recommend use typescript instead of javascript
* Option `--eslint` currently **only works** for typescript projects. I strongly recommend use typescript instead of javascript
* Option `--commitlint` currently **only works** for typescript projects. I strongly recommend use typescript instead of javascript

* Command to start project: `npm start` or `pnpm start` or `yarn start`
* Command to start project in watch mode(live reloading source code): `npm run dev` or `pnpm dev` or `yarn run dev`
* Command to check for eslint errors: `npm run lint` or `pnpm lint` or `yarn run lint`
* Command to run test (not configurated yet): `npm run test` or `pnpm test` or `yarn test`

###### Typescript option:
* Source code must be placed in `/src` directory, `.js` files will be placed in `/dist` directory. View `tsconfig.json` file for more details
* Project's entry point (first file run when project start) if `--ts` option is set: `/src/main.ts`

###### Nodemon option:
* Same as `Typescript option` section. View `nodemon.json` file for more details
* Required opions: --typescript

###### Eslint option:
* Use `airbnb-base` as coding style
* Some rules may not work property for different IDEs. Only tested on Neovim 0.6. Thus, you may need to edit file `.eslintrc.json` if you have problems with eslint or open an issue in the github repository
* Known problem: sometimes , newest versions of typescript do not supported by Eslint, you may need to downgrade typescript version to make sure eslint can work

###### Commitlint option:
* Use `husky` and `commitlint` to check commit message is valid or not. Besides, will run `npm lint` and `npm test` every new commits are committed to the repository
* Required opions: --eslint, --git

## Major Change log:
### 4.0.0
* Remove option: --install and its alias -i: always install dependencies
* Remove option: --pre-commit-hook and its alias -p: integrate this feature in --commitlint options
* Add new option: --commitlint and its alias -c: Use git hooks with `husky`. Will run script "test" and "lint" in package.json file. Besides that, check commit message for each commit using `commitlint`
* Add new feature: Auto remove created folder if command failed
* Improvement: Show error message instead of show error stack trace

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
