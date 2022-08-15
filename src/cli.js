import arg from 'arg';
import inquirer from 'inquirer';
import { createTsProject } from './main.js';

function parserArgumentsIntoOptions(rawArgs) {
   const args = arg(
      {
         '--help': Boolean,
         '--all': Boolean,
         '--git': Boolean,
         '--nodemon': Boolean,
         '--eslint': Boolean,
         '--commitlint': Boolean,
         '--editorconfig': Boolean,
         '--ts': Boolean,
         '--name': String,
         '--yarn': Boolean,
         '--npm': Boolean,
         '--pnpm': Boolean,
         '-t': '--ts',
         '-a': '--all',
         '-h': '--help',
         '-g': '--git',
         '-r': '--nodemon',
         '-l': '--eslint',
         '-c': '--commitlint',
         '-e': '--editorconfig',
         '-n': '--name',
      },
      {
         argv: rawArgs.slice(-2),
         permissive: false,
      },
   );

   let packageManager = 'pnpm';
   const packageManagerArg = args['--yarn'] || args['--npm'] || args['--pnpm'];

   if (packageManagerArg) {
      packageManager = packageManagerArg.slice(2);
   }

   return {
      help: args['--help'] || false,
      skipPrompts: args['--all'] || false,
      git: args['--git'] || false,
      nodemon: args['--nodemon'] || false,
      eslint: args['--eslint'] || false,
      commitLint: args['--commitlint'] || false,
      editorConfig: args['--editorconfig'] || false,
      ts: args['--ts'] || false,
      packageManager,
      name: args['--name'] || '',
      targetDirectory: process.cwd(),
   };
}

async function promptForMissingOptions(options) {
   const questions = [];

   questions.push(
      {
         type: 'input',
         name: 'name',
         message: 'Choose your project name:',
         default: 'my-app',
      },
      {
         type: 'list',
         name: 'packageManager',
         message: 'Choose your favorite package manager:',
         choices: ['npm', 'yarn', 'pnpm'],
         default: 'pnpm',
      },
      {
         type: 'confirm',
         name: 'ts',
         message: 'Integrate typescript to project (your .ts file will be in src/ folder) ?',
         default: false,
      },
      {
         type: 'confirm',
         name: 'git',
         message: 'Create a new git repository ?',
         default: false,
      },
      {
         type: 'confirm',
         name: 'eslint',
         message: 'Integrate eslint(coding style guide) ?',
         default: false,
      },
      {
         type: 'confirm',
         name: 'editorConfig',
         message: 'Create .editorconfig file ?',
         default: false,
      },
   );

   if (options.ts) {
      questions.push({
         type: 'confirm',
         name: 'nodemon',
         message: 'Integrate nodemon(hot reloading code) ?',
         default: false,
      });
   }

   if (options.eslint && options.git) {
      questions.push({
         type: 'confirm',
         name: 'commitLint',
         message: 'Integrate commitlint (git commit style guide) ?',
         default: false,
      });
   }

   const answers = await inquirer.prompt(questions);

   return {
      ...options,
      packageManager: answers.packageManager || options.packageManager,
      git: answers.git || options.git,
      nodemon: answers.nodemon || options.nodemon,
      eslint: answers.eslint || options.eslint,
      commitLint: answers.commitLint || options.commitLint,
      editorConfig: answers.editorConfig || options.editorConfig,
      name: answers.name || options.name,
      ts: answers.ts || options.ts,
   };
}

function showHelp() {
   const helps = [
      'USAGE: ts-gun [OPTION]',
      'Initalize typescript project with some essential tools(nodemon, eslint, husky, commitlint, editorconfig)',
      'Example: ts-gun                       use the cli. Recommended',
      '         ts-gun -an <project-name>    install all tools in <project-name> with pnpm as package manager (this will skips the cli)',
      'OPTIONS:',
      '        --npm                  npm as package manager',
      '        --pnpm                 pnpm as package manager',
      '        --yarn                 yarn as package manager',
      '        --ts                   integrate typescript to project',
      '   -h,  --help                 show help menu',
      '   -a,  --all                  use pnpm as package manager and install all tools(eslint, install node_module, nodemon, editorconfig, commitlint, init git repository)',
      '   -n,  --name                 will create a folder with given name in current directory. other configuration files will be placed inside this folder',
      '   -t,  --ts                   initialize typescript to project',
      '   -g,  --git                  initialize new git repository',
      '   -r,  --nodemon              integrate nodemon to project',
      '   -l,  --eslint               integrate eslint to project. Use airbnb-base style guide',
      '   -c,  --commitlint           use pre-commit-hook using husky. Will run script "test" and "lint" in package.json file. Besides that, check commit message for each commit based on commitlint',
      '   -e,  --editorconfig         create .editorconfig file\n',
      'NOTE: this package is not stable yet, if you have any problem, please go to: https://www.npmjs.com/package/ts-gun for more details\n',
   ];

   return process.stdout.write(helps.join('\n'));
}

// eslint-disable-next-line
export async function cli(args) {
   let options = parserArgumentsIntoOptions(args);

   // if no agurment is set, show prompt
   if (args.length === 2) {
      options = await promptForMissingOptions(options);
   }

   // return help content if options.help is true
   if (options.help) {
      return showHelp();
   }

   if (options.skipPrompts) {
      options = {
         ...options,
         git: true,
         runInstall: true,
         nodemon: true,
         eslint: true,
         commitLint: true,
         editorConfig: true,
         ts: true,
      };
   }

   // set target directory
   if (options.name) {
      options.targetDirectory = options.targetDirectory.concat(`/${options.name}`);
   }

   // run tasks
   await createTsProject(options);
}
