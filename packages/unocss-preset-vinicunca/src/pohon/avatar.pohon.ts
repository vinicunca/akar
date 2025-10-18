import { defuFn } from 'defu';

export function getAvatarTheme(
  configs: any = {},
) {
  return {
    avatar: defuFn(
      configs.avatar ?? {},
      {
        slots: {
          root: 'inline-flex items-center justify-center shrink-0 select-none rounded-full align-middle bg-background-elevated',
          image: 'h-full w-full rounded-inherit object-cover',
          fallback: 'font-medium leading-none color-text-muted truncate',
          icon: 'color-text-muted shrink-0',
        },
        variants: {
          size: {
            '3xs': {
              root: 'size-4 text-[8px]',
            },
            '2xs': {
              root: 'size-5 text-[10px]',
            },
            'xs': {
              root: 'size-6 text-xs',
            },
            'sm': {
              root: 'size-7 text-sm',
            },
            'md': {
              root: 'size-8 text-base',
            },
            'lg': {
              root: 'size-9 text-lg',
            },
            'xl': {
              root: 'size-10 text-xl',
            },
            '2xl': {
              root: 'size-11 text-[22px]',
            },
            '3xl': {
              root: 'size-12 text-2xl',
            },
          },
        },
      },
    ),
    avatarGroup: defuFn(
      configs.avatarGroup ?? {},
      {
        slots: {
          root: 'inline-flex flex-row-reverse justify-end',
          base: 'relative rounded-full ring-ring-bg first:me-0',
        },
        variants: {
          size: {
            '3xs': {
              base: 'ring -me-0.5',
            },
            '2xs': {
              base: 'ring -me-0.5',
            },
            'xs': {
              base: 'ring -me-0.5',
            },
            'sm': {
              base: 'ring-2 -me-1.5',
            },
            'md': {
              base: 'ring-2 -me-1.5',
            },
            'lg': {
              base: 'ring-2 -me-1.5',
            },
            'xl': {
              base: 'ring-3 -me-2',
            },
            '2xl': {
              base: 'ring-3 -me-2',
            },
            '3xl': {
              base: 'ring-3 -me-2',
            },
          },
        },
      },
    ),
  };
}
