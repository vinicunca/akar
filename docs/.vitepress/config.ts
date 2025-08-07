import UnoCSS from 'unocss/vite';
import { defineConfig, postcssIsolateStyles } from 'vitepress';
import { akarName, akarShortName, discord, github, ogUrl } from './meta';

export default defineConfig({
  cleanUrls: true,
  title: akarName,
  description: akarName,
  titleTemplate: akarShortName,
  head: [
    // Favicons
    [
      'link',
      {
        href: '/favicons/favicon.svg',
        rel: 'icon',
        type: 'image/svg+xml',
      },
    ],
    [
      'link',
      {
        href: '/favicons/favicon.ico',
        rel: 'shortcut icon',
      },
    ],
    [
      'link',
      {
        href: '/favicons/apple-touch-icon.png',
        rel: 'apple-touch-icon',
        sizes: '180x180',
      },
    ],
    [
      'link',
      {
        href: '/favicons/favicon-96x96.png',
        rel: 'icon',
        sizes: '96x96',
        type: 'image/png',
      },
    ],
    [
      'link',
      {
        href: '/favicons/site.webmanifest',
        rel: 'manifest',
      },
    ],

    [
      'meta',
      {
        content: 'praburangki',
        name: 'author',
      },
    ],
    [
      'meta',
      {
        content: 'Vinicunca',
        property: 'og:title',
      },
    ],
    [
      'meta',
      {
        content: 'Utilities to enhance developer experience',
        property: 'og:description',
      },
    ],
    [
      'meta',
      {
        content: 'summary_large_image',
        name: 'twitter:card',
      },
    ],
    [
      'meta',
      {
        content: '@praburangki',
        name: 'twitter:creator',
      },
    ],
    [
      'meta',
      {
        content: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
        name: 'viewport',
      },
    ],

    [
      'link',
      { href: 'https://fonts.gstatic.com', rel: 'dns-prefetch' },
    ],
    [
      'link',
      { crossorigin: 'anonymous', href: 'https://fonts.gstatic.com', rel: 'preconnect' },
    ],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap', rel: 'stylesheet' },
    ],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap', rel: 'stylesheet' },
    ],

    [
      'meta',
      {
        content: 'https://vinicunca.dev/og/base.jpg',
        property: 'og:image',
      },
    ],

    // Google Analytics
    [
      'script',
      {
        async: 'true',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-7H5VDKTB5C',
      },
    ],
    [
      'script',
      {},
      'window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag(\'js\', new Date());\ngtag(\'config\', \'G-7H5VDKTB5C\');',
    ],
  ],
  lastUpdated: true,
  sitemap: { hostname: ogUrl },
  srcDir: 'content',
  appearance: 'dark',

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Docs', link: '/docs/overview/getting-started' },
      { text: 'Examples', link: '/examples/checkbox-group' },
      { text: 'Showcase', link: '/showcase' },
    ],
    socialLinks: [
      { icon: 'discord', link: discord },
      { icon: 'github', link: github },
    ],

    sidebar: [
      {
        text: 'Overview',
        icon: 'lucide:rocket',
        items: [
          { text: 'Introduction', link: '/docs/overview/introduction' },
          { text: 'Getting Started', link: '/docs/overview/getting-started' },
          { text: 'Installation', link: '/docs/overview/installation' },
          { text: 'Accessibility', link: '/docs/overview/accessibility' },
          { text: 'Releases', link: '/docs/overview/releases' },
        ],
      },
      {
        text: 'Guides',
        icon: 'lucide:book-open',
        items: [
          { text: 'Styling', link: '/docs/guides/styling' },
          { text: 'Animation/Transition', link: '/docs/guides/animation' },
          { text: 'Composition', link: '/docs/guides/composition' },
          { text: 'Controlled State', link: '/docs/guides/controlled-state' },
          {
            text: 'Server side rendering',
            link: '/docs/guides/server-side-rendering',
          },
          { text: 'Namespaced', link: '/docs/guides/namespaced-components' },
          { text: 'Dates', link: '/docs/guides/dates' },
          { text: 'Internationalization (RTL)', link: '/docs/guides/i18n' },
          {
            text: 'Inject Context',
            link: '/docs/guides/inject-context',
          },
          {
            text: 'Virtualization',
            link: '/docs/guides/virtualization',
          },
          {
            text: 'Migration',
            link: '/docs/guides/migration',
          },
        ],
      },
      {
        text: 'Components',
        icon: 'lucide:box',
        items: [
          {
            text: 'Form',
            items: [
              { text: 'Checkbox', link: '/docs/components/checkbox' },
              { text: 'Combobox', link: '/docs/components/combobox' },
              { text: 'Editable', link: '/docs/components/editable' },
              { text: 'Listbox', link: '/docs/components/listbox' },
              { text: 'Number Field', link: '/docs/components/number-field' },
              { text: 'Label', link: '/docs/components/label' },
              { text: 'Pin Input', link: '/docs/components/pin-input' },
              { text: 'Radio Group', link: '/docs/components/radio-group' },
              { text: 'Select', link: '/docs/components/select' },
              { text: 'Slider', link: '/docs/components/slider' },
              { text: 'Switch', link: '/docs/components/switch' },
              { text: 'Tags Input', link: '/docs/components/tags-input' },
              { text: 'Toggle', link: '/docs/components/toggle' },
              { text: 'Toggle Group', link: '/docs/components/toggle-group' },
            ],
          },
          {
            text: 'Dates',
            items: [
              {
                text: 'Calendar',
                link: '/docs/components/calendar',
              },
              {
                text: 'Date Field',
                link: '/docs/components/date-field',
              },
              {
                text: 'Date Picker',
                link: '/docs/components/date-picker',
              },
              {
                text: 'Date Range Field',
                link: '/docs/components/date-range-field',
              },
              {
                text: 'Date Range Picker',
                link: '/docs/components/date-range-picker',
              },
              {
                text: 'Range Calendar',
                link: '/docs/components/range-calendar',
              },
              {
                text: 'Time Field',
                link: '/docs/components/time-field',
              },
            ],
          },
          {
            text: 'General',
            items: [
              { text: 'Accordion', link: '/docs/components/accordion' },
              { text: 'Alert Dialog', link: '/docs/components/alert-dialog' },
              { text: 'Aspect Ratio', link: '/docs/components/aspect-ratio' },
              { text: 'Avatar', link: '/docs/components/avatar' },
              { text: 'Collapsible', link: '/docs/components/collapsible' },
              { text: 'Context Menu', link: '/docs/components/context-menu' },
              { text: 'Dialog', link: '/docs/components/dialog' },
              { text: 'Dropdown Menu', link: '/docs/components/dropdown-menu' },
              { text: 'Hover Card', link: '/docs/components/hover-card' },
              { text: 'Menubar', link: '/docs/components/menubar' },
              {
                text: 'Navigation Menu',
                link: '/docs/components/navigation-menu',
              },
              { text: 'Pagination', link: '/docs/components/pagination' },
              { text: 'Popover', link: '/docs/components/popover' },
              { text: 'Progress', link: '/docs/components/progress' },
              { text: 'Scroll Area', link: '/docs/components/scroll-area' },
              { text: 'Separator', link: '/docs/components/separator' },
              { text: 'Splitter', link: '/docs/components/splitter' },
              {
                text: 'Stepper',
                link: '/docs/components/stepper',
              },
              { text: 'Tabs', link: '/docs/components/tabs' },
              { text: 'Toast', link: '/docs/components/toast' },
              { text: 'Toolbar', link: '/docs/components/toolbar' },
              { text: 'Tooltip', link: '/docs/components/tooltip' },
              {
                text: 'Tree',
                link: '/docs/components/tree',
              },
            ],
          },
        ],
      },
      {
        text: 'Utilities',
        icon: 'lucide:wrench',
        items: [
          {
            text: 'Component',
            items: [
              { text: 'Config Provider', link: '/docs/utilities/config-provider' },
              { text: 'Focus Scope', link: '/docs/utilities/focus-scope' },
              { text: 'Presence', link: '/docs/utilities/presence' },
              { text: 'Primitive', link: '/docs/utilities/primitive' },
              { text: 'Roving Focus', link: '/docs/utilities/roving-focus' },
              { text: 'Slot', link: '/docs/utilities/slot' },
              { text: 'Visually Hidden', link: '/docs/utilities/visually-hidden' },
            ],
          },
          {
            text: 'Composable',
            items: [
              { text: 'useId', link: '/docs/utilities/use-id' },
              {
                text: 'useDateFormatter',
                link: '/docs/utilities/use-date-formatter',
              },
              {
                text: 'useEmitAsProps',
                link: '/docs/utilities/use-emit-as-props',
              },
              { text: 'useFilter', link: '/docs/utilities/use-filter' },
              {
                text: 'useForwardExpose',
                link: '/docs/utilities/use-forward-expose',
              },
              {
                text: 'useForwardProps',
                link: '/docs/utilities/use-forward-props',
              },
              {
                text: 'useForwardPropsEmits',
                link: '/docs/utilities/use-forward-props-emits',
              },
            ],
          },
        ],
      },
      {
        text: 'Examples',
        icon: 'lucide:square-dashed-mouse-pointer',
        link: '/examples/checkbox-group',
        items: [
          {
            text: 'Checkbox',
            items: [
              { text: 'Checkbox Group', link: '/examples/checkbox-group' },
            ],
          },
          {
            text: 'Combobox',
            items: [
              {
                text: 'Combobox Tags Input',
                link: '/examples/combobox-tags-input',
              },
              {
                text: 'Combobox Textarea',
                link: '/examples/combobox-textarea',
              },
            ],
          },
          {
            text: 'Date',
            items: [
              {
                text: 'Date Picker Selection',
                link: '/examples/date-picker-selection',
              },
            ],
          },
          {
            text: 'Dialog',
            items: [
              { text: 'Dialog Command Menu', link: '/examples/dialog-command-menu' },
              { text: 'Dialog Gesture Driven', link: '/examples/dialog-gesture-driven' },
            ],
          },
          {
            text: 'Listbox',
            items: [
              { text: 'Listbox Transfer', link: '/examples/listbox-transfer' },
            ],
          },
          {
            text: 'Slider',
            items: [
              {
                text: 'Slider with Number Field',
                link: '/examples/slider-number-field',
              },
              { text: 'Slider Tooltip', link: '/examples/slider-tooltip' },
            ],
          },
          {
            text: 'Tooltip',
            items: [
              { text: 'Tooltip Cursor', link: '/examples/tooltip-cursor' },
            ],
          },
          {
            text: 'Progress',
            items: [
              {
                text: 'Circular Progress',
                link: '/examples/progress-circular',
              },
            ],
          },
        ],
      },
    ],

    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/vinicunca/akar/edit/main/docs/content/:path',
    },
  },

  vite: {
    plugins: [
      UnoCSS(),
    ],

    css: {
      postcss: {
        plugins: [
          postcssIsolateStyles({ includeFiles: [/vp-doc\.css/] }),
        ],
      },
    },
  },
});
