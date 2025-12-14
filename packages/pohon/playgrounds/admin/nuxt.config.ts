export default defineNuxtConfig({
  app: {
    rootAttrs: {
      'data-akar-drawer-wrapper': '',
    },
  },

  compatibilityDate: '2024-07-09',

  css: ['~/assets/css/main.css'],

  devtools: {
    enabled: true,
  },

  extends: [
    'pohon-ui/layer-theme',
  ],

  i18n: {
    defaultLocale: 'en',
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
      {
        code: 'id',
        file: 'id.json',
      },
    ],
    strategy: 'no_prefix',
  },

  imports: {
    autoImport: false,
  },

  modules: [
    'pohon-ui',
    '@nuxt/fonts',
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],

  routeRules: {
    '/admin/**': { ssr: false },
  },

  runtimeConfig: {
    public: {
      namespace: 'vinicunca',
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vinicunca/perkakas',
        '@vueuse/core',
        '@internationalized/date',
        '@vueuse/shared',
        'aria-hidden',
        '@floating-ui/vue',
        '@tanstack/vue-virtual',
        '@internationalized/number',
        'unocss-variants',
        'pinia-plugin-persistedstate',
      ],
    },
  },
});
