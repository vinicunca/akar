import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

const r = (p: string) => resolve(__dirname, p);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': r('./src'),
    },
    dedupe: [
      'vue',
      '@vue/runtime-core',
    ],
  },
  test: {
    coverage: {
      provider: 'istanbul', // or 'v8'
    },
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    exclude: ['**/node_modules/**'],
    globalSetup: './vitest.global.ts',
    globals: true,
    include: ['./**/*.spec.{ts,js}'],
    server: {
      deps: {
        inline: ['vitest-canvas-mock'],
      },
    },
    setupFiles: './vitest.setup.ts',
  },
});
