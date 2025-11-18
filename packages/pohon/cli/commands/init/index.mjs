import { promises as fs } from 'node:fs';
import process from 'node:process';
import { confirm } from '@clack/prompts';
import { defineCommand } from 'citty';
import { consola } from 'consola';
import { colors } from 'consola/utils';
import { join, resolve } from 'pathe';
import { copyLayerFiles } from './utils.mjs';

export default defineCommand({
  meta: {
    name: 'init-layer',
    description: 'Initialize Pohon UI layer for theme customization in your project',
  },
  args: {
    cwd: {
      type: 'string',
      description: 'The current working directory',
      default: '.',
    },
    force: {
      type: 'boolean',
      description: 'Force overwrite existing files',
      default: false,
    },
  },
  async run({ args }) {
    consola.info(colors.bold('Initializing Pohon UI layer for theme customization...'));

    const cwd = resolve(args.cwd);

    // Check if it's a Nuxt project
    const nuxtConfigPath = join(cwd, 'nuxt.config.ts');
    const nuxtConfigJsPath = join(cwd, 'nuxt.config.js');

    try {
      await fs.access(nuxtConfigPath).catch(async () => {
        await fs.access(nuxtConfigJsPath);
      });
    } catch {
      consola.error('No Nuxt project found in the current directory.');
      consola.info('Please run this command in a Nuxt project root directory.');
      process.exit(1);
    }

    // Check if layers already exists
    const pohonLayerPath = join(cwd, 'layers', 'pohon-ui');

    try {
      await fs.access(pohonLayerPath);

      if (!args.force) {
        consola.warn('Pohon layer already exist in your project.');

        const overwrite = await confirm({
          message: 'Do you want to overwrite existing files?',
          initialValue: false,
        });

        if (!overwrite || overwrite === Symbol.for('clack:cancel')) {
          consola.info('Operation cancelled.');
          process.exit(0);
        }
      }
    } catch {
      // Directory doesn't exist, proceed
    }

    try {
      // Copy the layer files
      await copyLayerFiles(cwd, args.force);

      consola.success(colors.green('✓ Layer copied successfully!'));
      consola.box([
        '',
        colors.bold('Next steps:'),
        '',
        `1. Your layer files are now in ${colors.cyan('layers/pohon-ui')}`,
        `2. The app config is in ${colors.cyan('layers/pohon-ui/app.config.ts')}`,
        '3. Customize the theme files to match your design',
        '',
      ].join('\n'));
    } catch (error) {
      consola.error('Failed to initialize theme customization:', error.message);
      process.exit(1);
    }
  },
});
