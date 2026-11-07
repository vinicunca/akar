import type { Components } from 'akar/constant';
import type { ComponentResolver } from 'unplugin-vue-components';
import { components } from 'akar/constant';
import { getComponentSource } from '../shared';

export interface ResolverOptions {
  /**
   * prefix for components used in templates
   *
   * @defaultValue ""
   */
  prefix?: string;
  /**
   * Import each component from its own entry point (`akar/dialog`) instead of the
   * package root (`akar`). Both export the very same components, so this only changes
   * how much of the library an unbundled dev server or SSR runtime loads.
   *
   * Requires `optimizeDeps.include: ['akar', 'akar/dialog', …]` in the Vite config.
   * Vite only pre-bundles a package imported from `node_modules` (a component kit, a Nuxt
   * layer) once it already pre-bundles it for your own code. When the auto-imports no longer
   * import `akar` itself, such a dependency is served a raw `akar` next to the
   * pre-bundled subpaths, a second copy whose contexts the auto-imported parts cannot inject.
   *
   * @defaultValue false
   */
  subpaths?: boolean;
}

export default function (options: ResolverOptions = {}): ComponentResolver {
  const { prefix = '', subpaths = false } = options;

  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.toLowerCase().startsWith(prefix.toLowerCase())) {
        const componentName = name.substring(prefix.length);
        let groupName: keyof Components;
        for (groupName in components) {
          const groupComponents: ReadonlyArray<string> = components[groupName];
          if (groupComponents.includes(componentName)) {
            return {
              name: componentName,
              from: getComponentSource(groupName, subpaths),
            };
          }
        }
      }
    },
  };
}
