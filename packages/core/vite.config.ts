import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import Dts from 'vite-plugin-dts';

import pkg from './package.json';

const projectRootDir = resolve(__dirname);

// A bit of a hack, but lets us use the proper extension in chunk filenames
let currentFormat = '';

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
    minify: false,
    target: 'esnext',
    sourcemap: true,
    lib: {
      name: 'akar',
      fileName: (format, name) => {
        currentFormat = format;
        return `${name}.${format === 'es' ? 'js' : 'cjs'}`;
      },
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        date: resolve(__dirname, 'src/date/index.ts'),
        constant: resolve(__dirname, 'constant/index.ts'),
      },
    },
    rollupOptions: {
      external: [
        'nanoid/non-secure',
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
      ],
      output: {
        // Don't rely on preserveModules
        // It creates a lot of unwanted files because of the multiple sections of SFC files
        manualChunks: (moduleId, meta) => {
          const info = meta.getModuleInfo(moduleId);
          if (!info?.isIncluded) {
            // Don't create empty chunks
            return null;
          }

          const [namespace, file] = moduleId.split('?')[0].split('/').slice(-2);
          return `${namespace}/${file.slice(0, file.lastIndexOf('.'))}`;
        },

        exports: 'named',
        chunkFileNames: (chunk) => `${chunk.name}.${currentFormat === 'es' ? 'js' : 'cjs'}`,
        assetFileNames: (chunkInfo) => {
          return chunkInfo.name as string;
        },
      },
    },
  },
});
