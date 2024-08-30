import { vinicuncaESLint } from '@vinicunca/eslint-config';

export default vinicuncaESLint(
  {
    formatters: {
      css: true,
    },
    typescript: {
      overrides: {
        'perfectionist/sort-objects': 'off',
      },
    },
    unocss: true,
    vue: true,
  },

  {
    files: ['**/*.vue'],
    rules: {
      'import/first': 'off',
    },
  },
);
