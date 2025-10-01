<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    'name': 'as',
    'description': '<p>The element or component this component should render as.</p>\n',
    'type': 'APrimitiveAsTag | Component',
    'required': false,
    'default': '\'nav\''
  },
  {
    'name': 'collapsible',
    'description': '<p>When type is &quot;single&quot;, prevents closing the open item when clicking its trigger.\nWhen type is &quot;multiple&quot;, disables the collapsible behavior.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'color',
    'description': '',
    'type': '\'error\' | \'primary\' | \'secondary\' | \'success\' | \'info\' | \'warning\' | \'neutral\'',
    'required': false
  },
  {
    'name': 'defaultOpen',
    'description': '<p>When <code>true</code>, the tree will be opened based on the current route.\nWhen <code>false</code>, the tree will be closed.\nWhen <code>undefined</code> (default), the first item will be opened with <code>type=&quot;single&quot;</code> and the first level will be opened with <code>type=&quot;multiple&quot;</code>.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'disabled',
    'description': '<p>When <code>true</code>, prevents the user from interacting with the accordion and all its items</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'highlight',
    'description': '<p>Display a line next to the active link.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'false'
  },
  {
    'name': 'highlightColor',
    'description': '',
    'type': '\'error\' | \'primary\' | \'secondary\' | \'success\' | \'info\' | \'warning\' | \'neutral\'',
    'required': false
  },
  {
    'name': 'level',
    'description': '',
    'type': 'number',
    'required': false,
    'default': '0'
  },
  {
    'name': 'navigation',
    'description': '',
    'type': 'PContentNavigationLink[]',
    'required': false
  },
  {
    'name': 'trailingIcon',
    'description': '<p>The icon displayed to toggle the accordion.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'type',
    'description': '<p>Determines whether a &quot;single&quot; or &quot;multiple&quot; items can be pressed at a time.</p>\n<p>This prop will overwrite the inferred type from <code>modelValue</code> and <code>defaultValue</code>.</p>\n',
    'type': '\'multiple\' | \'single\'',
    'required': false,
    'default': '\'multiple\''
  },
  {
    'name': 'unmountOnHide',
    'description': '<p>When <code>true</code>, the element will be unmounted on closed state.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'variant',
    'description': '',
    'type': '\'link\' | \'pill\'',
    'required': false
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '{ root?: ClassValue; content?: ClassValue; list?: ClassValue; item?: ClassValue; listWithChildren?: ClassValue; itemWithChildren?: ClassValue; trigger?: ClassValue; link?: ClassValue; linkLeadingIcon?: ClassValue; linkTrailing?: ClassValue; linkTrailingBadge?: ClassValue; linkTrailingBadgeSize?: ClassValue; linkTrailingIcon?: ClassValue; linkTitle?: ClassValue; linkTitleExternalIcon?: ClassValue; }',
    'required': false
  }
]" />

<DocsEmitsTable :data="[
  {
    'name': 'update:modelValue',
    'description': '',
    'type': '[value: string | string[]]'
  }
]" />

<DocsSlotsTable :data="[
  {
    'name': 'link',
    'description': '',
    'type': 'PContentNavigationLink'
  },
  {
    'name': 'active',
    'description': '',
    'type': 'boolean | undefined'
  }
]" />
