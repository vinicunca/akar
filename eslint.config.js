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
    files: ['**/*.vue'],
    rules: {
      'import/first': 'off',
      'ts/consistent-type-definitions': 'off',
      'vue/max-attributes-per-line': ['error', {
        multiline: 1,
        singleline: 1,
      }],
    },
  },
);
