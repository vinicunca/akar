// @unocss-include

import type { PThemeAccordion } from 'pohon-ui';

export const accordionTheme = {
  slots: {
    root: 'w-full rounded-md px-4 bg-background',
    item: 'border-b border-border last:border-b-0',
    header: 'flex',
    trigger: 'group text-sm font-medium py-3.5 flex flex-1 gap-1.5 min-w-0 items-center focus-visible:outline-primary',
    content: 'overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
    body: 'text-sm color-text-muted pb-4 pt-1',
    leadingIcon: 'shrink-0 size-5',
    trailingIcon: 'shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform-280',
    label: 'text-start break-words',
  },
  variants: {
    disabled: {
      true: {
        trigger: 'cursor-not-allowed opacity-50',
      },
    },
  },
} satisfies PThemeAccordion;
