import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
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
       * We need to make sure not to include external deps that won't be bundeled in the final build
       */
      external: [
        'vue',
      ],
      output: {
        /**
         * Provide global variables to use in the UMD build
         */
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
