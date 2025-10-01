<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-checkbox-root' :data='[
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
    "description": "The value of the checkbox when it is initially rendered. Use when you do not need to control its value.",
    "type": "boolean | \'indeterminate\'",
    "required": false
  },
  {
    "name": "disabled",
    "description": "When `true`, prevents the user from interacting with the checkbox",
    "type": "boolean",
    "required": false
  },
  {
    "name": "id",
    "description": "Id of the element",
    "type": "string",
    "required": false
  },
  {
    "name": "modelValue",
    "description": "The controlled value of the checkbox. Can be binded with v-model.",
    "type": "boolean | \'indeterminate\' | null",
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
  },
  {
    "name": "value",
    "description": "The value given as data when submitted with a `name`.",
    "type": "AcceptableValue",
    "required": false,
    "default": "\'on\'"
  }
]'} 

#### Events

:docs-emits-table{name='events-checkbox-root' :data='[
  {
    "name": "update:modelValue",
    "description": "Event handler called when the value of the checkbox changes.",
    "type": "[value: boolean | \'indeterminate\']"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-checkbox-root' :data='[
  {
    "name": "modelValue",
    "description": "Current value",
    "type": "false | true | \'indeterminate\'"
  },
  {
    "name": "state",
    "description": "Current state",
    "type": "CheckboxCheckedState"
  }
]'} 
