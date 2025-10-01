<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    'name': 'arrow',
    'description': '<p>Display an arrow alongside the menu.</p>\n',
    'type': 'boolean | Omit<AComboboxArrowProps, \'as\' | \'asChild\'>',
    'required': false
  },
  {
    'name': 'color',
    'description': '',
    'type': '\'error\' | \'primary\' | \'secondary\' | \'success\' | \'info\' | \'warning\' | \'neutral\'',
    'required': false
  },
  {
    'name': 'content',
    'description': '<p>The content of the menu.</p>\n',
    'type': '(Omit<AComboboxContentProps, \'as\' | \'asChild\' | \'forceMount\'> & Partial<EmitsToProps<DismissableLayerEmits>>)',
    'required': false
  },
  {
    'name': 'disabled',
    'description': '<p>When <code>true</code>, prevents the user from interacting with listbox</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'locales',
    'description': '',
    'type': 'PLocale<any>[]',
    'required': false
  },
  {
    'name': 'modelValue',
    'description': '',
    'type': 'string',
    'required': false
  },
  {
    'name': 'portal',
    'description': '<p>Render the menu in a portal.</p>\n',
    'type': 'string | boolean | HTMLElement',
    'required': false
  },
  {
    'name': 'selectedIcon',
    'description': '<p>The icon displayed when an item is selected.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'size',
    'description': '',
    'type': '\'md\' | \'xs\' | \'sm\' | \'lg\' | \'xl\'',
    'required': false
  },
  {
    'name': 'trailingIcon',
    'description': '<p>The icon displayed to open the menu.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'variant',
    'description': '',
    'type': '\'outline\' | \'soft\' | \'subtle\' | \'ghost\' | \'none\'',
    'required': false
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '{ root?: ClassValue; base?: ClassValue; leading?: ClassValue; leadingIcon?: ClassValue; leadingAvatar?: ClassValue; leadingAvatarSize?: ClassValue; trailing?: ClassValue; trailingIcon?: ClassValue; value?: ClassValue; placeholder?: ClassValue; arrow?: ClassValue; content?: ClassValue; viewport?: ClassValue; group?: ClassValue; empty?: ClassValue; label?: ClassValue; separator?: ClassValue; item?: ClassValue; itemLeadingIcon?: ClassValue; itemLeadingAvatar?: ClassValue; itemLeadingAvatarSize?: ClassValue; itemLeadingChip?: ClassValue; itemLeadingChipSize?: ClassValue; itemTrailing?: ClassValue; itemTrailingIcon?: ClassValue; itemLabel?: ClassValue; input?: ClassValue; focusScope?: ClassValue; }',
    'required': false
  }
]" />

<DocsEmitsTable :data="[
  {
    'name': 'update:modelValue',
    'description': '',
    'type': '[value: string]'
  }
]" />
