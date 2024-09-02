import Vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

const pathResolver = (p: string) => resolve(__dirname, p);

export default defineConfig({
  plugins: [Vue()],
  resolve: {
    alias: {
      '~~': pathResolver('./src'),
    },
    dedupe: [
      'vue',
      '@vue/runtime-core',
    ],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['**/node_modules/**'],
    include: ['./**/*.spec.ts'],
    setupFiles: './vitest.setup.ts',
    server: {
      deps: {
        inline: ['vitest-canvas-mock'],
      },
    },
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
});
