// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

export const accordionTheme = {
  slots: {
    root: 'w-full',
    item: 'border-b border-border last:border-b-0',
    header: 'flex',
    trigger: 'group flex-1 flex items-center gap-1.5 font-medium text-sm py-3.5 focus-visible:outline-primary min-w-0',
    content: 'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden focus:outline-none',
    body: 'text-sm pb-3.5',
    leadingIcon: 'shrink-0 size-5',
    trailingIcon: 'shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200',
    label: 'text-start break-words',
  },
  variants: {
    disabled: {
      true: {
        trigger: 'cursor-not-allowed opacity-75',
      },
    },
  },
} satisfies UvConfig<typeof pohon>['accordion'];
