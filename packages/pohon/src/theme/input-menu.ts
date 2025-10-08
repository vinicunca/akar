import type { PohonModuleOptions } from '../module';
import { defuFn } from 'defu';
import input from './input';

export default (options: Required<PohonModuleOptions>) => {
  return defuFn(
    {
      slots: {
        base: '',
        trailing: '',
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
        itemLabel: '',
        tagsItem: '',
        tagsItemText: '',
        tagsItemDelete: '',
        tagsItemDeleteIcon: '',
        tagsInput: '',
      },

      variants: {
        virtualize: {
          true: {
            viewport: '',
          },
          false: {
            viewport: '',
          },
        },
        multiple: {
          true: {
            root: '',
          },
          false: {
            base: '',
          },
        },
        size: {
          xs: {
            label: '',
            item: '',
            itemLeadingIcon: '',
            itemLeadingAvatarSize: '',
            itemLeadingChip: '',
            itemLeadingChipSize: '',
            itemTrailingIcon: '',
            tagsItem: '',
            tagsItemDeleteIcon: '',
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
            tagsItem: '',
            tagsItemDeleteIcon: '',
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
            tagsItem: '',
            tagsItemDeleteIcon: '',
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
            tagsItem: '',
            tagsItemDeleteIcon: '',
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
            tagsItem: '',
            tagsItemDeleteIcon: '',
            empty: '',
          },
        },
      },

      compoundVariants: [],
    },
    input(options),
  );
};
