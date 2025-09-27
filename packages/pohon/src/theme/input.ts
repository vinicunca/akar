import type { PohonModuleOptions } from '../module';
import { fieldGroupVariantWithRoot } from './field-group';

export default (options: Required<PohonModuleOptions>) => {
  return {
    slots: {
      root: '',
      base: '',
      leading: '',
      leadingIcon: '',
      leadingAvatar: '',
      leadingAvatarSize: '',
      trailing: '',
      trailingIcon: '',
    },

    variants: {
      ...fieldGroupVariantWithRoot,
      size: {
        xs: {
          base: '',
          leading: '',
          trailing: '',
          leadingIcon: '',
          leadingAvatarSize: '',
          trailingIcon: '',
        },
        sm: {
          base: '',
          leading: '',
          trailing: '',
          leadingIcon: '',
          leadingAvatarSize: '',
          trailingIcon: '',
        },
        md: {
          base: '',
          leading: '',
          trailing: '',
          leadingIcon: '',
          leadingAvatarSize: '',
          trailingIcon: '',
        },
        lg: {
          base: '',
          leading: '',
          trailing: '',
          leadingIcon: '',
          leadingAvatarSize: '',
          trailingIcon: '',
        },
        xl: {
          base: '',
          leading: '',
          trailing: '',
          leadingIcon: '',
          leadingAvatarSize: '',
          trailingIcon: '',
        },
      },
      variant: {
        outline: '',
        soft: '',
        subtle: '',
        ghost: '',
        none: '',
      },
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [color, ''])),
        neutral: '',
      },
      leading: {
        true: '',
      },
      trailing: {
        true: '',
      },
      loading: {
        true: '',
      },
      highlight: {
        true: '',
      },
      type: {
        file: '',
      },
    },

    compoundVariants: [],

    defaultVariants: {
      size: 'md',
      color: 'primary',
      variant: 'outline',
    },
  };
};
