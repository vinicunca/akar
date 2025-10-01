<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-toggle-group-root' :data='[
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
    "description": "The default active value of the item(s).\\n\\nUse when you do not need to control the state of the item(s).",
    "type": "AcceptableValue | AcceptableValue[]",
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
    "description": "When `true`, prevents the user from interacting with the toggle group and all its items.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "loop",
    "description": "When `loop` and `rovingFocus` is `true`, keyboard navigation will loop from last item to first, and vice versa.",
    "type": "boolean",
    "required": false,
    "default": "true"
  },
  {
    "name": "modelValue",
    "description": "The controlled value of the active item(s).\\n\\nUse this when you need to control the state of the items. Can be binded with `v-model`",
    "type": "AcceptableValue | AcceptableValue[]",
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
    "description": "The orientation of the component, which determines how focus moves: `horizontal` for left/right arrows and `vertical` for up/down arrows.",
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
  },
  {
    "name": "type",
    "description": "Determines whether a \'single\' or \'multiple\' items can be pressed at a time.\\n\\nThis prop will overwrite the inferred type from `modelValue` and `defaultValue`.",
    "type": "\'multiple\' | \'single\'",
    "required": false
  }
]'} 

#### Events

:docs-emits-table{name='events-toggle-group-root' :data='[
  {
    "name": "update:modelValue",
    "description": "Event handler called when the value changes.",
    "type": "[payload: AcceptableValue | AcceptableValue[]]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-toggle-group-root' :data='[
  {
    "name": "modelValue",
    "description": "Current toggle values",
    "type": "AcceptableValue | AcceptableValue[] | undefined"
  }
]'} 
