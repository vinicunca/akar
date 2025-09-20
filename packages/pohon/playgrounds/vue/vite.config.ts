import vue from '@vitejs/plugin-vue';
import pohon from 'pohon/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pohon({
      ui: {
        colors: {
          primary: 'green',
          neutral: 'slate',
        },
      },
      autoImport: {
        imports: ['vue'],
      },
      components: {
        dirs: ['../nuxt/app/components'],
      },
    }),
  ],
  optimizeDeps: {
    // prevents reloading page when navigating between components
    include: ['@unhead/vue/client', '@iconify/vue', '@internationalized/date', '@vueuse/shared', '@vueuse/integrations/useFuse', '@tanstack/vue-table', 'reka-ui', 'reka-ui/namespaced', 'embla-carousel-vue', 'embla-carousel-autoplay', 'embla-carousel-auto-scroll', 'embla-carousel-auto-height', 'embla-carousel-class-names', 'embla-carousel-fade', 'embla-carousel-wheel-gestures', 'colortranslator', 'tailwindcss/colors', 'tailwind-variants', 'ufo', 'zod', 'vaul-vue'],
  },
});
