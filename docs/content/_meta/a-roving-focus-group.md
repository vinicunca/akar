<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    'name': 'as',
    'description': '<p>The element or component this component should render as. Can be overwritten by <code>asChild</code>.</p>\n',
    'type': 'APrimitiveAsTag | Component',
    'required': false,
    'default': '\'div\''
  },
  {
    'name': 'asChild',
    'description': '<p>Change the default rendered element for the one passed as a child, merging their props and behavior.</p>\n<p>Read our <a href=\'https://akar.vinicunca.dev/core/guides/composition\'>Composition</a> guide for more details.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'currentTabStopId',
    'description': '',
    'type': 'string | null',
    'required': false
  },
  {
    'name': 'defaultCurrentTabStopId',
    'description': '',
    'type': 'string',
    'required': false
  },
  {
    'name': 'dir',
    'description': '<p>The direction of navigation between items.</p>\n',
    'type': '\'ltr\' | \'rtl\'',
    'required': false
  },
  {
    'name': 'loop',
    'description': '<p>Whether keyboard navigation should loop around</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'false'
  },
  {
    'name': 'orientation',
    'description': '<p>The orientation of the group.\nMainly so arrow navigation is done accordingly (left &amp; right vs. up &amp; down)</p>\n',
    'type': '\'horizontal\' | \'vertical\'',
    'required': false
  },
  {
    'name': 'preventScrollOnEntryFocus',
    'description': '',
    'type': 'boolean',
    'required': false,
    'default': 'false'
  }
]" />

<DocsEmitsTable :data="[
  {
    'name': 'entryFocus',
    'description': '<p>Event handler called when container is being focused. Can be prevented.</p>\n',
    'type': '[event: Event]'
  },
  {
    'name': 'update:currentTabStopId',
    'description': '',
    'type': '[value: string | null]'
  }
]" />

<DocsExposedTable :data="[
  {
    'name': 'getItems',
    'description': '',
    'type': '(includeDisabledItem?: boolean) => { ref: HTMLElement; value?: any; }[]'
  }
]" />
