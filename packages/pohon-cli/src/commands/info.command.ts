import { Command } from 'commander';
import consola from 'consola';
import { getProjectInfo } from '~~/src/utils/get-project-info.util';

import { logger } from '~~/src/utils/logger.util';

export const infoCommand = new Command()
  .name('info')
  .description('get information about your project')
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .action(async (opts) => {
    logger.info('> project info');
    consola.log(await getProjectInfo(opts.cwd));
    // logger.break();
    // logger.info('> components.json');
    // consola.log(await getConfig(opts.cwd));
  });
