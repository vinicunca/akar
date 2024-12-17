import { Command } from 'commander';
import { infoCommand } from '~~/src/commands/info.command';
import packageJson from '../package.json';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function main() {
  const program = new Command()
    .name('pohon-cli')
    .description('add components and dependencies to your project')
    .version(
      packageJson.version || '1.0.0',
      '-v, --version',
      'display the version number',
    );

  program
    .addCommand(infoCommand);

  program.parse();
}

main();
