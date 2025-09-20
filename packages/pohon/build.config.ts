import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    // Vue support
    './src/unplugin',
    './src/vite',
  ],
  rollup: {
    replace: {
      delimiters: ['', ''],
      values: {
        // Used in development to import directly from theme
        'process.argv.includes(\'--pohonDev\')': 'false',
      },
    },
  },
  hooks: {
    'mkdist:entry:options': function (_ctx, _entry, options) {
      options.addRelativeDeclarationExtensions = false;
    },
  },
  externals: [
    '#build/pohon',
    'vite',
    'unocss',
    '@unocss/core',
    'unocss/vite',
    '@vinicunca/perkakas',
  ],
});
