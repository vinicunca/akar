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
    unocss: {
      configPath: './docs/uno.config.ts',
    },
    vue: true,
    pnpm: true,
  },

  {
    rules: {
      'perfectionist/sort-modules': 'off',
      'sonar/cognitive-complexity': 'off',
      'sonar/no-invariant-returns': 'off',
      'sonar/use-type-alias': 'off',
      'sonar/no-hardcoded-passwords': 'off',
    },
  },

  {
    files: ['**/*.test.ts'],
    rules: {
      'no-await-in-loop': 'off',
      'sonar/no-duplicate-string': 'off',
      'sonar/no-nested-functions': 'off',
    },
  },

  {
    files: ['packages/core/src/number-field/**/*.vue'],
    rules: {
      // TODO: Investigate to resolve isNaN issue
      'unicorn/prefer-number-properties': 'off',
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

  {
    files: ['packages/pohon/src/runtime/components/**/*.vue'],
    rules: {
      'vue/no-extra-parens': 'off',
    },
  },
);
