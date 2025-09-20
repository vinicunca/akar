import type { PohonModuleOptions } from '../module';
import { defuFn } from 'defu';
import { inputTheme } from './input';

export function inputTagsTheme(options: Required<PohonModuleOptions>) {
  return defuFn(
    {
      slots: {
        root: '',
        base: '',
        item: '',
        itemText: '',
        itemDelete: '',
        itemDeleteIcon: '',
        input: '',
      },
      variants: {
        size: {
          xs: {
            item: '',
            itemDeleteIcon: '',
          },
          sm: {
            item: '',
            itemDeleteIcon: '',
          },
          md: {
            item: '',
            itemDeleteIcon: '',
          },
          lg: {
            item: '',
            itemDeleteIcon: '',
          },
          xl: {
            item: '',
            itemDeleteIcon: '',
          },
        },
        variant: (prev: Record<string, string>) => Object.fromEntries(
          Object.entries(prev).map(([key]) => [key, '']),
        ),
      },
    },
    inputTheme(options),
  );
};

export type InputTagsTheme = ReturnType<typeof inputTagsTheme>;
