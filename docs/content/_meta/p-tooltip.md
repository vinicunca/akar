<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    'name': 'arrow',
    'description': '<p>Display an arrow alongside the tooltip.</p>\n',
    'type': 'boolean | Omit<ATooltipArrowProps, \'as\' | \'asChild\'>',
    'required': false
  },
  {
    'name': 'content',
    'description': '<p>The content of the tooltip.</p>\n',
    'type': '(Omit<ATooltipContentProps, \'as\' | \'asChild\'> & Partial<EmitsToProps<TooltipContentImplEmits>>)',
    'required': false
  },
  {
    'name': 'defaultOpen',
    'description': '<p>The open state of the tooltip when it is initially rendered.\nUse when you do not need to control its open state.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'delayDuration',
    'description': '<p>Override the duration given to the <code>Provider</code> to customise\nthe open delay for a specific tooltip.</p>\n',
    'type': 'number',
    'required': false
  },
  {
    'name': 'disableClosingTrigger',
    'description': '<p>When <code>true</code>, clicking on trigger will not close the content.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'disabled',
    'description': '<p>When <code>true</code>, disable tooltip</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'disableHoverableContent',
    'description': '<p>Prevents Tooltip.Content from remaining open when hovering.\nDisabling this has accessibility consequences. Inherits\nfrom Tooltip.Provider.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'ignoreNonKeyboardFocus',
    'description': '<p>Prevent the tooltip from opening if the focus did not come from\nthe keyboard by matching against the <code>:focus-visible</code> selector.\nThis is useful if you want to avoid opening it when switching\nbrowser tabs or closing a dialog.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'kbds',
    'description': '<p>The keyboard keys to display in the tooltip.</p>\n',
    'type': '(string)[] | PKbdProps[]',
    'required': false
  },
  {
    'name': 'open',
    'description': '<p>The controlled open state of the tooltip.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'portal',
    'description': '<p>Render the tooltip in a portal.</p>\n',
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
    'name': 'text',
    'description': '<p>The text content of the tooltip.</p>\n',
    'type': 'string',
    'required': false
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '{ content?: ClassValue; arrow?: ClassValue; text?: ClassValue; kbds?: ClassValue; kbdsSize?: ClassValue; }',
    'required': false
  }
]" />

<DocsEmitsTable :data="[
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
