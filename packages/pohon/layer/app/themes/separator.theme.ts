// @unocss-include

import type { PThemeSeparator } from 'pohon-ui';
import { BRANDS } from './constant';

export const separatorTheme = {
  slots: {
    root: 'flex items-center align-middle text-center',
    container: 'font-medium color-text flex',
    icon: 'shrink-0 size-5',
    avatar: 'shrink-0',
    avatarSize: '2xs',
    label: 'text-sm',
  },
  variants: {
    color: {
      ...Object.fromEntries(BRANDS.map((color: string) => [color, { border: `border-${color}` }])),
      neutral: { border: 'border-border' },
    },
    orientation: {
      horizontal: {
        root: 'w-full flex-row',
        border: 'w-full',
        container: 'mx-3 whitespace-nowrap',
      },
      vertical: {
        root: 'h-full flex-col',
        border: 'h-full',
        container: 'my-2',
      },
    },
    type: {
      solid: {
        border: 'border-solid',
      },
      dashed: {
        border: 'border-dashed',
      },
      dotted: {
        border: 'border-dotted',
      },
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      size: 'xs',
      class: { border: 'border-t' },
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: { border: 'border-t-[2px]' },
    },
    {
      orientation: 'horizontal',
      size: 'md',
      class: { border: 'border-t-[3px]' },
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: { border: 'border-t-[4px]' },
    },
    {
      orientation: 'horizontal',
      size: 'xl',
      class: { border: 'border-t-[5px]' },
    },
    {
      orientation: 'vertical',
      size: 'xs',
      class: { border: 'border-s' },
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: { border: 'border-s-[2px]' },
    },
    {
      orientation: 'vertical',
      size: 'md',
      class: { border: 'border-s-[3px]' },
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: { border: 'border-s-[4px]' },
    },
    {
      orientation: 'vertical',
      size: 'xl',
      class: { border: 'border-s-[5px]' },
    },
  ],
} satisfies PThemeSeparator;
