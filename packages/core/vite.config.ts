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
      rollupTypes: true,
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
    minify: true,
    target: 'esnext',
    lib: {
      name: 'akar',
      fileName: (format, name) => {
        return `${name}.${format === 'es' ? 'js' : 'cjs'}`;
      },
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        date: resolve(__dirname, 'src/date/index.ts'),
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
        '@internationalized/date',
        '@internationalized/number',
      ],
      output: {
        preserveModules: true,
        exports: 'named',
      },
    },
  },
});
