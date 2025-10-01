<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-collapsible-root' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'div\'"
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "defaultOpen",
    "description": "The open state of the collapsible when it is initially rendered. <br> Use when you do not need to control its open state.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "disabled",
    "description": "When `true`, prevents the user from interacting with the collapsible.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "open",
    "description": "The controlled open state of the collapsible. Can be binded with `v-model`.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "unmountOnHide",
    "description": "When `true`, the element will be unmounted on closed state.",
    "type": "boolean",
    "required": false,
    "default": "true"
  }
]'} 

#### Events

:docs-emits-table{name='events-collapsible-root' :data='[
  {
    "name": "update:open",
    "description": "Event handler called when the open state of the collapsible changes.",
    "type": "[value: boolean]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-collapsible-root' :data='[
  {
    "name": "open",
    "description": "Current open state",
    "type": "boolean"
  }
]'} 
