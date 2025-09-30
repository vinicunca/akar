// workaround for TS bug with "phantom" deps
import type { } from '@nuxt/schema';

import type { Components } from 'akar/constant';
import { addComponent, defineNuxtModule } from '@nuxt/kit';
import { components as allComponents } from 'akar/constant';

export interface ModuleOptions {
  components: Partial<Record<keyof Components, boolean>> | boolean;
  prefix: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'akar/nuxt',
    configKey: 'akar',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    prefix: '',
    components: true,
  },
  setup({ prefix, components }) {
    if (components === false) {
      return;
    }

    let groupName: keyof Components;
    // eslint-disable-next-line no-restricted-syntax
    for (groupName in allComponents) {
      if (components === true || components[groupName]) {
        for (const component of allComponents[groupName]) {
          addComponent({
            name: `${prefix}${component}`,
            export: component,
            filePath: 'akar',
          });
        }
      }
    }
  },
});
