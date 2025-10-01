<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-accordion-item' :data='[
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
    "name": "disabled",
    "description": "Whether or not an accordion item is disabled from user interaction.\\nWhen `true`, prevents the user from interacting with the item.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "unmountOnHide",
    "description": "When `true`, the element will be unmounted on closed state.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "value",
    "description": "A string value for the accordion item. All items within an accordion should use a unique value.",
    "type": "string",
    "required": true
  }
]'} 

#### Slots

:docs-slots-table{name='slots-accordion-item' :data='[
  {
    "name": "open",
    "description": "Current open state",
    "type": "boolean"
  }
]'} 
