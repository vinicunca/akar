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

  $development: {
    site: {
      url: 'http://localhost:3000',
    },
  },
  $production: {
    site: {
      url: 'https://akar.vinicunca.dev',
    },
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
    customCollections: [{
      prefix: 'custom',
      dir: resolve('./app/assets/icons'),
    }],
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },
    provider: 'iconify',
  },

  modules: [
    'pohon',
    '@unocss/nuxt',
    '@nuxt/content',
    'nuxt-component-meta',
    'nuxt-og-image',
  ],

  componentMeta: {
    transformers: [(component, code) => {
      // Simplify pohon in slot prop types: `leading(props: { pohon: Button['pohon'] })` -> `leading(props: { pohon: object })`
      code = code.replace(/pohon:[^}]+(?=\})/g, 'pohon: object');

      return { component, code };
    }],
    exclude: [
      '@nuxt/content',
      '@nuxt/icon',
      '@nuxtjs/color-mode',
      '@nuxtjs/mdc',
      '@nuxtjs/plausible',
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

  hooks: {
    // @ts-expect-error - Hook is not typed correctly
    'component-meta:schema': (schema: NuxtComponentMeta) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const componentName in schema) {
        const component = schema[componentName];
        // Delete schema from slots to reduce metadata file size
        if (component?.meta?.slots) {
          for (const slot of component.meta.slots) {
            delete (slot as any).schema;
          }
        }
      }
    },
  },

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
