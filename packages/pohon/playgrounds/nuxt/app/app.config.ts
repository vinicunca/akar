import { defu, defuFn } from 'defu';

const inputTheme = {
  variants: {
    size: {
      md: {
        base: 'px-2.5 py-1.5 text-sm gap-1.52',
        leading: 'ps-2.5',
        trailing: 'pe-2.5',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
      },
    },
  },
};

const selectTheme = defuFn(
  {},
  inputTheme,
);

export default defineAppConfig({
  toaster: {
    position: 'bottom-right' as const,
    expand: true,
    duration: 5000,
  },
  pohon: {
    colors: {
      primary: 'green',
      neutral: 'slate',
    },
    input: inputTheme,
    select: selectTheme,
  },
});
