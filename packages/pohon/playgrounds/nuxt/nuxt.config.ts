export default defineNuxtConfig({
  extends: [
    'pohon-ui/layer',
  ],
  imports: {
    autoImport: false,
  },

  modules: [
    'pohon-ui',
    '@nuxt/fonts',
    '@unocss/nuxt',
  ],

  ssr: false,

  devtools: {
    enabled: true,
  },

  fonts: {
    families: [
      { name: 'Rubik', provider: 'fontsource', weights: ['100 900'] },
    ],
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-07-09',

  vite: {
    optimizeDeps: {
      // prevents reloading page when navigating between components
      include: [
        '@internationalized/date',
        '@vueuse/shared',
        '@vueuse/integrations/useFuse',
        '@tanstack/vue-table',
        'akar',
        'akar/namespaced',
        'embla-carousel-vue',
        'embla-carousel-autoplay',
        'embla-carousel-auto-scroll',
        'embla-carousel-auto-height',
        'embla-carousel-class-names',
        'embla-carousel-fade',
        'embla-carousel-wheel-gestures',
        'colortranslator',
        'unocss-variants',
        'ufo',
        'zod',
      ],
    },
  },
});
