<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-combobox-input' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'input\'"
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "autoFocus",
    "description": "Focus on element when mounted.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "disabled",
    "description": "When `true`, prevents the user from interacting with item",
    "type": "boolean",
    "required": false
  },
  {
    "name": "displayValue",
    "description": "The display value of input for selected item. Does not work with `multiple`.",
    "type": "((val: any) => string)",
    "required": false
  },
  {
    "name": "modelValue",
    "description": "The controlled value of the filter. Can be binded with with v-model.",
    "type": "string",
    "required": false
  }
]'} 

#### Events

:docs-emits-table{name='events-combobox-input' :data='[
  {
    "name": "update:modelValue",
    "description": "Event handler called when the value changes.",
    "type": "[string]"
  }
]'} 
