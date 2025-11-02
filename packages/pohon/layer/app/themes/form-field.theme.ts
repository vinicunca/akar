// @unocss-include

import type { PThemeFormField } from 'pohon-ui';

export const formFieldTheme = {
  slots: {
    labelWrapper: 'flex content-center items-center justify-between',
    label: 'block font-medium color-text',
    container: 'mt-1 relative',
    description: 'color-text-muted',
    error: 'mt-2 text-error',
    hint: 'color-text-muted',
    help: 'mt-2 color-text-muted',
  },
  variants: {
    size: {
      xs: { root: 'text-xs' },
      sm: { root: 'text-xs' },
      md: { root: 'text-sm' },
      lg: { root: 'text-sm' },
      xl: { root: 'text-base' },
    },
    required: {
      true: {
        label: 'after:(content-[\'*\'] ms-0.5 text-error)',
      },
    },
  },
} satisfies PThemeFormField;
