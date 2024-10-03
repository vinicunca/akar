import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import Dts from 'vite-plugin-dts';

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    VueJsx(),
    Dts({
      tsconfigPath: 'tsconfig.build.json',
      cleanVueFileName: true,
      exclude: ['src/spec/**', 'src/**/story/**', 'src/**/*.story.vue'],
    }),
  ],
  resolve: {
    alias: {
      '~~': resolve(projectRootDir, 'src'),
    },
    // https://vitejs.dev/config/shared-options.html#resolve-dedupe
    dedupe: [
      'vue',
      '@vue/runtime-core',
    ],
  },

  build: {
    lib: {
      name: 'akar',
      fileName: (format, name) => {
        return `${name}.${format === 'es' ? 'js' : 'umd.cjs'}`;
      },
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
    },
    rollupOptions: {
      /**
       * We need to make sure not to include external deps that won't be bundled in the final build
       */
      external: [
        'vue',
        '@floating-ui/vue',
        '@vinicunca/perkakas',
      ],
      output: {
        /**
         * Provide global variables to use in the UMD build
         */
        globals: {
          'vue': 'Vue',
          '@floating-ui/vue': '@floating-ui/vue',
        },
      },
    },
  },
});
