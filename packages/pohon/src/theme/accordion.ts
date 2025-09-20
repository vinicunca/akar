export const accordionTheme = {
  slots: {
    root: '',
    item: '',
    header: '',
    trigger: '',
    content: '',
    body: '',
    leadingIcon: '',
    trailingIcon: '',
    label: '',
  },
  variants: {
    disabled: {
      true: {
        trigger: '',
      },
    },
  },
};

export type AccordionTheme = typeof accordionTheme;
