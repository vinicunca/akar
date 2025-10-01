<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-drawer-root-nested' :data='[
  {
    "name": "activeSnapPoint",
    "description": "",
    "type": "string | number | null",
    "required": false
  },
  {
    "name": "closeThreshold",
    "description": "Number between 0 and 1 that determines when the drawer should be closed.\\nExample: threshold of 0.5 would close the drawer if the user swiped for 50% of the height of the drawer or more.",
    "type": "number",
    "required": false
  },
  {
    "name": "defaultOpen",
    "description": "Opened by default, skips initial enter animation. Still reacts to `open` state changes",
    "type": "boolean",
    "required": false
  },
  {
    "name": "direction",
    "description": "Direction of the drawer. Can be `top` or `bottom`, `left`, `right`.",
    "type": "\'top\' | \'right\' | \'bottom\' | \'left\'",
    "required": false
  },
  {
    "name": "dismissible",
    "description": "When `false` dragging, clicking outside, pressing esc, etc. will not close the drawer.\\nUse this in combination with the `open` prop, otherwise you won't be able to open/close the drawer.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "fadeFromIndex",
    "description": "Index of a `snapPoint` from which the overlay fade should be applied.\\nDefaults to the last snap point.",
    "type": "number",
    "required": false
  },
  {
    "name": "fixed",
    "description": "When `true`, don't move the drawer upwards if there's space, but rather only change it's height so it's fully scrollable when the keyboard is open",
    "type": "boolean",
    "required": false
  },
  {
    "name": "handleOnly",
    "description": "When `true` only allows the drawer to be dragged by the `<ADrawer.Handle />` component.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "modal",
    "description": "When `false` it allows to interact with elements outside of the drawer without closing it.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "nested",
    "description": "",
    "type": "boolean",
    "required": false
  },
  {
    "name": "noBodyStyles",
    "description": "When `true` the `body` doesn't get any styles assigned.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "open",
    "description": "",
    "type": "boolean",
    "required": false
  },
  {
    "name": "preventScrollRestoration",
    "description": "",
    "type": "boolean",
    "required": false
  },
  {
    "name": "scrollLockTimeout",
    "description": "Duration for which the drawer is not draggable after scrolling content inside of the drawer.",
    "type": "number",
    "required": false
  },
  {
    "name": "setBackgroundColorOnScale",
    "description": "When `false` we don't change body's background color when the drawer is open.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "shouldScaleBackground",
    "description": "",
    "type": "boolean",
    "required": false
  },
  {
    "name": "snapPoints",
    "description": "Array of numbers from 0 to 100 that corresponds to % of the screen a given snap point should take up.\\nShould go from least visible. Example `[0.2, 0.5, 0.8]`.\\nYou can also use px values, which doesn't take screen height into account.",
    "type": "(string | number)[]",
    "required": false
  }
]'} 

#### Events

:docs-emits-table{name='events-drawer-root-nested' :data='[
  {
    "name": "animationEnd",
    "description": "",
    "type": "[open: boolean]"
  },
  {
    "name": "close",
    "description": "",
    "type": "[]"
  },
  {
    "name": "drag",
    "description": "",
    "type": "[percentageDragged: number]"
  },
  {
    "name": "release",
    "description": "",
    "type": "[open: boolean]"
  },
  {
    "name": "update:activeSnapPoint",
    "description": "",
    "type": "[val: string | number]"
  },
  {
    "name": "update:open",
    "description": "Event handler called when the open state of the dialog changes.",
    "type": "[open: boolean]"
  }
]'} 
