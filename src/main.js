import fs from 'fs';
import ncp from 'ncp';
import Listr from 'listr';
import path from 'path';
import { execa } from 'execa';
import { promisify } from 'util';
import chalk from 'chalk';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function run(cmds, options) {
   const result = await execa(...cmds, {
      cwd: options.targetDirectory,
   });

   if (result.failed) {
      return Promise.reject(new Error(`Failed to run ${cmds[0]} ${cmds[1].join(' ')}`));
   }

   return null;
}

async function projectFolderInit(options) {
   const result = await execa('mkdir', [options.name], {
      cwd: process.cwd(),
   });

   if (result.failed) {
      return Promise.reject(new Error('Failed to run git init'));
   }

   return null;
}

async function initTs(options) {
   await copy(options.templateDirectory.concat('/typescripts'), options.targetDirectory, { clobber: false });

   if (options.runInstall) {
      const installAlias = options.packageManager === 'yarn' ? 'add' : 'install';
      const installCommand = [options.packageManager, [installAlias, '-D', '@types/node', 'typescript', 'ts-node']];
      return run(installCommand, options);
   }

   return null;
}

async function eslintInit(options) {
   await copy(options.templateDirectory.concat('/eslint'), options.targetDirectory, { clobber: false });

   if (options.runInstall) {
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

      return run([options.packageManager, installlArgs], options);
   }

   return null;
}

async function nodemonInit(options) {
   await copy(options.templateDirectory.concat('/nodemon'), options.targetDirectory, { clobber: false });

   if (options.runInstall) {
      const installAlias = options.packageManager === 'yarn' ? 'add' : 'install';

      const installlArgs = [
         installAlias,
         '-D',
         'nodemon',
      ];

      return run([options.packageManager, installlArgs], options);
   }

   return null;
}

async function preCommitHookInit(options) {
   await copy(options.templateDirectory.concat('/preCommitHook'), options.targetDirectory.concat('/.git/hooks'), { clobber: false });
}

async function editorconfigInit(options) {
   await copy(options.templateDirectory.concat('/editorconfig'), options.targetDirectory, { clobber: false });
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
         title: `Create folder ${options.name}`,
         task: () => projectFolderInit(options),
         enabled: () => options.name,
      },
      {
         title: 'Initialize new git repository',
         task: () => run(['git', ['init']], options),
         enabled: () => options.git,
      },
      {
         title: 'Initialize typescript',
         task: () => initTs(options),
         enabled: () => options.ts,
      },
      {
         title: 'Integrate eslint',
         task: () => eslintInit(options),
         enabled: () => options.eslint,
      },
      {
         title: 'Create .editorconfig file',
         task: () => editorconfigInit(options),
         enabled: () => options.editorConfig,
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

   const startTime = Date.now();
   await tasks.run();
   const durationMin = Math.ceil((Date.now() - startTime) / 60000);
   const projectName = options.name ? options.name.concat(' ') : '';
   console.info('%s Project %sis now ready to go. Happy coding! (%ss)', chalk.bold.green('DONE.'), chalk.blue(projectName), chalk.blue(durationMin));
   return true;
}
