// workaround for TS bug with "phantom" deps
import type { } from '@nuxt/schema';

import { addComponent, defineNuxtModule } from '@nuxt/kit';
import { components as allComponents } from '@vinicunca/akar/constant';

export interface ModuleOptions {
  components: boolean | Partial<Record<keyof typeof allComponents, boolean>>;
  prefix: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vinicunca/akar/nuxt',
    configKey: 'akar',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    prefix: '',
    components: true,
  },
  setup(options) {
    function getComponents() {
      if (typeof options.components === 'object') {
        return Object.entries(allComponents)
          .filter(([name]) => (options.components as Record<string, boolean>)[name])
          .flatMap(([_, components]) => components);
      }

      if (options.components) {
        return Object.values(allComponents).flat();
      }

      return [];
    }

    for (const component of getComponents()) {
      addComponent({
        name: `${options.prefix}${component}`,
        export: component,
        filePath: '@vinicunca/akar',
      });
    }
  },
});
