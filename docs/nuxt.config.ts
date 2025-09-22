export default defineNuxtConfig({
  app: {
    rootAttrs: {
      'data-akar-drawer-wrapper': '',
      'class': 'bg-default',
    },
  },

  imports: {
    autoImport: false,
  },

  css: ['~/assets/css/main.css'],

  modules: [
    'pohon',
    '@unocss/nuxt',
    '@nuxt/content',
    '@nuxt/image',
  ],

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2024-07-09',

  vite: {
    optimizeDeps: {
      // prevents reloading page when navigating between components
      include: [
        'akar',
        '@internationalized/date',
        'unocss-variants',
        'shiki-transformer-color-highlight',
      ],
    },
  },
});
