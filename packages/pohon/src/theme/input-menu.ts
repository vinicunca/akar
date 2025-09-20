import type { PohonModuleOptions } from '../module';
import { defuFn } from 'defu';
import { inputTheme } from './input';

export function inputMenuTheme(options: Required<PohonModuleOptions>) {
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
    },
    inputTheme(options),
  );
};

export type InputMenuTheme = ReturnType<typeof inputMenuTheme>;
