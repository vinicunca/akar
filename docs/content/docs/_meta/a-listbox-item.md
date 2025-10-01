<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-listbox-item' :data='[
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
    "description": "When `true`, prevents the user from interacting with the item.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "value",
    "description": "The value given as data when submitted with a `name`.",
    "type": "AcceptableValue",
    "required": true
  }
]'} 

#### Events

:docs-emits-table{name='events-listbox-item' :data='[
  {
    "name": "select",
    "description": "Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`.",
    "type": "[event: SelectEvent<AcceptableValue>]"
  }
]'} 
