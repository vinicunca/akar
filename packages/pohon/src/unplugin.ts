import type * as pohon from '#build/pohon';
import type { colors } from 'unocss/preset-mini';
import type { UnpluginOptions } from 'unplugin';
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types';
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types';
import type { PohonModuleOptions, UvConfig } from './module';
import type icons from './theme/icons';
import { fileURLToPath } from 'node:url';
import { defu } from 'defu';
import { normalize } from 'pathe';
import { createUnplugin } from 'unplugin';
import AppConfigPlugin from './plugins/app-config';
import AutoImportPlugin from './plugins/auto-import';
import ComponentImportPlugin from './plugins/components';
import NuxtEnvironmentPlugin from './plugins/nuxt-environment';
import PluginsPlugin from './plugins/plugins';
import TemplatePlugin from './plugins/templates';
import { DEFAULT_OPTIONS, getDefaultPohonConfig, resolveColors } from './utils/defaults';

type NeutralColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone';
type Color = Exclude<keyof typeof colors, 'inherit' | 'current' | 'transparent' | 'black' | 'white' | NeutralColor> | (string & {});

type AppConfigPohon = {
  // TODO: add type hinting for colors from `options.theme.colors`
  colors?: Record<string, Color> & { neutral?: NeutralColor };
  icons?: Partial<typeof icons>;
  prefix?: string;
} & UvConfig<typeof pohon>;

export interface PohonOptions extends Omit<PohonModuleOptions, 'fonts' | 'colorMode'> {
  /** Whether to generate declaration files for auto-imported components. */
  dts?: boolean;
  pohon?: AppConfigPohon;
  /**
   * Enable or disable `@vueuse/core` color-mode integration
   * @defaultValue `true`
   */
  colorMode?: boolean;
  /**
   * Override options for `unplugin-auto-import`
   */
  autoImport?: Partial<AutoImportOptions>;
  /**
   * Override options for `unplugin-vue-components`
   */
  components?: Partial<ComponentsOptions>;
  /**
   * Router integration mode
   * - `true` (default): Use vue-router integration
   * - `false`: Disable routing, use anchor tags
   * - `'inertia'`: Use Inertia.js compatibility layer
   * @defaultValue `true`
   */
  router?: boolean | 'inertia';
  /**
   * Enables compatibility layer for InertiaJS
   * @deprecated Use `router: 'inertia'` instead
   */
  inertia?: boolean;
  /**
   * Additional packages to scan for components using Nuxt UI
   */
  scanPackages?: Array<string>;
}

export const runtimeDir = normalize(fileURLToPath(new URL('./runtime', import.meta.url)));

export const PohonPlugin = createUnplugin<PohonOptions | undefined>((_options = {}, meta) => {
  const options = defu(
    _options,
    {
      fonts: false,
    },
    DEFAULT_OPTIONS,
  );

  options.theme = options.theme || {};
  options.theme.colors = resolveColors(options.theme.colors);

  const appConfig = defu(
    {
      pohon: options.pohon,
      colorMode: options.colorMode,
    },
    {
      pohon: getDefaultPohonConfig(options.theme),
    },
  );

  return [
    NuxtEnvironmentPlugin(options),
    ComponentImportPlugin(options, meta),
    AutoImportPlugin(options, meta),
    PluginsPlugin(options),
    TemplatePlugin(options, appConfig),
    AppConfigPlugin(options, appConfig),
    <UnpluginOptions>{
      name: 'nuxt:ui:plugins-duplication-detection',
      vite: {
        configResolved(config) {
          const plugins = config.plugins || [];

          if (plugins.filter((i) => i.name === 'unplugin-auto-import').length > 1) {
            throw new Error('[Pohon] Multiple instances of `unplugin-auto-import` detected. Pohon includes `unplugin-auto-import` already, and you can configure it using `autoImport` option in Pohon module options.');
          }
          if (plugins.filter((i) => i.name === 'unplugin-vue-components').length > 1) {
            throw new Error('[Pohon] Multiple instances of `unplugin-vue-components` detected. Pohon includes `unplugin-vue-components` already, and you can configure it using `components` option in Pohon module options.');
          }
        },
      },
    },
  ].flat(1) as Array<UnpluginOptions>;
});
