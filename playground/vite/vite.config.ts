import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue(),
    unocss(),
  ],
  resolve: {
    alias: {
      '~~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
