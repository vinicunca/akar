<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-calendar-cell-trigger' :data='[
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
    "name": "day",
    "description": "The date value provided to the cell trigger",
    "type": "DateValue",
    "required": true
  },
  {
    "name": "month",
    "description": "The month in which the cell is rendered",
    "type": "DateValue",
    "required": true
  }
]'} 

#### Slots

:docs-slots-table{name='slots-calendar-cell-trigger' :data='[
  {
    "name": "dayValue",
    "description": "Current day",
    "type": "string"
  },
  {
    "name": "disabled",
    "description": "Current disable state",
    "type": "boolean"
  },
  {
    "name": "selected",
    "description": "Current selected state",
    "type": "boolean"
  },
  {
    "name": "today",
    "description": "Current today state",
    "type": "boolean"
  },
  {
    "name": "outsideView",
    "description": "Current outside view state",
    "type": "boolean"
  },
  {
    "name": "outsideVisibleView",
    "description": "Current outside visible view state",
    "type": "boolean"
  },
  {
    "name": "unavailable",
    "description": "Current unavailable state",
    "type": "boolean"
  }
]'} 
