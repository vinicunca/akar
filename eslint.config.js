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
    files: ['**/*.spec.ts'],
    rules: {
      'no-await-in-loop': 'off',
      'sonar/no-duplicate-string': 'off',
    },
  },

  {
    files: ['**/*.vue'],
    rules: {
      /**
       * We need to turn off these rules because in Vue files,
       * there's a possibility it has two script tags.
       */
      'import/first': 'off',
      'import/no-duplicates': 'off',

      /**
       * If we use interface for emits,
       * the `defineEmits` complains that is not compatible so we need to use `type`.
       */
      'ts/consistent-type-definitions': 'off',
    },
  },
);
