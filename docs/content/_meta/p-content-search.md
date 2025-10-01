<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    'name': 'autofocus',
    'description': '<p>Automatically focus the input when component is mounted.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'close',
    'description': '<p>Display a close button in the input (useful when inside a Dialog for example).\n<code>{ size: 'md', color: 'neutral', variant: 'ghost' }</code>{lang=&quot;ts-type&quot;}</p>\n',
    'type': 'boolean | Partial<PButtonProps>',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'closeIcon',
    'description': '<p>The icon displayed in the close button.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'colorMode',
    'description': '<p>When <code>true</code>, the theme command will be added to the groups.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'content',
    'description': '<p>The content of the dialog.</p>\n',
    'type': '(Omit<ADialogContentProps, \'as\' | \'asChild\' | \'forceMount\'> & Partial<EmitsToProps<DialogContentImplEmits>>)',
    'required': false
  },
  {
    'name': 'description',
    'description': '',
    'type': 'string',
    'required': false
  },
  {
    'name': 'dismissible',
    'description': '<p>When <code>false</code>, the dialog will not close when clicking outside or pressing escape.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'files',
    'description': '',
    'type': 'PContentSearchFile[]',
    'required': false
  },
  {
    'name': 'fullscreen',
    'description': '<p>When <code>true</code>, the dialog will take up the full screen.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'fuse',
    'description': '<p>Options for <a href=\'https://vueuse.org/integrations/useFuse\'>useFuse</a> passed to the <a href=\'https://akara.vinicunca.dev/pohon/components/command-palette\'>CommandPalette</a>.</p>\n',
    'type': 'UseFuseOptions<PContentSearchLink>',
    'required': false
  },
  {
    'name': 'groups',
    'description': '<p>Custom groups displayed between navigation and color mode group.</p>\n',
    'type': 'PCommandPaletteGroup<PContentSearchItem>[]',
    'required': false
  },
  {
    'name': 'icon',
    'description': '<p>The icon displayed in the input.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'links',
    'description': '<p>Links group displayed as the first group in the command palette.</p>\n',
    'type': 'PContentSearchLink[]',
    'required': false
  },
  {
    'name': 'loading',
    'description': '<p>When <code>true</code>, the loading icon will be displayed.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'loadingIcon',
    'description': '<p>The icon when the <code>loading</code> prop is <code>true</code>.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'modal',
    'description': '<p>The modality of the dialog When set to <code>true</code>, &lt;br&gt;\ninteraction with outside elements will be disabled and only dialog content will be visible to screen readers.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'navigation',
    'description': '',
    'type': 'ContentNavigationItem[]',
    'required': false
  },
  {
    'name': 'overlay',
    'description': '<p>Render an overlay behind the dialog.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'placeholder',
    'description': '<p>The placeholder text for the input.</p>\n',
    'type': 'string',
    'required': false
  },
  {
    'name': 'portal',
    'description': '<p>Render the dialog in a portal.</p>\n',
    'type': 'string | boolean | HTMLElement',
    'required': false
  },
  {
    'name': 'searchTerm',
    'description': '',
    'type': 'string',
    'required': false,
    'default': '\'\''
  },
  {
    'name': 'shortcut',
    'description': '<p>Keyboard shortcut to open the search (used by <a href=\'https://akara.vinicunca.dev/pohon/composables/define-shortcuts\'><code>defineShortcuts</code></a>)</p>\n',
    'type': 'string',
    'required': false,
    'default': '\'meta_k\''
  },
  {
    'name': 'title',
    'description': '',
    'type': 'string',
    'required': false
  },
  {
    'name': 'transition',
    'description': '<p>Animate the dialog when opening or closing.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '({ dialog?: ClassValue; input?: ClassValue; } & { root?: ClassValue; input?: ClassValue; close?: ClassValue; back?: ClassValue; content?: ClassValue; footer?: ClassValue; viewport?: ClassValue; group?: ClassValue; empty?: ClassValue; label?: ClassValue; item?: ClassValue; itemLeadingIcon?: ClassValue; itemLeadingAvatar?: ClassValue; itemLeadingAvatarSize?: ClassValue; itemLeadingChip?: ClassValue; itemLeadingChipSize?: ClassValue; itemTrailing?: ClassValue; itemTrailingIcon?: ClassValue; itemTrailingHighlightedIcon?: ClassValue; itemTrailingKbds?: ClassValue; itemTrailingKbdsSize?: ClassValue; itemLabel?: ClassValue; itemLabelBase?: ClassValue; itemLabelPrefix?: ClassValue; itemLabelSuffix?: ClassValue; })',
    'required': false
  }
]" />

<DocsEmitsTable :data="[
  {
    'name': 'update:searchTerm',
    'description': '',
    'type': '[value: string]'
  }
]" />

<DocsSlotsTable :data="[
  {
    'name': 'searchTerm',
    'description': '',
    'type': 'string | undefined'
  }
]" />
