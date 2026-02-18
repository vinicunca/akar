import type { PohonModuleOptions } from '../module';
import { defuFn } from 'defu';
import { fieldGroupVariant } from './field-group';
import input from './input';

export default (options: Required<PohonModuleOptions>) => {
  return defuFn(
    {
      slots: {
        root: '',
        base: '',
        value: '',
        placeholder: '',
        arrow: '',
        content: '',
        viewport: '',
        group: '',
        empty: '',
        label: '',
        separator: '',
        item: '',
        itemLeadingIcon: '',
        itemLeadingAvatar: '',
        itemLeadingAvatarSize: '',
        itemLeadingChip: '',
        itemLeadingChipSize: '',
        itemTrailing: '',
        itemTrailingIcon: '',
        itemWrapper: '',
        itemLabel: '',
        itemDescription: '',
      },

      variants: {
        ...fieldGroupVariant,

        variant: (prev: Record<string, string>) => ({
          ...prev,
          outline: [prev.outline, ''].join(' '),
          subtle: [prev.subtle, ''].join(' '),
        }),

        size: {
          xs: {
            label: '',
            item: '',
            itemLeadingIcon: '',
            itemLeadingAvatarSize: '',
            itemLeadingChip: '',
            itemLeadingChipSize: '',
            itemTrailingIcon: '',
            empty: '',
          },
          sm: {
            label: '',
            item: '',
            itemLeadingIcon: '',
            itemLeadingAvatarSize: '',
            itemLeadingChip: '',
            itemLeadingChipSize: '',
            itemTrailingIcon: '',
            empty: '',
          },
          md: {
            label: '',
            item: '',
            itemLeadingIcon: '',
            itemLeadingAvatarSize: '',
            itemLeadingChip: '',
            itemLeadingChipSize: '',
            itemTrailingIcon: '',
            empty: '',
          },
          lg: {
            label: '',
            item: '',
            itemLeadingIcon: '',
            itemLeadingAvatarSize: '',
            itemLeadingChip: '',
            itemLeadingChipSize: '',
            itemTrailingIcon: '',
            empty: '',
          },
          xl: {
            label: '',
            item: '',
            itemLeadingIcon: '',
            itemLeadingAvatarSize: '',
            itemLeadingChip: '',
            itemLeadingChipSize: '',
            itemTrailingIcon: '',
            empty: '',
          },
        },
      },

      compoundVariants: [],

    },
    input(options),
  );
};
