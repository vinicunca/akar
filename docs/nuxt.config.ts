import { createResolver } from '@nuxt/kit';

const { resolve } = createResolver(import.meta.url);

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

  componentMeta: {
    exclude: [
      '@nuxt/content',
      '@nuxt/icon',
      '@nuxtjs/color-mode',
      '@nuxtjs/mdc',
      'nuxt/dist',
      'nuxt-og-image',
      resolve('./app/components'),
    ],
    metaFields: {
      type: false,
      props: true,
      slots: true,
      events: true,
      exposed: false,
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
    'akar/nuxt',
    '@unocss/nuxt',
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-component-meta',
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
