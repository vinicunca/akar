import type { PohonModuleOptions } from '../module';

export function kbdTheme(options: Required<PohonModuleOptions>) {
  return {
    base: 'inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans',
    variants: {
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [color, ''])),
        neutral: '',
      },
      variant: {
        solid: '',
        outline: '',
        soft: '',
        subtle: '',
      },
      size: {
        sm: 'h-4 min-w-[16px] text-[10px]',
        md: 'h-5 min-w-[20px] text-[11px]',
        lg: 'h-6 min-w-[24px] text-[12px]',
      },
    },
  };
}

export type KbdTheme = ReturnType<typeof kbdTheme>;
