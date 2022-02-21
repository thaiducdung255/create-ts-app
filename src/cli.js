import arg from 'arg';

function parserArgumentsIntoOptions(rawArgs) {
   const args = arg(
      {
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
function promptForMissingOptions(options) {
   const defaultOptions = {
      packageManager: 'pnpm',
   };

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
         name: 'package manager',
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

   if (options.eslint) {
      if (!options.preCommitHook) {
         questions.push({
            type: 'confirm',
            name: 'pre-commit-hook',
            message: 'Use pre-commit hook(check eslint before commit) ?',
            default: false,
         });
      }
   }

   if (!options.editorConfig) {
      questions.push({
         type: 'comfirm',
         name: 'editorconfig',
         message: 'create .editorconfig file ?',
         default: false,
      });
   }
}

export default function cli(args) {
   const options = parserArgumentsIntoOptions(args);
   // eslint-disable-next-line
   console.log({ options });
}
