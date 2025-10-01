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

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['bash', 'ts', 'typescript', 'diff', 'vue', 'json', 'yml', 'css', 'mdc', 'blade', 'edge'],
        },
      },
    },
  },

  mdc: {
    highlight: {
      noApiRoute: false,
    },
  },

  fonts: {
    families: [
      { name: 'Geist', provider: 'fontsource', weights: ['100 900'] },
      { name: 'Geist Mono', provider: 'fontsource', weights: ['100 900'] },
    ],
  },

  icon: {
    serverBundle: {
      collections: ['lucide', 'radix'],
    },
  },

  modules: [
    'pohon',
    // 'akar/nuxt',
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
        'ufo',
        'zod',
        'json5',
        'ohash',
        'shiki-transformer-color-highlight',
        '@internationalized/date',
        'unocss-variants',
        '@vinicunca/perkakas',
      ],
    },
  },
});
