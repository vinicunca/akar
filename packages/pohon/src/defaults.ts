import { pick } from '@vinicunca/perkakas';
import icons from './theme/icons';

export const DEFAULT_OPTIONS = {
  prefix: 'P',
  theme: {
    colors: undefined,
  },
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
        primary: 'green',
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
