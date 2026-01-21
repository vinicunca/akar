import type { PohonModuleOptions } from '../module';
import { pick } from '@vinicunca/perkakas';
import icons from '../theme/icons';

export function resolveColors(colors?: Array<string>) {
  return colors?.length
    ? [...new Set(['primary', ...colors])]
    : ['primary', 'secondary', 'success', 'info', 'warning', 'error'];
}

export function getDefaultPohonConfig(theme?: PohonModuleOptions['theme']) {
  return {
    colors: pick(
      {
        primary: 'violet',
        secondary: 'blue',
        success: 'green',
        info: 'blue',
        warning: 'yellow',
        error: 'red',
        neutral: 'slate',
      },
      [...(theme?.colors || []), 'neutral' as any],
    ),
    icons,
  };
}

export const DEFAULT_OPTIONS = {
  prefix: 'P',
  fonts: true,
  colorMode: true,
  theme: {
    colors: undefined,
    defaultVariants: {
      color: undefined,
      size: undefined,
    },
  },
  mdc: false,
  content: false,
};
