import {
  addComponentsDir,
  addImportsDir,
  createResolver,
  defineNuxtModule,
  hasNuxtModule,
  installModule,
} from '@nuxt/kit';
import { defu } from 'defu';
import { name, version } from '../package.json';
import { DEFAULT_OPTIONS, getDefaultPohonConfig, resolveColors } from './defaults';
import { addPohonTemplates } from './templates';

type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | (string & {});
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {});

export interface PohonModuleOptions {
  /**
   * Prefix for components
   * @defaultValue `P`
   * @see https://akar.vinicunca.dev/pohon/overview/getting-started/installation/nuxt#prefix
   */
  prefix?: string;
  /**
   * Customize how the theme is generated
   * @see https://akar.vinicunca.dev/pohon/overview/getting-started/theme
   */
  theme?: {
    /**
     * Define the color aliases available for components
     * @defaultValue `['primary', 'secondary', 'success', 'info', 'warning', 'error']`
     * @see https://akar.vinicunca.dev/pohon/overview/getting-started/installation/nuxt#themecolors
     */
    colors?: Array<Color>;

    defaultVariants?: {
      /**
       * The default color variant to use for components
       * @defaultValue `'primary'`
       */
      color?: Color;

      /**
       * The default size variant to use for components
       * @defaultValue `'md'`
       */
      size?: Size;
    };
  };
}

export default defineNuxtModule<PohonModuleOptions>({
  meta: {
    name,
    version,
    docs: 'https://akar.vinicunca.dev/pohon/overview/getting-started',
    configKey: 'pohon',
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },

  defaults: DEFAULT_OPTIONS,

  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    options.theme = options.theme || {};
    options.theme.colors = resolveColors(options.theme.colors);

    nuxt.options.pohon = options;

    nuxt.options.alias['#pohon'] = resolve('./runtime');

    nuxt.options.appConfig.pohon = defu(
      nuxt.options.appConfig.pohon ?? {},
      getDefaultPohonConfig(options.theme.colors),
    );

    // Isolate root node from portaled components
    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {};
    nuxt.options.app.rootAttrs.class = [
      nuxt.options.app.rootAttrs.class,
      'isolate',
    ]
      .filter(Boolean)
      .join(' ');

    async function registerModule(
      { name, key, options = {} }:
      { name: string; key: string; options?: Record<string, any> },
    ) {
      if (!hasNuxtModule(name)) {
        await installModule(name, options);
      } else {
        (nuxt.options as any)[key] = defu(
          (nuxt.options as any)[key],
          options,
        );
      }
    }

    await registerModule({ name: '@unocss/nuxt', key: 'unocss' });

    addComponentsDir({
      path: resolve('./runtime/components'),
      pathPrefix: false,
      prefix: options.prefix,
    });

    addImportsDir(resolve('./runtime/composables'));

    addPohonTemplates({ options, nuxt, resolve });
  },
});
