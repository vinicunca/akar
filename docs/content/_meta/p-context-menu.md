<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    'name': 'checkedIcon',
    'description': '<p>The icon displayed when an item is checked.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'content',
    'description': '<p>The content of the menu.</p>\n',
    'type': '(Omit<AContextMenuContentProps, \'as\' | \'asChild\' | \'forceMount\'> & Partial<EmitsToProps<AMenuContentEmits>>)',
    'required': false
  },
  {
    'name': 'disabled',
    'description': '',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'externalIcon',
    'description': '<p>The icon displayed when the item is an external link.\nSet to <code>false</code> to hide the external icon.</p>\n',
    'type': 'string | boolean | object',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'items',
    'description': '',
    'type': 'ArrayOrNested<PContextMenuItem>',
    'required': false
  },
  {
    'name': 'labelKey',
    'description': '<p>The key used to get the label from the item.</p>\n',
    'type': 'string | number',
    'required': false,
    'default': '\'label\''
  },
  {
    'name': 'loadingIcon',
    'description': '<p>The icon displayed when an item is loading.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'modal',
    'description': '<p>The modality of the dropdown menu.</p>\n<p>When set to <code>true</code>, interaction with outside elements will be disabled and only menu content will be visible to screen readers.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'portal',
    'description': '<p>Render the menu in a portal.</p>\n',
    'type': 'string | boolean | HTMLElement',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'pressOpenDelay',
    'description': '<p>The duration from when the trigger is pressed until the menu openes.</p>\n',
    'type': 'number',
    'required': false
  },
  {
    'name': 'size',
    'description': '',
    'type': '\'md\' | \'xs\' | \'sm\' | \'lg\' | \'xl\'',
    'required': false
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '{ content?: ClassValue; viewport?: ClassValue; group?: ClassValue; label?: ClassValue; separator?: ClassValue; item?: ClassValue; itemLeadingIcon?: ClassValue; itemLeadingAvatar?: ClassValue; itemLeadingAvatarSize?: ClassValue; itemTrailing?: ClassValue; itemTrailingIcon?: ClassValue; itemTrailingKbds?: ClassValue; itemTrailingKbdsSize?: ClassValue; itemLabel?: ClassValue; itemLabelExternalIcon?: ClassValue; }',
    'required': false
  }
]" />

<DocsEmitsTable :data="[
  {
    'name': 'update:open',
    'description': '',
    'type': '[payload: boolean]'
  }
]" />

<DocsSlotsTable :data="[
  {
    'description': '',
    'type': ''
  },
  {
    'description': '',
    'type': ''
  }
]" />
