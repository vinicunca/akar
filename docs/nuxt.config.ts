import { createResolver } from '@nuxt/kit';

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
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

  app: {
    rootAttrs: {
      'class': 'bg-background',
      'data-akar-drawer-wrapper': '',
    },
  },
  compatibilityDate: '2024-07-09',

  componentMeta: {
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
      events: true,
      exposed: false,
      props: true,
      slots: true,
      type: false,
    },
    transformers: [(component, code) => {
      // Simplify pohon in slot prop types: `leading(props: { pohon: Button['pohon'] })` -> `leading(props: { pohon: object })`
      code = code.replace(/pohon:[^}]+(?=\})/g, 'pohon: object');

      return { code, component };
    }],
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['bash', 'ts', 'typescript', 'diff', 'vue', 'json', 'yml', 'css', 'mdc', 'blade', 'edge'],
        },
      },
    },
  },

  css: ['~/assets/css/main.css'],

  devtools: {
    enabled: true,
  },

  fonts: {
    families: [
      { name: 'Geist', provider: 'fontsource', weights: ['100 900'] },
      { name: 'Geist Mono', provider: 'fontsource', weights: ['100 900'] },
      { name: 'Rubik', provider: 'fontsource', weights: ['100 900'] },
    ],
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

        if (component?.meta?.events) {
          for (const event of component.meta.events) {
            delete (event as any).schema;
          }
        }
      }
    },
  },

  icon: {
    clientBundle: {
      includeCustomCollections: true,
      scan: true,
    },
    customCollections: [{
      dir: resolve('./app/assets/icons'),
      prefix: 'custom',
    }],
    provider: 'iconify',
  },

  imports: {
    autoImport: false,
  },

  mdc: {
    highlight: {
      noApiRoute: false,
    },
  },

  modules: [
    'pohon-ui',
    '@unocss/nuxt',
    '@nuxt/content',
    '@nuxt/fonts',
    'nuxt-component-meta',
    'nuxt-og-image',
    (_, nuxt) => {
      nuxt.hook('components:dirs', (dirs) => {
        dirs.unshift({
          global: true,
          path: resolve('./app/components/content/examples'),
          pathPrefix: false,
          prefix: '',
        });
      });
    },
  ],

  routeRules: {
    '/docs/akar/components': {
      prerender: false,
      redirect: { statusCode: 301, to: '/docs/akar/components/accordion' },
    },
    '/docs/akar/guides': {
      prerender: false,
      redirect: { statusCode: 301, to: '/docs/akar/guides/styling' },
    },
    '/docs/akar/overview': {
      prerender: false,
      redirect: { statusCode: 301, to: '/docs/akar/overview/introduction' },
    },
    '/docs/akar/utilities': {
      prerender: false,
      redirect: { statusCode: 301, to: '/docs/akar/utilities/config-provider' },
    },
    '/docs/pohon/composables': { prerender: false, redirect: { statusCode: 301, to: '/docs/pohon/composables/define-shortcuts' } },
  },

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
        'ohash/utils',
        'shiki-transformer-color-highlight',
        '@internationalized/date',
        'unocss-variants',
        'unocss/preset-wind4',
        '@vinicunca/perkakas',
        '@nuxt/content/utils',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'motion-v',
        'prettier',
        'shiki',
        'shiki/engine-javascript.mjs',
      ],
    },
  },
});
