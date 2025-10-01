<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    'name': 'close',
    'description': '<p>Display a close button to dismiss the dialog.\n<code>{ size: 'md', color: 'neutral', variant: 'ghost' }</code>{lang=&quot;ts-type&quot;}</p>\n',
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
    'name': 'content',
    'description': '<p>The content of the dialog.</p>\n',
    'type': '(Omit<ADialogContentProps, \'as\' | \'asChild\' | \'forceMount\'> & Partial<EmitsToProps<DialogContentImplEmits>>)',
    'required': false
  },
  {
    'name': 'defaultOpen',
    'description': '<p>The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.</p>\n',
    'type': 'boolean',
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
    'required': false,
    'default': 'true'
  },
  {
    'name': 'fullscreen',
    'description': '<p>When <code>true</code>, the dialog will take up the full screen.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'modal',
    'description': '<p>The modality of the dialog When set to <code>true</code>, &lt;br&gt;\ninteraction with outside elements will be disabled and only dialog content will be visible to screen readers.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'open',
    'description': '<p>The controlled open state of the dialog. Can be binded as <code>v-model:open</code>.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'overlay',
    'description': '<p>Render an overlay behind the dialog.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'portal',
    'description': '<p>Render the dialog in a portal.</p>\n',
    'type': 'string | boolean | HTMLElement',
    'required': false,
    'default': 'true'
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
    'required': false,
    'default': 'true'
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '{ overlay?: ClassValue; content?: ClassValue; header?: ClassValue; wrapper?: ClassValue; body?: ClassValue; footer?: ClassValue; title?: ClassValue; description?: ClassValue; close?: ClassValue; }',
    'required': false
  }
]" />

<DocsEmitsTable :data="[
  {
    'name': 'after:enter',
    'description': '',
    'type': '[]'
  },
  {
    'name': 'after:leave',
    'description': '',
    'type': '[]'
  },
  {
    'name': 'close:prevent',
    'description': '',
    'type': '[]'
  },
  {
    'name': 'update:open',
    'description': '',
    'type': '[value: boolean]'
  }
]" />

<DocsSlotsTable :data="[
  {
    'name': 'open',
    'description': '',
    'type': 'boolean'
  }
]" />
