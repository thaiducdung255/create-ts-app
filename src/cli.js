import arg from 'arg';
import inquirer from 'inquirer';
import { createTsProject } from './main.js';

function parserArgumentsIntoOptions(rawArgs) {
   const args = arg(
      {
         '--help': Boolean,
         '--package-manager': 'string',
         '--skip': Boolean,
         '--git': Boolean,
         '--install': Boolean,
         '--nodemon': Boolean,
         '--eslint': Boolean,
         '--pre-commit-hook': Boolean,
         '--editorconfig': Boolean,
         '-pm': 'package-manager',
         '-s': '--skip',
         '-h': '--help',
         '-g': '--git',
         '-i': '--install',
         '-n': '--nodemon',
         '-e': '--eslint',
         '-pch': '--pre-commit-hook',
         '-ecfg': '--editorconfig',
      },
      {
         argv: rawArgs.slice(-2),
      },
   );

   return {
      help: args['--help'] || false,
      skipPrompts: args['--skip'] || false,
      git: args['--git'] || false,
      runInstall: args['--install'] || false,
      nodemon: args['--nodemon'] || false,
      eslint: args['--eslint'] || false,
      preCommitHook: args['--pre-commit-hook'] || false,
      editorConfig: args['--editorconfig'] || false,
   };
}

// eslint-disable-next-line
async function promptForMissingOptions(options) {
   console.log({ options })
   const defaultOptions = {
      packageManager: 'pnpm',
   };

   if (options.help) {
      return { help: true };
   }

   if (options.skipPrompts) {
      return {
         git: true,
         runInstall: true,
         nodemon: true,
         eslint: true,
         preCommitHook: true,
         editorConfig: true,
         packageManager: defaultOptions.packageManager,
      };
   }

   const questions = [];

   if (!options.packageManager) {
      questions.push({
         type: 'list',
         name: 'packageManager',
         message: 'Choose your favorite package manager:',
         choices: ['npm', 'yarn', 'pnpm'],
         default: defaultOptions.packageManager,
      });
   }

   if (!options.git) {
      questions.push({
         type: 'confirm',
         name: 'git',
         message: 'Create a new git repository ?',
         default: false,
      });
   }

   if (!options.runInstall) {
      questions.push({
         type: 'confirm',
         name: 'runInstall',
         message: 'Install node_modules',
         default: true,
      });
   }

   if (!options.nodemon) {
      questions.push({
         type: 'confirm',
         name: 'nodemon',
         message: 'Integrate nodemon(hot reloading code) ?',
         default: false,
      });
   }

   if (!options.eslint) {
      questions.push({
         type: 'confirm',
         name: 'eslint',
         message: 'Integrate eslint(coding style guide) ?',
         default: false,
      });
   }

   if (options.eslint && options.git) {
      if (!options.preCommitHook) {
         questions.push({
            type: 'confirm',
            name: 'preCommitHook',
            message: 'Use pre-commit hook(check eslint before commit) ?',
            default: false,
         });
      }
   }

   if (!options.editorconfig) {
      questions.push({
         type: 'confirm',
         name: 'editorconfig',
         message: 'create .editorconfig file ?',
         default: false,
      });
   }

   const answers = await inquirer.prompt(questions);

   return {
      ...options,
      packageManager: options.packageManager || answers.packageManager,
      git: options.git || answers.git,
      runInstall: options.runInstall || answers.runInstall,
      nodemon: options.nodemon || answers.nodemon,
      eslint: options.eslint || answers.eslint,
      preCommitHook: options.preCommitHook || answers.preCommitHook,
      editorconfig: options.editorconfig || answers.editorconfig,
   };
}

function showHelp() {
   const helps = [
      'USAGE: ts-gun [OPTION]',
      'Initalize typescript project with some essential tools',
      'Example: ts-gun -s\n',
      'OPTIONS:',
      '   -h,    --help                 show help menu',
      '   -s,    --skip                 use pnpm as package manager and install all tools(eslint, install node_module, nodemon, editorconfig, pre-commit-hook, init git repository). Recommended',
      '   -g,    --git                  initialize new git repository',
      '   -i,    --install              install node_modules',
      '   -n,    --nodemon              integrate nodemon to project',
      '   -e,    --eslint               integrate eslint to project. Use airbnb-base style guide',
      '   -pch,  --pre-commit-hook      use pre-commit-hook. Will run script "lint" and "test" in package.json file',
      '   -ecfg, --editorconfig         create .editorconfig file\n',
   ];

   return process.stdout.write(helps.join('\n'));
}

// eslint-disable-next-line
export async function cli(args) {
   if (args.length === 2) {
      return showHelp();
   }

   let options = parserArgumentsIntoOptions(args);
   options = await promptForMissingOptions(options);

   if (options.help) {
      return showHelp();
   }

   await createTsProject(options);
}
