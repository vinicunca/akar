<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-checkbox-group-root' :data='[
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
    "description": "The value of the checkbox when it is initially rendered. Use when you do not need to control its value.",
    "type": "AcceptableValue[]",
    "required": false
  },
  {
    "name": "dir",
    "description": "The direction of navigation between items.",
    "type": "\'ltr\' | \'rtl\'",
    "required": false
  },
  {
    "name": "disabled",
    "description": "When `true`, prevents the user from interacting with the checkboxes",
    "type": "boolean",
    "required": false
  },
  {
    "name": "loop",
    "description": "Whether keyboard navigation should loop around",
    "type": "boolean",
    "required": false
  },
  {
    "name": "modelValue",
    "description": "The controlled value of the checkbox. Can be binded with v-model.",
    "type": "AcceptableValue[]",
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
    "description": "The orientation of the group.\\nMainly so arrow navigation is done accordingly (left & right vs. up & down)",
    "type": "\'horizontal\' | \'vertical\'",
    "required": false
  },
  {
    "name": "required",
    "description": "When `true`, indicates that the user must set the value before the owning form can be submitted.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "rovingFocus",
    "description": "When `false`, navigating through the items using arrow keys will be disabled.",
    "type": "boolean",
    "required": false,
    "default": "true"
  }
]'} 

#### Events

:docs-emits-table{name='events-checkbox-group-root' :data='[
  {
    "name": "update:modelValue",
    "description": "Event handler called when the value of the checkbox changes.",
    "type": "[value: AcceptableValue[]]"
  }
]'} 
