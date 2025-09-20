import type { PohonModuleOptions } from '../module';
import { defu } from 'defu';
import { inputTheme } from './input';

export function textareaTheme(options: Required<PohonModuleOptions>) {
  return defu(
    {
      slots: {
        leading: '',
        trailing: '',
      },
      variants: {
        autoresize: {
          true: {
            base: '',
          },
        },
        size: {
          xs: {
            leading: '',
            trailing: '',
          },
          sm: {
            leading: '',
            trailing: '',
          },
          md: {
            leading: '',
            trailing: '',
          },
          lg: {
            leading: '',
            trailing: '',
          },
          xl: {
            leading: '',
            trailing: '',
          },
        },
      },
    },
    inputTheme(options),
  );
};

export type TextareaTheme = ReturnType<typeof textareaTheme>;
