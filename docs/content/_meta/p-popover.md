<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    'name': 'arrow',
    'description': '<p>Display an arrow alongside the popover.</p>\n',
    'type': 'boolean | Omit<APopoverArrowProps, \'as\' | \'asChild\'>',
    'required': false
  },
  {
    'name': 'closeDelay',
    'description': '<p>The duration from when the mouse leaves the trigger or content until the hover card closes.</p>\n',
    'type': 'number',
    'required': false,
    'default': '0'
  },
  {
    'name': 'content',
    'description': '<p>The content of the popover.</p>\n',
    'type': '(Omit<APopoverContentProps, \'as\' | \'asChild\' | \'forceMount\'> & Partial<EmitsToProps<PopoverContentImplEmits>>)',
    'required': false
  },
  {
    'name': 'defaultOpen',
    'description': '<p>The open state of the popover when it is initially rendered. Use when you do not need to control its open state.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'dismissible',
    'description': '<p>When <code>false</code>, the popover will not close when clicking outside or pressing escape.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'modal',
    'description': '<p>The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'mode',
    'description': '<p>The display mode of the popover.</p>\n',
    'type': '\'click\' | \'hover\'',
    'required': false,
    'default': '\'click\''
  },
  {
    'name': 'open',
    'description': '<p>The controlled open state of the popover.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'openDelay',
    'description': '<p>The duration from when the mouse enters the trigger until the hover card opens.</p>\n',
    'type': 'number',
    'required': false,
    'default': '0'
  },
  {
    'name': 'portal',
    'description': '',
    'type': 'string | boolean | HTMLElement',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'reference',
    'description': '<p>The reference (or anchor) element that is being referred to for positioning.</p>\n<p>If not provided will use the current component as anchor.</p>\n',
    'type': 'ReferenceElement',
    'required': false
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '{ content?: ClassValue; arrow?: ClassValue; }',
    'required': false
  }
]" />

<DocsEmitsTable :data="[
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
