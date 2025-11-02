// @unocss-include

import type { PThemeKbd } from 'pohon-ui';
import { BRANDS } from './constant';

export const kbdTheme = {
  base: 'inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans py-0.5',
  variants: {
    size: {
      sm: 'h-4 min-w-[16px] text-[10px]',
      md: 'h-5 min-w-[20px] text-[11px]',
      lg: 'h-6 min-w-[24px] text-[12px]',
    },
  },
  compoundVariants: [
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'solid',
      class: `color-text-inverted bg-${color}`,
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'outline',
      class: `ring ring-inset ring-${color}/50 color-${color}`,
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'soft',
      class: `color-${color} bg-${color}/10`,
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'subtle',
      class: `color-${color} ring ring-inset ring-${color}/25 bg-${color}/10`,
    })),
    {
      color: 'neutral',
      variant: 'solid',
      class: 'color-text-inverted bg-background-inverted',
    },
    {
      color: 'neutral',
      variant: 'outline',
      class: 'shadow-[0_0_0_1px_rgba(28,25,23,10%),0_3px_0_rgba(28,25,23,10%)] color-text bg-background',
    },
    {
      color: 'neutral',
      variant: 'soft',
      class: 'color-text bg-background-elevated',
    },
    {
      color: 'neutral',
      variant: 'subtle',
      class: 'ring ring-inset ring-ring-accented color-text bg-background-elevated',
    },
  ],
} satisfies PThemeKbd;
