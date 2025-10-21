import type { Postprocessor, Shortcut } from '@unocss/core';
import type { PresetVinicuncaOptions, VinicuncaTheme } from './types';
import { definePreset } from '@unocss/core';
import { getPreflights, postprocessWithUnColor } from './core';
import { PRESET_NAME } from './meta';
import { resolveOptions } from './resolver';

export type { VinicuncaTheme };

export const presetVinicunca = definePreset<PresetVinicuncaOptions, VinicuncaTheme>(
  async (options) => {
    const resolvedOptions = await resolveOptions(options ?? {});

    const {
      unColor,
      theme,
      meta,
    } = resolvedOptions;

    return {
      name: `unocss-preset-${PRESET_NAME}`,

      theme,

      shortcuts: [
        ...meta.shortcuts,
      ] as Array<Shortcut>,

      postprocess: [
        unColor ? postprocessWithUnColor(unColor as string) : undefined,
      ].filter(Boolean) as Array<Postprocessor>,

      presets: meta.presets,

      transformers: meta.transformers,

      preflights: getPreflights(resolvedOptions),

      safelist: meta.safelist,

      variants: meta.variants,

      layers: meta.layers,
    };
  },
);

// Testing out changesets 1
