<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-stepper-item' :data='[
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
    "name": "completed",
    "description": "Shows whether the step is completed.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "disabled",
    "description": "When `true`, prevents the user from interacting with the step.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "step",
    "description": "A unique value that associates the stepper item with an index",
    "type": "number",
    "required": true
  }
]'} 

#### Slots

:docs-slots-table{name='slots-stepper-item' :data='[
  {
    "name": "state",
    "description": "The current state of the stepper item",
    "type": "\'active\' | \'completed\' | \'inactive\'"
  }
]'} 
