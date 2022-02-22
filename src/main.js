import fs from 'fs';
import ncp from 'ncp';
import Listr from 'listr';
import path from 'path';
import { execa } from 'execa';
import { promisify } from 'util';
import chalk from 'chalk';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function run(cmds) {
   const result = await execa(...cmds);

   if (result.failed) {
      return Promise.reject(new Error(`Failed to run ${cmds[0]} ${cmds[1].join(' ')}`));
   }

   return null;
}

async function initTs(options) {
   await copy(options.templateDirectory.concat('/typescripts'), options.targetDirectory, { clobber: false });
   const installAlias = options.packageManager === 'yarn' ? 'add' : 'install';
   const installCommand = [options.packageManager, [installAlias, '-D', '@types/node', 'typescript', 'ts-node']];
   return run(installCommand);
}

async function gitInit(options) {
   const result = await execa('git', ['init'], {
      cwd: options.targetDirectory,
   });

   if (result.failed) {
      return Promise.reject(new Error('Failed to run git init'));
   }

   return null;
}

async function eslintInit(options) {
   await copy(options.templateDirectory.concat('/eslint/.eslintrc.js'), options.targetDirectory.concat('/.eslintrc.js'), { clobber: false });
   const installAlias = options.packageManager === 'yarn' ? 'add' : 'install';

   const installlArgs = [
      installAlias,
      '-D',
      'eslint',
      'eslint-config-airbnb-base',
      'eslint-plugin-import',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
   ];

   return run([options.packageManager, installlArgs]);
}

async function nodemonInit(options) {
   return copy(options.templateDirectory.concat('/nodemon'), options.targetDirectory, { clobber: false });
}

async function preCommitHookInit(options) {
   await copy(options.templateDirectory.concat('/preCommitHook'), options.targetDirectory.concat('/.git/hooks'), { clobber: false });
}

export async function createTsProject(opts) {
   const options = {
      ...opts,
      targetDirectory: opts.targetDirectory || process.cwd(),
   };

   const currentFileUrl = import.meta.url;

   const templateDir = path.resolve(
      new URL(currentFileUrl).pathname,
      '../../templates',
   );

   options.templateDirectory = templateDir;

   try {
      await access(templateDir, fs.constants.R_OK);
   } catch (err) {
      console.error(`%s ${err.toString()}`, chalk.red.bold('ERROR:'));
      process.exit(1);
   }

   console.info('%s Prepare to initalize project', chalk.bold.green('>>'));

   const tasks = new Listr([
      {
         title: 'Initalize new git repository',
         task: () => gitInit(options),
         enabled: () => options.git,
      },
      {
         title: 'Initalize typescript',
         task: () => initTs(options),
      },
      {
         title: 'Integrate eslint',
         task: () => eslintInit(options),
         enabled: () => options.eslint,
      },
      {
         title: 'Integrate nodemon',
         task: () => nodemonInit(options),
         enabled: () => options.nodemon,
      },
      {
         title: 'Integrate git pre-commit hook',
         task: () => preCommitHookInit(options),
         enabled: () => options.preCommitHook,
      },
   ]);

   await tasks.run();
   console.info('%s Project is now ready to go. Happy coding!', chalk.bold.green('DONE.'));
   return true;
}
