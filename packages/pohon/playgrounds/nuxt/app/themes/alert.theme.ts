// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

import { BRANDS } from './constant';

export const alertTheme = {
  slots: {
    root: 'relative overflow-hidden w-full rounded-lg p-4 flex gap-2.5',
    wrapper: 'min-w-0 flex-1 flex flex-col',
    title: 'text-sm font-medium',
    description: 'text-sm opacity-90',
    icon: 'shrink-0 size-5',
    avatar: 'shrink-0',
    avatarSize: '2xl',
    actions: 'flex flex-wrap gap-1.5 shrink-0',
    close: 'p-0',
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'items-center',
        actions: 'items-center',
      },
      vertical: {
        root: 'items-start',
        actions: 'items-start mt-2.5',
      },
    },
    title: {
      true: {
        description: 'mt-1',
      },
    },
  },
  compoundVariants: [
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'solid',
      class: {
        root: `bg-${color} color-text-inverted`,
      },
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'outline',
      class: {
        root: `color-${color} ring ring-inset ring-${color}/25`,
      },
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'soft',
      class: {
        root: `bg-${color}/10 color-${color}`,
      },
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'subtle',
      class: {
        root: `bg-${color}/10 color-${color} ring ring-inset ring-${color}/25`,
      },
    })),
    {
      color: 'neutral',
      variant: 'solid',
      class: {
        root: 'color-text-inverted bg-background-inverted',
      },
    },
    {
      color: 'neutral',
      variant: 'outline',
      class: {
        root: 'color-text-highlighted bg-background ring ring-inset ring-ring',
      },
    },
    {
      color: 'neutral',
      variant: 'soft',
      class: {
        root: 'color-text-highlighted bg-background-elevated/50',
      },
    },
    {
      color: 'neutral',
      variant: 'subtle',
      class: {
        root: 'color-text-highlighted bg-background-elevated/50 ring ring-inset ring-ring-accented',
      },
    },
  ],
} satisfies UvConfig<typeof pohon>['alert'];
