<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    'name': 'as',
    'description': '<p>The element or component this component should render as.</p>\n',
    'type': 'APrimitiveAsTag | Component',
    'required': false,
    'default': '\'div\''
  },
  {
    'name': 'activeSnapPoint',
    'description': '',
    'type': 'string | number | null',
    'required': false
  },
  {
    'name': 'closeThreshold',
    'description': '<p>Number between 0 and 1 that determines when the drawer should be closed.\nExample: threshold of 0.5 would close the drawer if the user swiped for 50% of the height of the drawer or more.</p>\n',
    'type': 'number',
    'required': false
  },
  {
    'name': 'content',
    'description': '<p>The content of the drawer.</p>\n',
    'type': '(Omit<ADialogContentProps, \'as\' | \'asChild\' | \'forceMount\'> & Partial<EmitsToProps<DialogContentImplEmits>>)',
    'required': false
  },
  {
    'name': 'defaultOpen',
    'description': '<p>Opened by default, skips initial enter animation. Still reacts to <code>open</code> state changes</p>\n',
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
    'name': 'direction',
    'description': '<p>Direction of the drawer. Can be <code>top</code> or <code>bottom</code>, <code>left</code>, <code>right</code>.</p>\n',
    'type': '\'top\' | \'bottom\' | \'left\' | \'right\'',
    'required': false,
    'default': '\'bottom\''
  },
  {
    'name': 'dismissible',
    'description': '<p>When <code>false</code> dragging, clicking outside, pressing esc, etc. will not close the drawer.\nUse this in combination with the <code>open</code> prop, otherwise you won't be able to open/close the drawer.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'fixed',
    'description': '<p>When <code>true</code>, don't move the drawer upwards if there's space, but rather only change it's height so it's fully scrollable when the keyboard is open</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'handle',
    'description': '<p>Render a handle on the drawer.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'handleOnly',
    'description': '<p>When <code>true</code> only allows the drawer to be dragged by the <code>&lt;ADrawer.Handle /&gt;</code> component.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'inset',
    'description': '<p>Whether to inset the drawer from the edges.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'modal',
    'description': '<p>When <code>false</code> it allows to interact with elements outside of the drawer without closing it.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'nested',
    'description': '<p>Whether the drawer is nested in another drawer.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'noBodyStyles',
    'description': '<p>When <code>true</code> the <code>body</code> doesn't get any styles assigned.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'open',
    'description': '',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'overlay',
    'description': '<p>Render an overlay behind the drawer.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'portal',
    'description': '<p>Render the drawer in a portal.</p>\n',
    'type': 'string | boolean | HTMLElement',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'preventScrollRestoration',
    'description': '',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'scrollLockTimeout',
    'description': '<p>Duration for which the drawer is not draggable after scrolling content inside of the drawer.</p>\n',
    'type': 'number',
    'required': false
  },
  {
    'name': 'setBackgroundColorOnScale',
    'description': '<p>When <code>false</code> we don't change body's background color when the drawer is open.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'shouldScaleBackground',
    'description': '',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'snapPoints',
    'description': '<p>Array of numbers from 0 to 100 that corresponds to % of the screen a given snap point should take up.\nShould go from least visible. Example <code>[0.2, 0.5, 0.8]</code>.\nYou can also use px values, which doesn't take screen height into account.</p>\n',
    'type': '(string | number)[]',
    'required': false
  },
  {
    'name': 'title',
    'description': '',
    'type': 'string',
    'required': false
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '{ overlay?: ClassValue; content?: ClassValue; handle?: ClassValue; container?: ClassValue; header?: ClassValue; title?: ClassValue; description?: ClassValue; body?: ClassValue; footer?: ClassValue; }',
    'required': false
  }
]" />

<DocsEmitsTable :data="[
  {
    'name': 'animationEnd',
    'description': '',
    'type': '[open: boolean]'
  },
  {
    'name': 'close',
    'description': '',
    'type': '[]'
  },
  {
    'name': 'close:prevent',
    'description': '',
    'type': '[]'
  },
  {
    'name': 'drag',
    'description': '',
    'type': '[percentageDragged: number]'
  },
  {
    'name': 'release',
    'description': '',
    'type': '[open: boolean]'
  },
  {
    'name': 'update:activeSnapPoint',
    'description': '',
    'type': '[val: string | number]'
  },
  {
    'name': 'update:open',
    'description': '',
    'type': '[open: boolean]'
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
