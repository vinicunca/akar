import type { } from '@nuxt/schema'; // workaround for TS bug with "phantom" deps
import type { Components } from 'akar/constant';
import { addComponent, addVitePlugin, defineNuxtModule } from '@nuxt/kit';
import { components as allComponents } from 'akar/constant';
import { getComponentSource } from '../shared';

export interface ModuleOptions {
  components: Partial<Record<keyof Components, boolean>> | boolean;
  prefix: string;
  /**
   * Import each component from its own entry point (`akar/dialog`) instead of the
   * package root (`akar`). Both export the very same components, so this only changes
   * how much of the library the dev server and the server renderer load. The module adds
   * `akar` and the entry points to Vite's `optimizeDeps.include`, see `optimizeDepsPlugin`.
   *
   * @defaultValue true
   */
  subpaths: boolean;
}

/** The part of Vite's `UserConfig` the module touches (`vite` is not a dependency of the module). */
interface ViteConfig {
  optimizeDeps?: { include?: Array<string>; exclude?: Array<string> };
  environments?: Record<string, { optimizeDeps?: { exclude?: Array<string> } }>;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@akar/nuxt',
    configKey: 'akar',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    prefix: '',
    components: true,
    subpaths: true,
  },
  setup({ prefix, components, subpaths }) {
    if (components === false) {
      return;
    }

    const sources: Array<string> = [];
    let groupName: keyof Components;
    for (groupName in allComponents) {
      if (components === true || components[groupName]) {
        const filePath = getComponentSource(groupName, subpaths);
        if (!sources.includes(filePath)) {
          sources.push(filePath);
        }
        for (const component of allComponents[groupName]) {
          addComponent({
            name: `${prefix}${component}`,
            export: component,
            filePath,
          });
        }
      }
    }

    if (subpaths) {
      addVitePlugin(optimizeDepsPlugin(sources), { server: false });
    }
  },
});

/**
 * Pre-bundles `akar` and the registered entry points for the client.
 *
 * - The entry points: component imports are injected while modules are transformed, so
 *   Vite's dependency scan never sees them and would discover each entry point the first
 *   time a page uses it, re-optimizing and reloading the page.
 * - `akar` itself: Vite only pre-bundles a package imported from `node_modules` (a Nuxt
 *   layer, a component kit) once it already pre-bundles it for the app. Without it such a
 *   dependency gets a raw `akar`, a second copy next to the pre-bundled entry points
 *   whose contexts the auto-imported parts cannot inject.
 *
 * Top-level `optimizeDeps` only configures the client, with or without Vite's environment
 * API. Anything the app excludes stays excluded, and nothing is added when `akar` is.
 */
function optimizeDepsPlugin(sources: Array<string>) {
  return {
    name: 'akar:optimize-deps',
    config(config: ViteConfig) {
      const optimizeDeps = (config.optimizeDeps ??= {});
      const excluded = [
        ...(optimizeDeps.exclude ?? []),
        ...(config.environments?.client?.optimizeDeps?.exclude ?? []),
      ];
      if (excluded.includes('akar')) {
        return;
      }
      const include = (optimizeDeps.include ??= []);
      for (const source of ['akar', ...sources]) {
        if (!excluded.includes(source) && !include.includes(source)) {
          include.push(source);
        }
      }
    },
  };
}
