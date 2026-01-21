import { createResolver } from '@nuxt/kit';
import pkg from '../package.json';

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

  a11y: {
    logIssues: false,
  },

  app: {
    rootAttrs: {
      'class': 'bg-background',
      'data-akar-drawer-wrapper': '',
    },
  },

  compatibilityDate: '2026-01-14',

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
      events: 'no-schema',
      exposed: false,
      props: true,
      slots: 'no-schema',
      type: false,
    },
    overrides: {
      PCalendar: {
        props: {
          defaultPlaceholder: { name: 'defaultPlaceholder', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' },
          defaultValue: { name: 'defaultValue', type: 'CalendarDate | CalendarDateTime | ZonedDateTime | DateRange | DateValue[]' },
          maxValue: { name: 'maxValue', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' },
          minValue: { name: 'minValue', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' },
          modelValue: { name: 'modelValue', type: 'null | CalendarDate | CalendarDateTime | ZonedDateTime | DateRange | DateValue[]' },
          placeholder: { name: 'placeholder', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' },
        },
      },
      PEditor: {
        props: {
          modelValue: { name: 'modelValue', type: 'null | string | JSONContent | JSONContent[]' },
          parseOptions: { name: 'parseOptions', type: 'ParseOptions' },
        },
      },
      PEditorDragHandle: { props: { editor: { name: 'editor', type: 'Editor' } } },
      PEditorEmojiMenu: { props: { editor: { name: 'editor', type: 'Editor' } } },
      PEditorMentionMenu: { props: { editor: { name: 'editor', type: 'Editor' } } },
      PEditorSuggestionMenu: { props: { editor: { name: 'editor', type: 'Editor' } } },
      PEditorToolbar: { props: { editor: { name: 'editor', type: 'Editor' } } },
      PInputDate: {
        props: {
          defaultPlaceholder: { name: 'defaultPlaceholder', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' },
          defaultValue: { name: 'defaultValue', type: 'CalendarDate | CalendarDateTime | ZonedDateTime | DateRange' },
          maxValue: { name: 'maxValue', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' },
          minValue: { name: 'minValue', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' },
          modelValue: { name: 'modelValue', type: 'null | CalendarDate | CalendarDateTime | ZonedDateTime | DateRange' },
          placeholder: { name: 'placeholder', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' },
        },
      },
      PInputTime: {
        props: {
          defaultPlaceholder: { name: 'defaultPlaceholder', type: 'Time | CalendarDateTime | ZonedDateTime' },
          defaultValue: { name: 'defaultValue', type: 'Time | CalendarDateTime | ZonedDateTime' },
          maxValue: { name: 'maxValue', type: 'Time | CalendarDateTime | ZonedDateTime' },
          minValue: { name: 'minValue', type: 'Time | CalendarDateTime | ZonedDateTime' },
          modelValue: { name: 'modelValue', type: 'null | Time | CalendarDateTime | ZonedDateTime' },
          placeholder: { name: 'placeholder', type: 'Time | CalendarDateTime | ZonedDateTime' },
        },
      },
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

  experimental: {
    asyncContext: true,
    defaults: {
      nuxtLink: {
        externalRelAttribute: 'noopener',
      },
    },
  },

  fonts: {
    families: [
      { name: 'Geist', provider: 'fontsource', weights: ['100 900'] },
      { name: 'Geist Mono', provider: 'fontsource', weights: ['100 900'] },
      { name: 'Rubik', provider: 'fontsource', weights: ['100 900'] },
    ],
  },

  gtag: {
    id: 'G-EQTF5FRYFF',
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

  llms: {
    description: 'A comprehensive, Nuxt-integrated UI library providing a rich set of fully-styled, accessible and highly customizable components for building modern web applications.',
    domain: 'https://akar.vinicunca.dev',
    full: {
      description: 'This is the full documentation for Pohon UI. It includes all the Markdown files written with the MDC syntax.',
      title: 'Pohon UI Full Documentation',
    },
    notes: [
      'The content is automatically generated from the same source as the official documentation.',
    ],
    sections: [
      {
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: 'docs/akar/getting-started%' },
        ],
        title: 'Akar Getting Started',
      },
      {
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/docs/akar/components/%' },
        ],
        title: 'Akar Components',
      },
      {
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/docs/akar/utilities/%' },
        ],
        title: 'Akar Utilities',
      },
      {
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: 'docs/pohon/getting-started%' },
        ],
        title: 'Pohon Getting Started',
      },
      {
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/docs/pohon/components/%' },
        ],
        title: 'Pohon Components',
      },
      {
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/docs/pohon/composables/%' },
        ],
        title: 'Pohon Composables',
      },
    ],
    title: 'Pohon UI',
  },

  mdc: {
    highlight: {
      noApiRoute: false,
    },
  },

  modules: [
    '../packages/pohon/src/module',
    '@nuxt/content',
    '@nuxt/fonts',
    'nuxt-component-meta',
    'nuxt-og-image',
    '@unocss/nuxt',
    '@nuxt/a11y',
    'nuxt-llms',
    'nuxt-gtag',
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

  nitro: {
    prerender: {
      concurrency: 250,
      interval: 100,
      routes: [
        '/docs/pohon/getting-started',
        '/api/countries.json',
      ],
    },
  },

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
    '/docs/pohon': {
      prerender: false,
      redirect: { statusCode: 301, to: '/docs/pohon/getting-started' },
    },
    '/docs/pohon/composables': {
      prerender: false,
      redirect: { statusCode: 301, to: '/docs/pohon/composables/define-shortcuts' },
    },
    '/docs/pohon/getting-started/ai': {
      prerender: false,
      redirect: '/docs/pohon/getting-started/ai/mcp',
    },
    '/docs/pohon/getting-started/installation': {
      prerender: false,
      redirect: '/docs/pohon/getting-started/installation/nuxt',
    },
    '/docs/pohon/getting-started/integrations': {
      prerender: false,
      redirect: '/docs/pohon/getting-started/integrations/icons',
    },
    '/docs/pohon/getting-started/integrations/color-mode': {
      prerender: false,
      redirect: '/docs/pohon/getting-started/integrations/color-mode/nuxt',
    },
    '/docs/pohon/getting-started/integrations/i18n': {
      prerender: false,
      redirect: '/docs/pohon/getting-started/integrations/i18n/nuxt',
    },
    '/docs/pohon/getting-started/integrations/icons': {
      prerender: false,
      redirect: '/docs/pohon/getting-started/integrations/icons/nuxt',
    },
    '/docs/pohon/getting-started/theme': {
      prerender: false,
      redirect: '/docs/pohon/getting-started/theme/components',
    },
  },

  runtimeConfig: {
    public: {
      version: pkg.version,
    },
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
