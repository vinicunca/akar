<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-tags-input-root' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'div\'"
  },
  {
    "name": "addOnBlur",
    "description": "When `true` allow adding tags blur input",
    "type": "boolean",
    "required": false
  },
  {
    "name": "addOnPaste",
    "description": "When `true`, allow adding tags on paste. Work in conjunction with delimiter prop.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "addOnTab",
    "description": "When `true` allow adding tags on tab keydown",
    "type": "boolean",
    "required": false
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "convertValue",
    "description": "Convert the input value to the desired type. Mandatory when using objects as values and using `ATagsInputInput`",
    "type": "((value: string) => AcceptableInputValue)",
    "required": false
  },
  {
    "name": "defaultValue",
    "description": "The value of the tags that should be added. Use when you do not need to control the state of the tags input",
    "type": "AcceptableInputValue[]",
    "required": false,
    "default": "[]"
  },
  {
    "name": "delimiter",
    "description": "The character or regular expression to trigger the addition of a new tag. Also used to split tags for `@paste` event",
    "type": "string | RegExp",
    "required": false,
    "default": "\',\'"
  },
  {
    "name": "dir",
    "description": "The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode.",
    "type": "\'ltr\' | \'rtl\'",
    "required": false
  },
  {
    "name": "disabled",
    "description": "When `true`, prevents the user from interacting with the tags input.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "displayValue",
    "description": "Display the value of the tag. Useful when you want to apply modifications to the value like adding a suffix or when using object as values",
    "type": "((value: AcceptableInputValue) => string)",
    "required": false,
    "default": "value.toString()"
  },
  {
    "name": "duplicate",
    "description": "When `true`, allow duplicated tags.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "id",
    "description": "",
    "type": "string",
    "required": false
  },
  {
    "name": "max",
    "description": "Maximum number of tags.",
    "type": "number",
    "required": false,
    "default": "0"
  },
  {
    "name": "modelValue",
    "description": "The controlled value of the tags input. Can be bind as `v-model`.",
    "type": "AcceptableInputValue[] | null",
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

:docs-emits-table{name='events-tags-input-root' :data='[
  {
    "name": "addTag",
    "description": "Event handler called when tag is added",
    "type": "[payload: AcceptableInputValue]"
  },
  {
    "name": "invalid",
    "description": "Event handler called when the value is invalid",
    "type": "[payload: AcceptableInputValue]"
  },
  {
    "name": "removeTag",
    "description": "Event handler called when tag is removed",
    "type": "[payload: AcceptableInputValue]"
  },
  {
    "name": "update:modelValue",
    "description": "Event handler called when the value changes",
    "type": "[payload: AcceptableInputValue[]]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-tags-input-root' :data='[
  {
    "name": "modelValue",
    "description": "Current input values",
    "type": "string | Record<string, any>"
  }
]'} 
