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
  {
    files: ['**/*.vue'],
    rules: {
      'import/first': 'off',
      'max-statements-per-line': ['error', { max: 2 }],
      'ts/consistent-type-definitions': 'off',
      'vue/max-attributes-per-line': ['error', {
        multiline: 1,
        singleline: 1,
      }],
    },
  },
);
