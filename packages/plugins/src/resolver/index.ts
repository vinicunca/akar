import type { Components } from 'akar/constant';
import type { ComponentResolver } from 'unplugin-vue-components';
import { components } from 'akar/constant';

export interface ResolverOptions {
  /**
   * prefix for components used in templates
   *
   * @defaultValue ""
   */
  prefix?: string;
}

export default function (options: ResolverOptions = {}): ComponentResolver {
  const { prefix = '' } = options;

  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.toLowerCase().startsWith(prefix.toLowerCase())) {
        const componentName = name.substring(prefix.length);
        let groupName: keyof Components;
        // eslint-disable-next-line no-restricted-syntax
        for (groupName in components) {
          const groupComponents: ReadonlyArray<string> = components[groupName];
          if (groupComponents.includes(componentName)) {
            return {
              name: componentName,
              from: 'akar',
            };
          }
        }
      }
    },
  };
}
