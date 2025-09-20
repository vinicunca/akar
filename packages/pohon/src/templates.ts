import type { Resolver } from '@nuxt/kit';
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from '@nuxt/schema';
import type { PohonModuleOptions } from './module';
import process from 'node:process';
import { addTemplate, addTypeTemplate } from '@nuxt/kit';

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
}

export function getPohonTemplates(
  { options, pohon, nuxt }:
  {
    options: PohonModuleOptions;
    pohon: Nuxt['options']['appConfig']['pohon'];
    nuxt?: Nuxt;
  },
) {
  const templates: Array<NuxtTemplate> = [];

  const isDev = process.argv.includes('--pohonDev');

  writeThemeTemplate(theme);

  return templates;
}

function writeThemeTemplate(theme: Record<string, any>) {}
