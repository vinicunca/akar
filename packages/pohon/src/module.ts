import type { HookResult } from '@nuxt/schema';
import type { ModuleDependencies } from 'nuxt/schema';
import {
  addComponentsDir,
  addImports,
  addImportsDir,
  createResolver,
  defineNuxtModule,
  hasNuxtModule,
} from '@nuxt/kit';
import { defu } from 'defu';
import { name, version } from '../package.json';
import { publicComposables } from './imports';
import { addTemplates } from './templates';
import { DEFAULT_OPTIONS, getDefaultPohonConfig, resolveColors } from './utils/defaults';

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
   * @see https://akar.vinicunca.dev/pohon/overview/getting-started/installation/nuxt#fonts
   */
  fonts?: boolean;

  /**
   * Enable or disable `@nuxtjs/color-mode` module
   * @defaultValue `true`
   * @see https://akar.vinicunca.dev/pohon/overview/getting-started/installation/nuxt#colormode
   */
  colorMode?: boolean;

  /**
   * Customize how the theme is generated
   * @see https://akar.vinicunca.dev/pohon/overview/getting-started/theme/design-system
   */
  theme?: {
    /**
     * Define the color aliases available for components
     * @defaultValue `['primary', 'secondary', 'success', 'info', 'warning', 'error']`
     * @see https://akar.vinicunca.dev/pohon/overview/getting-started/installation/nuxt#themecolors
     */
    colors?: Array<Color>;

    /**
     * The default variants to use for components
     * @see https://akar.vinicunca.dev/pohon/overview/getting-started/installation/nuxt#themedefaultvariants
     */
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
   * @see https://akar.vinicunca.dev/pohon/overview/getting-started/installation/nuxt#prose
   */
  prose?: boolean;

  /**
   * @deprecated Use `prose` instead
   * @see https://akar.vinicunca.dev/pohon/overview/getting-started/installation/nuxt#mdc
   */
  mdc?: boolean;

  /**
   * Force the import of content & prose components even if `@nuxt/content` is not installed
   * @defaultValue false
   * @see https://akar.vinicunca.dev/pohon/overview/getting-started/installation/nuxt#content
   */
  content?: boolean;

  /**
   * Experimental features
   */
  experimental?: {
    /**
     * Enable automatic component detection for tree-shaking
     * Only generates theme files for components actually used in your app
     * - `true`: Enable automatic detection
     * - `string[]`: Enable detection and include additional components (useful for dynamic components)
     * @defaultValue false
     * @example true
     * @example ['Modal', 'Dropdown']
     */
    componentDetection?: boolean | Array<string>;
  };
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
    docs: 'https://akar.vinicunca.dev/pohon/overview/getting-started/installation/nuxt',
    configKey: 'ui',
    compatibility: {
      nuxt: '>=4.1.0',
    },
  },

  defaults: DEFAULT_OPTIONS,

  moduleDependencies(nuxt): ModuleDependencies {
    const userPohonOptions = nuxt.options.pohon || {};
    return {
      '@nuxt/icon': {
        defaults: {
          cssLayer: 'base',
        },
      },
      ...userPohonOptions.fonts !== false && {
        '@nuxt/fonts': {
          defaults: {
            defaults: {
              weights: [400, 500, 600, 700],
            },
          },
        },
      },
      ...userPohonOptions.colorMode !== false && {
        '@nuxtjs/color-mode': {
          defaults: {
            classSuffix: '',
            disableTransition: true,
          },
        },
      },
      '@nuxtjs/mdc': {
        optional: !userPohonOptions.mdc && !userPohonOptions.content,
        defaults: {
          highlight: {
            theme: {
              light: 'material-theme-lighter',
              default: 'material-theme',
              dark: 'material-theme-palenight',
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
              'prompt': 'ProsePrompt',
              'steps': 'ProseSteps',
              'tabs': 'ProseTabs',
              'tabs-item': 'ProseTabsItem',
              'tip': 'ProseTip',
              'warning': 'ProseWarning',
            },
          },
        },
      },
    };
  },

  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    options.theme = options.theme || {};
    options.theme.colors = resolveColors(options.theme.colors);

    nuxt.options.pohon = options;

    nuxt.options.alias['#pohon'] = resolve('./runtime');

    nuxt.options.appConfig.pohon = defu(
      nuxt.options.appConfig.pohon || {},
      getDefaultPohonConfig(options.theme),
    );

    nuxt.options.build.transpile.push('akar');

    // Isolate root node from portaled components
    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {};
    nuxt.options.app.rootAttrs.class = [
      nuxt.options.app.rootAttrs.class,
      'isolate',
    ].filter(Boolean).join(' ');

    if (options.prose || options.mdc || options.content || hasNuxtModule('@nuxtjs/mdc') || hasNuxtModule('@nuxt/content')) {
      addComponentsDir({
        path: resolve('./runtime/components/prose'),
        pathPrefix: false,
        prefix: 'Prose',
        global: true,
      });
    }

    if (options.content || hasNuxtModule('@nuxt/content')) {
      addComponentsDir({
        path: resolve('./runtime/components/content'),
        pathPrefix: false,
        prefix: options.prefix,
      });
    }

    if (options.colorMode || hasNuxtModule('@nuxtjs/color-mode')) {
      addComponentsDir({
        path: resolve('./runtime/components/color-mode'),
        pathPrefix: false,
        prefix: options.prefix,
      });
    } else {
      // Stub `useColorMode` composable used in `DashboardSearch` and `ContentSearch` components
      addImportsDir(resolve('./runtime/composables/color-mode'));
    }

    addComponentsDir({
      path: resolve('./runtime/components'),
      pathPrefix: false,
      prefix: options.prefix,
      ignore: ['color-mode/**', 'content/**', 'prose/**'],
    });

    addImports(
      Object.entries(publicComposables).flatMap(([file, exports]) =>
        exports.map((name) => ({ name, from: resolve(`./runtime/composables/${file}`) })),
      ),
    );

    addTemplates(options, nuxt, resolve);
  },
});
