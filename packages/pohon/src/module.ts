import type { HookResult } from '@nuxt/schema';
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

export type * from './runtime/types';

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
   * Enable or disable `@nuxt/fonts` module
   * @defaultValue `true`
   * @see https://akar.vinicunca.dev/pohon/getting-started/installation/nuxt#fonts
   */
  fonts?: boolean;

  /**
   * Enable or disable `@nuxtjs/color-mode` module
   * @defaultValue `true`
   * @see https://akar.vinicunca.dev/pohon/getting-started/installation/nuxt#colormode
   */
  colorMode?: boolean;

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

  /**
   * Force the import of prose components even if `@nuxtjs/mdc` or `@nuxt/content` are not installed
   * @defaultValue false
   */
  mdc?: boolean;
  /**
   * Force the import of content & prose components even if `@nuxt/content` is not installed
   * @defaultValue false
   */
  content?: boolean;
}

declare module '#app' {
  interface RuntimeNuxtHooks {
    'dashboard:search:toggle': () => HookResult;
    'dashboard:sidebar:toggle': () => HookResult;
    'dashboard:sidebar:collapse': (value: boolean) => HookResult;
  }
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

    await registerModule({
      name: '@nuxt/icon',
      key: 'icon',
      options: {
        cssLayer: 'components',
      },
    });

    if (options.fonts) {
      await registerModule({
        name: '@nuxt/fonts',
        key: 'fonts',
        options: {
          defaults: {
            weights: [400, 500, 600, 700],
          },
        },
      });
    }

    if (options.colorMode) {
      await registerModule({
        name: '@nuxtjs/color-mode',
        key: 'colorMode',
        options: {
          classSuffix: '',
          disableTransition: true,
        },
      });
    }

    if ((hasNuxtModule('@nuxtjs/mdc') || options.mdc) || (hasNuxtModule('@nuxt/content') || options.content)) {
      nuxt.options.mdc = defu(
        nuxt.options.mdc,
        {
          highlight: {
            theme: {
              light: 'one-light',
              default: 'one-dark-pro',
              dark: 'one-dark-pro',
            },
          },
          components: {
            map: {
              'accordion': 'ProseAccordion',
              'accordion-item': 'ProseAccordionItem',
              'badge': 'ProseBadge',
              'callout': 'ProseCallout',
              'card': 'ProseCard',
              'card-group': 'ProseCardGroup',
              'caution': 'ProseCaution',
              'code-collapse': 'ProseCodeCollapse',
              'code-group': 'ProseCodeGroup',
              'code-icon': 'ProseCodeIcon',
              'code-preview': 'ProseCodePreview',
              'code-tree': 'ProseCodeTree',
              'collapsible': 'ProseCollapsible',
              'field': 'ProseField',
              'field-group': 'ProseFieldGroup',
              'icon': 'ProseIcon',
              'kbd': 'ProseKbd',
              'note': 'ProseNote',
              'steps': 'ProseSteps',
              'tabs': 'ProseTabs',
              'tabs-item': 'ProseTabsItem',
              'tip': 'ProseTip',
              'warning': 'ProseWarning',
            },
          },
        },
      );

      addComponentsDir({
        path: resolve('./runtime/components/prose'),
        pathPrefix: false,
        prefix: 'Prose',
        global: true,
      });
    }

    if ((hasNuxtModule('@nuxt/content') || options.content)) {
      addComponentsDir({
        path: resolve('./runtime/components/content'),
        pathPrefix: false,
        prefix: options.prefix,
      });
    }

    if (hasNuxtModule('@nuxtjs/color-mode')) {
      addComponentsDir({
        path: resolve('./runtime/components/color-mode'),
        pathPrefix: false,
        prefix: options.prefix,
      });
    }

    addComponentsDir({
      path: resolve('./runtime/components'),
      pathPrefix: false,
      prefix: options.prefix,
      ignore: ['color-mode/**', 'content/**', 'prose/**'],
    });

    addImportsDir(resolve('./runtime/composables'));

    addPohonTemplates({ options, nuxt, resolve });
  },
});
