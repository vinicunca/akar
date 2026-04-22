import type { Plugin } from 'vue';
import { isFunction } from '@vinicunca/perkakas';

export default {
  install(app, options) {
    if (options?.router && isFunction(options.router)) {
      app.provide('nuxtui:router', options.router);
    }
  },
} satisfies Plugin;
