export default defineNuxtConfig({
  modules: [
    'pohon-ui',
  ],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/docs/components/**': { redirect: { to: '/components/**', statusCode: 301 }, prerender: false },
  },

  compatibilityDate: '2024-07-09',
});
