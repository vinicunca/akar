import type { PohonModuleOptions } from '../module';
import { defuFn } from 'defu';
import select from './select';

export function selectMenuTheme(options: Required<PohonModuleOptions>) {
  return defuFn(
    {
      slots: {
        input: '',
        focusScope: '',
        content: '',
      },
    },
    select(options),
  );
};

export type SelectMenuTheme = ReturnType<typeof selectMenuTheme>;
