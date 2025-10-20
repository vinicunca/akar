// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

import { BRANDS } from './constant';

export const buttonTheme = {
  slots: {
    base: 'font-medium rounded-md inline-flex transition-colors-280 items-center aria-disabled:(opacity-75 cursor-not-allowed) disabled:(opacity-75 cursor-not-allowed)',
    label: 'truncate',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    trailingIcon: 'shrink-0',
  },
  variants: {
    fieldGroup: {
      horizontal: 'first:not-[*:only-child]:rounded-e-none last:not-[*:only-child]:rounded-s-none not-last:not-first:rounded-none focus-visible:z-1',
      vertical: 'first:not-[*:only-child]:rounded-b-none last:not-[*:only-child]:rounded-t-none not-last:not-first:rounded-none focus-visible:z-1',
    },
    size: {
      xs: {
        base: 'px-2 py-1 text-xs gap-1',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
      },
      sm: {
        base: 'px-2.5 py-1.5 text-xs gap-1.5',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
      },
      md: {
        base: 'px-2.5 py-1.5 text-sm gap-1.5',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
      },
      lg: {
        base: 'px-3 py-2 text-sm gap-2',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
      },
      xl: {
        base: 'px-3 py-2 text-base gap-2',
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs',
        trailingIcon: 'size-6',
      },
    },
    block: {
      true: {
        base: 'w-full justify-center',
        trailingIcon: 'ms-auto',
      },
    },
  },
  compoundVariants: [
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'solid',
      class: `color-text-inverted bg-${color} hover:bg-${color}/75 active:bg-${color}-800 disabled:bg-${color} aria-disabled:bg-${color} shadow-md focus-visible:(outline-2 outline-offset-2) focus-visible:outline-${color} dark:active:bg-${color}-300`,
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'outline',
      class: `ring ring-inset ring-${color}/50 color-${color} hover:bg-${color}/10 active:(bg-primary-500 color-white) disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-${color} dark:active:bg-${color}-300 dark:active:color-text-inverted`,
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'soft',
      class: `color-${color} bg-${color}/10 hover:bg-${color}/15 active:bg-${color}-200 focus:outline-none focus-visible:bg-${color}/15 disabled:bg-${color}/10 aria-disabled:bg-${color}/10 dark:active:bg-${color}-300 dark:active:color-text-inverted`,
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'subtle',
      class: `color-${color} ring ring-inset ring-${color}/25 active:bg-${color}-200 bg-${color}/10 hover:bg-${color}/15 disabled:bg-${color}/10 aria-disabled:bg-${color}/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-${color} dark:active:bg-${color}-300 dark:active:color-text-inverted`,
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'ghost',
      class: `color-${color} hover:bg-${color}/10 active:bg-${color}-200 focus:outline-none focus-visible:bg-${color}/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent dark:active:bg-${color}-300 dark:active:color-text-inverted`,
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'link',
      class: `color-${color} hover:color-${color}/75 active:color-${color}-800 disabled:color-${color} aria-disabled:color-${color} focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-${color} dark:active:color-${color}-400`,
    })),
    {
      color: 'neutral',
      variant: 'solid',
      class: 'color-text-inverted bg-background-inverted shadow-md focus-visible:(outline-2 outline-outline-inverted outline-offset-2) active:bg-background-inverted/60 aria-disabled:bg-background-inverted/70 disabled:bg-background-inverted/70 hover:bg-background-inverted/80',
    },
    {
      color: 'neutral',
      variant: 'outline',
      class: 'ring ring-inset ring-ring-accented color-text bg-background hover:bg-background-elevated active:bg-background-accented disabled:bg-background aria-disabled:bg-background focus:outline-none focus-visible:(ring-2 ring-ring-inverted)',
    },
    {
      color: 'neutral',
      variant: 'soft',
      class: 'color-text bg-background-elevated hover:bg-background-accented/75 active:bg-background-accented focus:outline-none focus-visible:bg-background-accented/75 disabled:bg-background-elevated aria-disabled:bg-background-elevated',
    },
    {
      color: 'neutral',
      variant: 'subtle',
      class: 'ring ring-inset ring-ring-accented color-text bg-background-elevated hover:bg-background-accented/75 active:bg-background-accented disabled:bg-background-elevated aria-disabled:bg-background-elevated focus:outline-none focus-visible:(ring-2 ring-ring-inverted)',
    },
    {
      color: 'neutral',
      variant: 'ghost',
      class: 'color-text hover:bg-background-elevated active:bg-background-accented focus:outline-none focus-visible:bg-background-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent',
    },
    {
      color: 'neutral',
      variant: 'link',
      class: 'color-text-muted hover:color-text active:color-text-toned disabled:color-text-muted aria-disabled:color-text-muted focus:outline-none focus-visible:(ring-inset ring-2 ring-ring-inverted)',
    },
    {
      size: 'xs',
      square: true,
      class: 'akar:p-1',
    },
    {
      size: 'sm',
      square: true,
      class: 'akar:p-1.5',
    },
    {
      size: 'md',
      square: true,
      class: 'akar:p-1.5',
    },
    {
      size: 'lg',
      square: true,
      class: 'akar:p-2',
    },
    {
      size: 'xl',
      square: true,
      class: 'akar:p-2',
    },
    {
      loading: true,
      leading: true,
      class: {
        leadingIcon: 'animate-spin',
      },
    },
    {
      loading: true,
      leading: false,
      trailing: true,
      class: {
        trailingIcon: 'animate-spin',
      },
    },
  ],
} satisfies UvConfig<typeof pohon>['button'];
