/* eslint-disable sonar/no-nested-functions */
import type { Resolver } from '@nuxt/kit';
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from '@nuxt/schema';
import type { PohonModuleOptions } from './module';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { addTemplate, addTypeTemplate } from '@nuxt/kit';
import { isFunction, toKebabCase } from '@vinicunca/perkakas';
import * as theme from './theme';

export function addPohonTemplates(
  { options, nuxt, resolve }:
  {
    options: PohonModuleOptions;
    nuxt: Nuxt;
    resolve: Resolver['resolve'];
  },
) {
  const templates = getPohonTemplates({
    options,
    pohon: nuxt.options.appConfig.pohon,
  });

  for (const template of templates) {
    if (template.filename!.endsWith('.d.ts')) {
      addTypeTemplate(template as NuxtTypeTemplate);
    } else {
      addTemplate(template);
    }
  }

  nuxt.hook('prepare:types', ({ references }) => {
    references.push({
      path: resolve('./runtime/types/app.config.d.ts'),
    });
  });
}

export function getPohonTemplates(
  { options, pohon }:
  {
    options: PohonModuleOptions;
    pohon: Nuxt['options']['appConfig']['pohon'];
  },
) {
  const templates: Array<NuxtTemplate> = [];

  const isDev = process.argv.includes('--pohonDev');

  function writeThemeTemplate(theme: Record<string, any>) {
    for (const component of Object.keys(theme)) {
      templates.push({
        filename: `pohon/${toKebabCase(component)}.ts`,
        write: true,
        getContents: async () => {
          const template = theme[component];
          const result = isFunction(template) ? template(options) : template;

          // Override default variants from nuxt.config.ts
          if (result?.defaultVariants?.color && options.theme?.defaultVariants?.color) {
            result.defaultVariants.color = options.theme.defaultVariants.color;
          }
          if (result?.defaultVariants?.size && options.theme?.defaultVariants?.size) {
            result.defaultVariants.size = options.theme.defaultVariants.size;
          }

          const variants = Object.entries(result.variants || {})
            .filter(([_, values]) => {
              const keys = Object.keys(values as Record<string, unknown>);
              return keys.some((key) => key !== 'true' && key !== 'false');
            })
            .map(([key]) => key);

          let json = JSON.stringify(result, null, 2);

          for (const variant of variants) {
            json = json.replace(new RegExp(`("${variant}": "[^"]+")`, 'g'), `$1 as typeof ${variant}[number]`);
            json = json.replace(new RegExp(`("${variant}": \\[\\s*)((?:"[^"]+",?\\s*)+)(\\])`, 'g'), (_, before, match, after) => {
              const replaced = match.replace(/("[^"]+")/g, `$1 as typeof ${variant}[number]`);
              return `${before}${replaced}${after}`;
            });
          }

          function generateVariantDeclarations(variants: Array<string>) {
            return variants.filter((variant) => json.includes(`as typeof ${variant}`))
              .map((variant) => {
                const keys = Object.keys(result.variants[variant]);
                return `const ${variant} = ${JSON.stringify(keys, null, 2)} as const;`;
              });
          }

          // For local development, import directly from theme
          if (isDev) {
            const templatePath = fileURLToPath(new URL(`./theme/${toKebabCase(component)}`, import.meta.url));
            return [
              `import template from ${JSON.stringify(templatePath)}`,
              ...generateVariantDeclarations(variants),
              `const options = ${JSON.stringify(options, null, 2)}`,
              'const result = typeof template === \'function\' ? (template as Function)(options) : template',
              'if (result?.defaultVariants?.color && options.theme?.defaultVariants?.color) result.defaultVariants.color = options.theme.defaultVariants.color',
              'if (result?.defaultVariants?.size && options.theme?.defaultVariants?.size) result.defaultVariants.size = options.theme.defaultVariants.size',
              `const theme = ${json}`,
              'export default result as typeof theme',
            ].join('\n\n');
          }

          return [
            ...generateVariantDeclarations(variants),
            `export default ${json}`,
          ].join('\n\n');
        },
      });
    }
  }

  writeThemeTemplate(theme);

  templates.push({
    filename: 'pohon/index.ts',
    write: true,
    getContents: () => {
      const contents = Object.keys(theme)
        .map((component) => `export { default as ${component} } from './${toKebabCase(component)}'`)
        .join('\n');

      return contents;
    },
  });

  // FIXME: `typeof colors[number]` should include all colors from the theme
  templates.push({
    filename: 'types/ui.d.ts',
    getContents: () => {
      const iconKeys = Object.keys(pohon?.icons || {});
      const iconUnion = iconKeys.length ? iconKeys.map((i) => JSON.stringify(i)).join(' | ') : 'string';

      return `import * as ui from '#build/ui'
import type { TVConfig } from '@nuxt/ui'
import type { defaultConfig } from 'tailwind-variants'
import colors from 'tailwindcss/colors'

type IconsConfig = Record<${iconUnion} | (string & {}), string>

type NeutralColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone'
type Color = Exclude<keyof typeof colors, 'inherit' | 'current' | 'transparent' | 'black' | 'white' | NeutralColor> | (string & {})

type AppConfigUI = {
  colors?: {
    ${options.theme?.colors?.map((color) => `'${color}'?: Color`).join('\n\t\t')}
    neutral?: NeutralColor | (string & {})
  }
  icons?: Partial<IconsConfig>
  tv?: typeof defaultConfig
} & TVConfig<typeof ui>

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /**
     * Nuxt UI theme configuration
     * @see https://ui.nuxt.com/docs/getting-started/theme/components
     */
    ui?: AppConfigUI
  }
}

export {}
`;
    },
  });

  return templates;
}
