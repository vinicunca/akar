<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-radio-group-root' :data='[
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
    "name": "defaultValue",
    "description": "The value of the radio item that should be checked when initially rendered.\\n\\nUse when you do not need to control the state of the radio items.",
    "type": "AcceptableValue",
    "required": false
  },
  {
    "name": "dir",
    "description": "The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode.",
    "type": "\'ltr\' | \'rtl\'",
    "required": false
  },
  {
    "name": "disabled",
    "description": "When `true`, prevents the user from interacting with radio items.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "loop",
    "description": "When `true`, keyboard navigation will loop from last item to first, and vice versa.",
    "type": "boolean",
    "required": false,
    "default": "true"
  },
  {
    "name": "modelValue",
    "description": "The controlled value of the radio item to check. Can be binded as `v-model`.",
    "type": "AcceptableValue",
    "required": false
  },
  {
    "name": "name",
    "description": "The name of the field. Submitted with its owning form as part of a name/value pair.",
    "type": "string",
    "required": false
  },
  {
    "name": "orientation",
    "description": "The orientation of the component.",
    "type": "\'horizontal\' | \'vertical\'",
    "required": false
  },
  {
    "name": "required",
    "description": "When `true`, indicates that the user must set the value before the owning form can be submitted.",
    "type": "boolean",
    "required": false,
    "default": "false"
  }
]'} 

#### Events

:docs-emits-table{name='events-radio-group-root' :data='[
  {
    "name": "update:modelValue",
    "description": "Event handler called when the radio group value changes",
    "type": "[payload: string]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-radio-group-root' :data='[
  {
    "name": "modelValue",
    "description": "Current input values",
    "type": "null | string | number | bigint | Record<string, any>"
  }
]'} 
