import anchor from 'markdown-it-anchor';
import UnoCSS from 'unocss/vite';
import { defineConfig, postcssIsolateStyles } from 'vitepress';
import { akarName, akarShortName, discord, github, ogUrl } from './meta';
import ComponentPreviewPlugin from './plugins/component-preview';
import { createHoverTransformer } from './plugins/hover-transformer';
import InstallationTabsPlugin from './plugins/installation-tabs';

// @unocss-include

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
    outline: {
      level: [2, 3],
    },
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
            text: 'General',
            items: [
              { text: 'Accordion', link: '/docs/components/a-accordion' },
              { text: 'Alert Dialog', link: '/docs/components/a-alert-dialog' },
              { text: 'Aspect Ratio', link: '/docs/components/a-aspect-ratio' },
              { text: 'Avatar', link: '/docs/components/a-avatar' },
              { text: 'Collapsible', link: '/docs/components/a-collapsible' },
              { text: 'Context Menu', link: '/docs/components/a-context-menu' },
              { text: 'Dialog', link: '/docs/components/a-dialog' },
              { text: 'Dropdown Menu', link: '/docs/components/a-dropdown-menu' },
              { text: 'Hover Card', link: '/docs/components/a-hover-card' },
              { text: 'Menubar', link: '/docs/components/a-menubar' },
              {
                text: 'Navigation Menu',
                link: '/docs/components/a-navigation-menu',
              },
              { text: 'Pagination', link: '/docs/components/a-pagination' },
              { text: 'Popover', link: '/docs/components/a-popover' },
              { text: 'Progress', link: '/docs/components/a-progress' },
              { text: 'Scroll Area', link: '/docs/components/a-scroll-area' },
              { text: 'Separator', link: '/docs/components/a-separator' },
              { text: 'Splitter', link: '/docs/components/a-splitter' },
              {
                text: 'Stepper',
                link: '/docs/components/a-stepper',
              },
              { text: 'Tabs', link: '/docs/components/a-tabs' },
              { text: 'Toast', link: '/docs/components/a-toast' },
              { text: 'Toolbar', link: '/docs/components/a-toolbar' },
              { text: 'Tooltip', link: '/docs/components/a-tooltip' },
              {
                text: 'Tree',
                link: '/docs/components/a-tree',
              },
            ],
          },
          {
            text: 'Form',
            items: [
              { text: 'Checkbox', link: '/docs/components/a-checkbox' },
              { text: 'Combobox', link: '/docs/components/a-combobox' },
              { text: 'Editable', link: '/docs/components/a-editable' },
              { text: 'Listbox', link: '/docs/components/a-listbox' },
              { text: 'Number Field', link: '/docs/components/a-number-field' },
              { text: 'Label', link: '/docs/components/a-label' },
              { text: 'Pin Input', link: '/docs/components/a-pin-input' },
              { text: 'Radio Group', link: '/docs/components/a-radio-group' },
              { text: 'Select', link: '/docs/components/a-select' },
              { text: 'Slider', link: '/docs/components/a-slider' },
              { text: 'Switch', link: '/docs/components/a-switch' },
              { text: 'Tags Input', link: '/docs/components/a-tags-input' },
              { text: 'Toggle', link: '/docs/components/a-toggle' },
              { text: 'Toggle Group', link: '/docs/components/a-toggle-group' },
            ],
          },
          {
            text: 'Dates',
            items: [
              {
                text: 'Calendar',
                link: '/docs/components/a-calendar',
              },
              {
                text: 'Date Field',
                link: '/docs/components/a-date-field',
              },
              {
                text: 'Date Picker',
                link: '/docs/components/a-date-picker',
              },
              {
                text: 'Date Range Field',
                link: '/docs/components/a-date-range-field',
              },
              {
                text: 'Date Range Picker',
                link: '/docs/components/a-date-range-picker',
              },
              {
                text: 'Range Calendar',
                link: '/docs/components/a-range-calendar',
              },
              {
                text: 'Time Field',
                link: '/docs/components/a-time-field',
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

  markdown: {
    theme: 'github-dark',
    headers: {
      level: [2, 3],
    },
    anchor: {
      callback(token) {
        token.attrSet(
          'class',
          'group relative border-none mb-4 lg:-ml-2 lg:pl-2 lg:pr-2 w-max',
        );
      },
      permalink: anchor.permalink.linkInsideHeader({
        class: 'header-anchor [&_span]:focus:opacity-100 [&_span_>_span]:focus:outline',
        symbol: '<span class="absolute top-0 -ml-8 hidden items-center border-0 opacity-0 group-hover:opacity-100 focus:opacity-100 lg:flex">&ZeroWidthSpace;<span class="flex h-6 w-6 items-center justify-center rounded-md outline-2 outline-docs-primary color-green-400 shadow-sm  hover:color-green-700 hover:shadow dark:bg-docs-primary/20 dark:color-docs-primary/80 dark:shadow-none  dark:hover:bg-docs-primary/40 dark:hover:color-docs-primary"><svg width="12" height="12" fill="none" aria-hidden="true"><path d="M3.75 1v10M8.25 1v10M1 3.75h10M1 8.25h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg></span></span>',
        renderAttrs: (slug, state) => {
          // From: https://github.com/vuejs/vitepress/blob/256d742b733bfb62d54c78168b0e867b8eb829c9/src/node/markdown/markdown.ts#L263
          // Find `heading_open` with the id identical to slug
          const idx = state.tokens.findIndex((token) => {
            const attrs = token.attrs;
            const id = attrs?.find((attr) => attr[0] === 'id');
            return id && slug === id[1];
          });
          // Get the actual heading content
          const title = state.tokens[idx + 1].content;
          return {
            'aria-label': `Permalink to "${title}"`,
          };
        },
      }),
    },

    preConfig(md) {
      md.use(ComponentPreviewPlugin);
      md.use(InstallationTabsPlugin);
    },

    codeTransformers: [createHoverTransformer()],
  },

  transformPageData(pageData) {
    if (pageData.frontmatter.sidebar != null) {
      return;
    }
    // hide sidebar on showcase page
    pageData.frontmatter.sidebar = pageData.frontmatter.layout !== 'showcase';
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
