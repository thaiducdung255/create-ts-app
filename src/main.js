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
   try {
      const result = await execa(...cmds, {
         cwd: options.targetDirectory,
      });

      if (result.failed) {
         return Promise.reject(Error(`Failed to run ${cmds[0]} ${cmds[1].join(' ')}`));
      }

      return null;
   } catch (err) {
      return Promise.reject(err);
   }
}

async function initGit(options) {
   await run(['git', ['init']], options);

   await copy(
      options.templateDirectory.concat('/gitignore'),
      options.targetDirectory.concat('/.gitignore'),
      { clobber: false },
   );
}

async function initTs(options) {
   await copy(
      options.templateDirectory.concat('/typescripts'),
      options.targetDirectory,
      { clobber: false },
   );

   const installPackages = ['@types/node', 'typescript', 'ts-node'];

   const installAlias = options.packageManager === 'yarn' ? 'add' : 'install';
   const installCommand = [options.packageManager, [installAlias, '-D', ...installPackages]];
   return run(installCommand, options);
}

async function eslintInit(options) {
   await copy(
      options.templateDirectory.concat('/eslint'),
      options.targetDirectory,
      { clobber: false },
   );

   const installPackages = [
      'eslint',
      'eslint-config-airbnb-base',
      'eslint-plugin-import',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
   ];

   const installAlias = options.packageManager === 'yarn' ? 'add' : 'install';

   const installlArgs = [
      installAlias,
      '-D',
      ...installPackages,
   ];

   return run([options.packageManager, installlArgs], options);
}

async function nodemonInit(options) {
   if (!options.ts) {
      throw Error('nodemon is current not available for JS projects');
   }

   await copy(
      options.templateDirectory.concat('/nodemon'),
      options.targetDirectory,
      { clobber: false },
   );

   const installAlias = options.packageManager === 'yarn' ? 'add' : 'install';

   const installlArgs = [
      installAlias,
      '-D',
      'nodemon',
   ];

   return run([options.packageManager, installlArgs], options);
}

async function integrateCommitLint(options) {
   if (!options.eslint || !options.git) {
      throw Error('commitlint can not work without git and eslint');
   }

   const installAlias = options.packageManager === 'yarn' ? 'add' : 'install';
   const installPackages = ['@commitlint/cli', '@commitlint/config-conventional', 'husky'];
   await run([options.packageManager, [installAlias, '-D', ...installPackages]], options);
   await run(['npx', ['husky', 'install']], options);

   await copy(
      options.templateDirectory.concat('/git-hooks'),
      options.targetDirectory.concat('/.husky'),
      { clobber: false },
   );
}

async function editorconfigInit(options) {
   await copy(
      options.templateDirectory.concat('/editorconfig'),
      options.targetDirectory,
      { clobber: false },
   );
}

export async function createTsProject(opts) {
   const options = {
      ...opts,
      targetDirectory: opts.targetDirectory || process.cwd(),
   };

   try {
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
            task: () => fs.mkdirSync(options.name),
            enabled: () => options.name,
         },
         {
            title: 'Initialize new git repository',
            task: () => initGit(options),
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
            title: 'Integrate git husky + commitlint',
            task: () => integrateCommitLint(options),
            enabled: () => options.commitLint,
         },
      ]);

      const startTime = Date.now();
      await tasks.run();
      const durationSec = Math.ceil((Date.now() - startTime) / 1000);
      const projectName = options.name ? options.name.concat(' ') : '';

      console.info(
         '%s Project %sis ready to go now. Happy coding! (%ss)',
         chalk.bold.green('DONE.'),
         chalk.blue(projectName),
         chalk.blue(durationSec),
      );
   } catch (error) {
      await run(['rm', ['-rf', options.targetDirectory]], options);

      console.info(
         chalk.bold.red('ERROR: Can not create project. Please check the causes above.'),
      );
   }
}
