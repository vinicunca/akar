import type { PohonModuleOptions } from '../module';

export function fileUploadTheme(options: Required<PohonModuleOptions>) {
  return {
    slots: {
      root: '',
      base: '',
      wrapper: '',
      icon: '',
      avatar: '',
      label: '',
      description: '',
      actions: '',
      files: '',
      file: '',
      fileLeadingAvatar: '',
      fileWrapper: '',
      fileName: '',
      fileSize: '',
      fileTrailingButton: '',
    },
    variants: {
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [color, ''])),
        neutral: '',
      },
      variant: {
        area: {
          wrapper: '',
          base: '',
        },
        button: {
        },
      },
      size: {
        xs: {
          base: '',
          icon: '',
          file: '',
          fileWrapper: '',
        },
        sm: {
          base: '',
          icon: '',
          file: '',
          fileWrapper: '',
        },
        md: {
          base: '',
          icon: '',
          file: '',
        },
        lg: {
          base: '',
          icon: '',
          file: '',
          fileSize: '',
        },
        xl: {
          base: '',
          icon: '',
          file: '',
        },
      },
      layout: {
        list: {
          root: '',
          files: '',
          file: '',
          fileTrailingButton: '',
        },
        grid: {
          fileWrapper: '',
          fileLeadingAvatar: '',
          fileTrailingButton: '',
        },
      },
      position: {
        inside: '',
        outside: '',
      },
      dropzone: {
        true: '',
      },
      interactive: {
        true: '',
      },
      highlight: {
        true: '',
      },
      multiple: {
        true: '',
      },
      disabled: {
        true: '',
      },
    },
  };
}

export type FileUploadTheme = ReturnType<typeof fileUploadTheme>;
