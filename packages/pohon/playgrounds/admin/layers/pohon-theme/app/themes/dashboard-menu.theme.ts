// @unocss-include

import type { PThemeDashboardMenu } from 'pohon-ui';
import { BRANDS } from './constant';

export const dashboardMenuTheme = {
  slots: {
    content: 'data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden focus:outline-none',
    list: 'isolate',
    listWithChildren: 'ms-5 border-s border-border',
    itemWithChildren: 'flex flex-col data-[state=open]:mb-1.5',
    link: 'group text-sm font-500 px-2.5 py-1.5 flex gap-1.5 w-full h-38px items-center relative focus-visible:outline-none focus:outline-none before:(content-empty rounded-md inset-x-0 inset-y-px absolute -z-1) focus-visible:before:ring-2 focus-visible:before:ring-inset',
    linkLeadingIcon: 'shrink-0 size-5',
    linkTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    linkTrailingBadge: 'shrink-0 akar:rounded-full',
    linkTrailingBadgeSize: 'sm',
    linkTrailingIcon: 'size-5 transform transition-transform-200 shrink-0 group-data-[state=open]:rotate-180',
    linkTitle: 'truncate',
    linkTitleExternalIcon: 'size-3 align-top color-text-dimmed',
  },
  variants: {
    color: {
      ...Object.fromEntries(BRANDS.map((color) => [
        color,
        {
          trigger: `focus-visible:ring-${color}`,
          link: `focus-visible:before:ring-${color}`,
        },
      ])),
      neutral: {
        trigger: 'focus-visible:ring-ring-inverted',
        link: 'focus-visible:before:ring-ring-inverted',
      },
    },
    active: {
      true: {
        link: 'font-600',
      },
      false: {
        link: 'color-text-muted',
        linkLeadingIcon: 'color-text-dimmed',
      },
    },
    childActive: {
      true: {
        link: 'font-600',
      },
    },
    disabled: {
      true: {
        trigger: 'data-[state=open]:color-text-highlighted',
      },
    },
    level: {
      true: {
        item: 'ps-1.5 -ms-px',
        itemWithChildren: 'ps-1.5 -ms-px',
      },
    },
    collapsed: {
      true: {
        item: 'py-1',
        link: 'justify-center items-center',
      },
    },
  },
  compoundVariants: [
    {
      collapsed: true,
      childActive: true,
      class: {
        link: 'before:bg-primary/20',
      },
    },
    {
      highlight: true,
      level: true,
      class: {
        link: 'after:(content-empty rounded-full w-px block transition-colors-280 inset-y-0.5 absolute -left-1.5)',
      },
    },
    {
      disabled: false,
      active: false,
      variant: 'pill',
      class: {
        link: 'hover:color-text-highlighted hover:before:bg-background-elevated/70 data-[state=open]:color-text-highlighted transition-colors-280 before:transition-colors-280',
        linkLeadingIcon: 'group-hover:color-text group-data-[state=open]:color-text transition-colors-280',
      },
    },

    ...BRANDS.map((color) => ({
      color,
      variant: 'pill',
      active: true,
      class: {
        link: `color-${color}`,
        linkLeadingIcon: `color-${color} group-data-[state=open]:color-${color}`,
      },
    })),

    ...BRANDS.map((color) => ({
      color,
      variant: 'pill',
      childActive: true,
      active: false,
      class: {
        link: `akar:color-${color} akar:hover:before:bg-red`,
        linkLeadingIcon: `akar:color-${color} akar:group-data-[state=open]:color-${color}`,
      },
    })),
    {
      color: 'neutral',
      variant: 'pill',
      active: true,
      class: {
        link: 'color-text-highlighted',
        linkLeadingIcon: 'color-text-highlighted group-data-[state=open]:color-text-highlighted',
      },
    },
    {
      color: 'neutral',
      variant: 'pill',
      childActive: true,
      class: {
        link: 'color-text-highlighted',
        linkLeadingIcon: 'color-text-highlighted group-data-[state=open]:color-text-highlighted',
      },
    },
    {
      variant: 'pill',
      active: true,
      highlight: false,
      collapsed: false,
      class: {
        link: 'before:bg-background-elevated',
      },
    },
    {
      variant: 'pill',
      active: true,
      highlight: false,
      collapsed: true,
      class: {
        link: 'before:bg-primary/20',
      },
    },
    {
      variant: 'pill',
      active: true,
      highlight: true,
      disabled: false,
      class: {
        link: 'hover:before:bg-background-elevated/50 before:transition-colors-280',
      },
    },
    {
      disabled: false,
      active: false,
      variant: 'link',
      class: {
        link: 'hover:color-text-highlighted data-[state=open]:color-text-highlighted transition-colors-280',
        linkLeadingIcon: 'group-hover:color-text group-data-[state=open]:color-text transition-colors-280',
      },
    },
    ...BRANDS.map((color) => ({
      color,
      variant: 'link',
      active: true,
      class: {
        link: `color-${color}`,
        linkLeadingIcon: `color-${color} group-data-[state=open]:color-${color}`,
      },
    })),
    ...BRANDS.map((color) => ({
      color,
      variant: 'link',
      childActive: true,
      class: {
        link: `color-${color}`,
        linkLeadingIcon: `color-${color} group-data-[state=open]:color-${color}`,
      },
    })),
    {
      color: 'neutral',
      variant: 'link',
      active: true,
      class: {
        link: 'color-text-highlighted',
        linkLeadingIcon: 'color-text-highlighted group-data-[state=open]:color-text-highlighted',
      },
    },
    {
      color: 'neutral',
      variant: 'link',
      childActive: true,
      class: {
        link: 'color-text-highlighted',
        linkLeadingIcon: 'color-text-highlighted group-data-[state=open]:color-text-highlighted',
      },
    },
    ...BRANDS.map((highlightColor) => ({
      highlightColor,
      highlight: true,
      level: true,
      active: true,
      class: {
        link: `after:bg-${highlightColor}`,
      },
    })),
    {
      highlightColor: 'neutral',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-background-inverted',
      },
    },
  ],
} satisfies PThemeDashboardMenu;
