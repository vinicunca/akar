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
