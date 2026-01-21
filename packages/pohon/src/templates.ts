/* eslint-disable sonar/no-nested-functions */
import type { Resolver } from '@nuxt/kit';
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from '@nuxt/schema';
import type { PohonModuleOptions } from './module';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { addTemplate, addTypeTemplate, hasNuxtModule, updateTemplates } from '@nuxt/kit';
import { isFunction, toKebabCase } from '@vinicunca/perkakas';
import * as theme from './theme';
import * as themeContent from './theme/content';
import * as themeProse from './theme/prose';
import { applyDefaultVariants } from './utils/theme';

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
    nuxt,
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

  if (options.experimental?.componentDetection && nuxt.options.dev) {
    nuxt.hook('builder:watch', async (_, path) => {
      if (/\.(?:vue|ts|js|tsx|jsx)$/.test(path)) {
        await updateTemplates({ filter: (template) => template.filename === 'ui.css' });
      }
    });
  }
}

export function getPohonTemplates(
  { options, pohon, nuxt}:
  {
    options: PohonModuleOptions;
    pohon: Nuxt['options']['appConfig']['pohon'];
    nuxt?: Nuxt;
  },
) {
  const templates: Array<NuxtTemplate> = [];

  let hasProse = false;
  let hasContent = false;

  const isDev = process.argv.includes('--pohonDev');

  function writeThemeTemplate(theme: Record<string, any>, path?: string) {
    for (const component of Object.keys(theme)) {
      templates.push({
        // eslint-disable-next-line sonar/no-nested-template-literals
        filename: `pohon/${path ? `${path}/` : ''}${toKebabCase(component)}.ts`,
        write: true,
        getContents: async () => {
          const template = theme[component];
          let result = isFunction(template) ? template(options) : template;

          // Override default variants from nuxt.config.ts
          result = applyDefaultVariants(result, options.theme?.defaultVariants);

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
            // eslint-disable-next-line sonar/no-nested-template-literals
            const templatePath = fileURLToPath(new URL(`./theme/${path ? `${path}/` : ''}${toKebabCase(component)}`, import.meta.url));
            const themeUtilsPath = fileURLToPath(new URL('./utils/theme', import.meta.url));

            return [
              `import template from ${JSON.stringify(templatePath)}`,
              `import { applyDefaultVariants } from ${JSON.stringify(themeUtilsPath)}`,
              ...generateVariantDeclarations(variants),
              `const options = ${JSON.stringify(options, null, 2)}`,
              'let result = typeof template === \'function\' ? (template as Function)(options) : template',
              'result = applyDefaultVariants(result, options.theme?.defaultVariants)',
              `const theme = ${json}`,
              'export default result as typeof theme',
            ].join('\n\n');
          }

          // For production build
          return [
            ...generateVariantDeclarations(variants),
            `export default ${json}`,
          ].join('\n\n');
        },
      });
    }
  }

  if (
    !!nuxt && (
      (hasNuxtModule('@nuxtjs/mdc') || options.mdc) || (hasNuxtModule('@nuxt/content') || options.content)
    )
  ) {
    hasProse = true;

    const path = 'prose';

    writeThemeTemplate(themeProse, path);

    templates.push({
      filename: `pohon/${path}/index.ts`,
      write: true,
      getContents: () => Object.keys(themeProse).map((component) => `export { default as ${component} } from './${toKebabCase(component)}'`).join('\n'),
    });
  }

  if (!!nuxt && (hasNuxtModule('@nuxt/content') || options.content)) {
    hasContent = true;

    writeThemeTemplate(themeContent, 'content');
  }

  writeThemeTemplate(theme);

  templates.push({
    filename: 'pohon/index.ts',
    write: true,
    getContents: () => [
      ...Object.keys(theme).map((component) => `export { default as ${component} } from './${toKebabCase(component)}'`),
      ...(hasContent ? Object.keys(themeContent).map((component) => `export { default as ${component} } from './content/${toKebabCase(component)}'`) : []),
      ...(hasProse ? ['export * as prose from \'./prose\''] : []),
    ].join('\n'),
  });

  templates.push({
    filename: 'types/pohon.d.ts',
    getContents: () => {
      const iconKeys = Object.keys(pohon?.icons || {});
      const iconUnion = iconKeys.length ? iconKeys.map((i) => JSON.stringify(i)).join(' | ') : 'string';

      return `import * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';
import type { colors } from 'unocss/preset-mini';

type IconsConfig = Record<${iconUnion} | (string & {}), string>;

type NeutralColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone';
type Color = Exclude<keyof typeof colors, 'inherit' | 'current' | 'transparent' | 'black' | 'white' | NeutralColor> | (string & {});

type AppConfigPohon = {
  colors?: {
    ${options.theme?.colors?.map((color) => `'${color}'?: Color`).join('\n\t\t')}
    neutral?: NeutralColor | (string & {})
  };
  icons?: Partial<IconsConfig>;
} & UvConfig<typeof pohon>;

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /**
     * Pohon theme configuration
     * @see https://akar.vinicunca.dev/pohon/getting-started/theme/components
     */
    pohon?: AppConfigPohon;
  }
}

export {};
`;
    },
  });

  return templates;
}
