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
      'import/order': 'off',
      'max-statements-per-line': ['error', { max: 2 }],
      'no-console': 'warn',
      'regexp/no-super-linear-backtracking': 'off',
      'symbol-description': 'off',
      'ts/ban-ts-comment': 'warn',
      'ts/consistent-type-definitions': 'off',
      'ts/no-empty-object-type': 'off',
      'ts/no-non-null-asserted-optional-chain': 'off',
      'ts/no-unsafe-function-type': 'off',
      'ts/no-unused-expressions': 'off',
      'unicorn/prefer-dom-node-text-content': 'off',
      'unicorn/prefer-number-properties': 'off',
      'unused-imports/no-unused-vars': 'off',
      'vue/one-component-per-file': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      'sonar/no-duplicate-string': 'off',
    },
  },
);
