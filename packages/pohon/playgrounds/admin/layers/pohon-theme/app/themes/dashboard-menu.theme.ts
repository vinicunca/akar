// @unocss-include

import type { PThemeDashboardMenu } from 'pohon-ui';
import { BRANDS } from './constant';

export const dashboardMenuTheme = {
  slots: {
    root: 'relative flex flex-col gap-1.5 [&>div]:min-w-0',
    list: 'isolate min-w-0',
    label: 'w-full flex items-center gap-1.5 font-semibold text-xs/5 color-text-highlighted px-2.5 py-1.5',
    item: 'min-w-0 px-2 group/menu-item',
    link: 'group relative w-full flex items-center gap-1.5 font-medium text-sm flex-row px-2.5 py-1.5 h-10 before:(absolute content-empty -z-1 rounded-md inset-y-px inset-x-0) focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
    linkLeadingIcon: 'shrink-0 size-5',
    linkLeadingAvatar: 'shrink-0',
    linkLeadingAvatarSize: '2xs',
    linkTrailing: 'group ms-auto inline-flex gap-1.5 items-center',
    linkTrailingBadge: 'shrink-0',
    linkTrailingBadgeSize: 'sm',
    linkTrailingIcon: 'size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform-280',
    linkLabel: 'truncate',
    linkLabelExternalIcon: 'inline-block size-3 align-top color-text-dimmed',
    childList: 'isolate',
    childLink: 'group relative size-full flex items-start text-start text-sm before:(content-empty absolute -z-1 rounded-md inset-y-px inset-x-0) focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 p-1.5 gap-1.5',
    childLinkWrapper: 'min-w-0',
    childLinkIcon: 'size-5 shrink-0',
    childLinkLabel: 'truncate',
    childLinkLabelExternalIcon: 'inline-block size-3 align-top color-text-dimmed',
    childLinkDescription: 'color-text-muted',
    separator: 'px-2 h-px bg-border',
  },

  variants: {
    color: {
      ...Object.fromEntries(
        BRANDS.map((color) => [
          color,
          {
            link: `focus-visible:before:ring-${color}`,
            childLink: `focus-visible:before:ring-${color}`,
          },
        ]),
      ),
      neutral: {
        link: 'focus-visible:before:ring-ring-inverted',
        childLink: 'focus-visible:before:ring-ring-inverted',
      },
    },
    active: {
      true: {
        childLink: 'before:bg-background-elevated color-text-highlighted',
        childLinkIcon: 'color-text',
      },
      false: {
        link: 'color-text-muted',
        linkLeadingIcon: 'color-text-dimmed',
        childLink: 'hover:before:bg-background-elevated/50 color-text hover:color-text-highlighted transition-colors-280 before:transition-colors-280',
        childLinkIcon: 'color-text-dimmed group-hover:color-text transition-colors-280',
      },
    },
    disabled: {
      true: {
        link: 'cursor-not-allowed opacity-75',
      },
    },
  },

  compoundVariants: [
    {
      collapsed: false,
      class: {
        childList: 'ms-5 border-s border-border',
        childItem: 'ps-1.5 -ms-px',
        content: 'data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden',
        link: 'text-left',
      },
    },
    {
      collapsed: true,
      class: {
        link: 'akar:(px-1.5) justify-center',
        linkLabel: 'hidden',
        linkTrailing: 'hidden',
        content: 'shadow-sm rounded-sm min-h-6 p-1',
      },
    },
    {
      highlight: true,
      level: true,
      class: {
        link: 'after:(content-empty absolute -start-1.5 inset-y-0.5 block w-px rounded-full transition-colors-280) text-left',
      },
    },
    {
      disabled: false,
      active: false,
      variant: 'pill',
      class: {
        // link: 'group-has-[[data-active]]/menu-item:color-primary hover:color-text-highlighted hover:before:bg-background-elevated/50 transition-colors-280 before:transition-colors-280',
        link: 'data-[state=open]:group-has-[[data-active]]/menu-item:color-primary hover:color-text-highlighted hover:before:bg-background-elevated/50 transition-colors-280 before:transition-colors-280',
        linkLeadingIcon: 'group-data-[state=open]:group-has-[[data-active]]/menu-item:color-primary group-hover:color-text transition-colors-280',
      },
    },
    {
      disabled: false,
      active: false,
      variant: 'pill',
      oke: true,
      class: {
        link: 'group-has-[[data-active]]/menu-item:color-primary',
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
      variant: 'pill',
      active: true,
      highlight: false,
      class: {
        link: 'before:bg-background-elevated',
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
        link: 'hover:color-text-highlighted transition-colors-280',
        linkLeadingIcon: 'group-hover:color-text transition-colors-280',
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
    {
      color: 'neutral',
      variant: 'link',
      active: true,
      class: {
        link: 'color-text-highlighted',
        linkLeadingIcon: 'color-text-highlighted group-data-[state=open]:color-text-highlighted',
      },
    },
    ...BRANDS.map((color) => ({
      highlightColor: color,
      highlight: true,
      level: true,
      active: true,
      class: {
        link: `after:bg-${color}`,
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
