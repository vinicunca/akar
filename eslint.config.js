import { vinicuncaESLint } from '@vinicunca/eslint-config';

export default vinicuncaESLint(
  {
    formatters: {
      css: true,
    },
    typescript: true,
    unocss: true,
    vue: true,
  },
  {
    files: ['**/*.ts'],
    rules: {
      'sonar/no-duplicate-string': 'off',
    },
  },
);
