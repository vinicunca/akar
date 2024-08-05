import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
        date: resolve(__dirname, 'src/date/index.ts'),
        index: resolve(__dirname, 'src/index.ts'),
      },
      fileName: (format, name) => {
        return `${name}.${format === 'es' ? 'js' : 'umd.cjs'}`;
      },
      name: 'akar',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library (Vue)
      external: ['vue', '@floating-ui/vue', '@internationalized/date', '@internationalized/number'],
      output: {
        // Provide global variables to use in the UMD build
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'style.css') {
            return 'index.css';
          }
          return chunkInfo.name as string;
        },
        // for externalized deps
        globals: {
          '@internationalized/date': '@internationalized/date',
          '@internationalized/number': '@internationalized/number',
          'vue': 'Vue',
        },
      },
    },
  },
  plugins: [
    vueJsx(),
    dts({
      exclude: ['src/test/**', 'src/**/story/**', 'src/**/*.story.vue'],
      tsconfigPath: 'tsconfig.build.json',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(projectRootDir, 'src'),
    },
    dedupe: [
      'vue',
      '@vue/runtime-core',
    ],
  },
});
