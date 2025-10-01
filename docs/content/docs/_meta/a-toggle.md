<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-toggle' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'button\'"
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "defaultValue",
    "description": "The pressed state of the toggle when it is initially rendered. Use when you do not need to control its open state.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "disabled",
    "description": "When `true`, prevents the user from interacting with the toggle.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "modelValue",
    "description": "The controlled pressed state of the toggle. Can be bind as `v-model`.",
    "type": "boolean | null",
    "required": false
  },
  {
    "name": "name",
    "description": "The name of the field. Submitted with its owning form as part of a name/value pair.",
    "type": "string",
    "required": false
  },
  {
    "name": "required",
    "description": "When `true`, indicates that the user must set the value before the owning form can be submitted.",
    "type": "boolean",
    "required": false
  }
]'} 

#### Events

:docs-emits-table{name='events-toggle' :data='[
  {
    "name": "update:modelValue",
    "description": "Event handler called when the value of the toggle changes.",
    "type": "[value: boolean]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-toggle' :data='[
  {
    "name": "modelValue",
    "description": "Current value",
    "type": "boolean"
  },
  {
    "name": "state",
    "description": "Current state",
    "type": "\'on\' | \'off\'"
  },
  {
    "name": "pressed",
    "description": "Current pressed state",
    "type": "boolean"
  },
  {
    "name": "disabled",
    "description": "Current disabled state",
    "type": "boolean"
  }
]'} 
