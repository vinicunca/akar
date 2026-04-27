import vue from '@vitejs/plugin-vue';
import pohon from 'pohon-ui/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pohon({
      pohon: {
        colors: {
          primary: 'green',
          neutral: 'slate',
        },
      },
      autoImport: {
        dirs: ['../nuxt/app/composables'],
        imports: ['vue'],
      },
      components: {
        dirs: ['../nuxt/app/components'],
      },
    }),
  ],
});
