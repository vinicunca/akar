import type { PohonModuleOptions } from '../../module';

export default (options: Required<PohonModuleOptions>) => ({
  base: '',
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
  },
  defaultVariants: {
    color: 'neutral',
  },
});
