import { pick } from '@vinicunca/perkakas';
import icons from './theme/icons';

export const DEFAULT_OPTIONS = {
  prefix: 'P',
  fonts: true,
  colorMode: true,
  theme: {
    colors: undefined,
  },
  mdc: false,
  content: false,
};

export function resolveColors(colors?: Array<string>) {
  return colors?.length
    ? [...new Set(['primary', ...colors])]
    : ['primary', 'secondary', 'success', 'info', 'warning', 'error'];
}

export function getDefaultPohonConfig(colors?: Array<string>) {
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
      [...(colors || []), 'neutral' as any],
    ),
    icons,
  };
}
