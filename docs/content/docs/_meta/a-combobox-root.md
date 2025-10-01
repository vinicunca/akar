<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-combobox-root' :data='[
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
    "name": "by",
    "description": "Use this to compare objects by a particular field, or pass your own comparison function for complete control over how objects are compared.",
    "type": "string | ((a: AcceptableValue, b: AcceptableValue) => boolean)",
    "required": false
  },
  {
    "name": "defaultOpen",
    "description": "The open state of the combobox when it is initially rendered. <br> Use when you do not need to control its open state.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "defaultValue",
    "description": "The value of the listbox when initially rendered. Use when you do not need to control the state of the Listbox",
    "type": "AcceptableValue | AcceptableValue[]",
    "required": false
  },
  {
    "name": "dir",
    "description": "The reading direction of the listbox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode.",
    "type": "\'ltr\' | \'rtl\'",
    "required": false
  },
  {
    "name": "disabled",
    "description": "When `true`, prevents the user from interacting with listbox",
    "type": "boolean",
    "required": false
  },
  {
    "name": "highlightOnHover",
    "description": "When `true`, hover over item will trigger highlight",
    "type": "boolean",
    "required": false
  },
  {
    "name": "ignoreFilter",
    "description": "When `true`, disable the default filters",
    "type": "boolean",
    "required": false
  },
  {
    "name": "modelValue",
    "description": "The controlled value of the listbox. Can be binded with with `v-model`.",
    "type": "AcceptableValue | AcceptableValue[]",
    "required": false
  },
  {
    "name": "multiple",
    "description": "Whether multiple options can be selected or not.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "name",
    "description": "The name of the field. Submitted with its owning form as part of a name/value pair.",
    "type": "string",
    "required": false
  },
  {
    "name": "open",
    "description": "The controlled open state of the Combobox. Can be binded with with `v-model:open`.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "openOnClick",
    "description": "Whether to open the combobox when the input is clicked",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "openOnFocus",
    "description": "Whether to open the combobox when the input is focused",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "required",
    "description": "When `true`, indicates that the user must set the value before the owning form can be submitted.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "resetSearchTermOnBlur",
    "description": "Whether to reset the searchTerm when the Combobox input blurred",
    "type": "boolean",
    "required": false,
    "default": "true"
  },
  {
    "name": "resetSearchTermOnSelect",
    "description": "Whether to reset the searchTerm when the Combobox value is selected",
    "type": "boolean",
    "required": false,
    "default": "true"
  }
]'} 

#### Events

:docs-emits-table{name='events-combobox-root' :data='[
  {
    "name": "highlight",
    "description": "Event handler when highlighted element changes.",
    "type": "[payload: { ref: HTMLElement; value: AcceptableValue; }]"
  },
  {
    "name": "update:modelValue",
    "description": "Event handler called when the value changes.",
    "type": "[value: AcceptableValue]"
  },
  {
    "name": "update:open",
    "description": "Event handler called when the open state of the combobox changes.",
    "type": "[value: boolean]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-combobox-root' :data='[
  {
    "name": "open",
    "description": "Current open state",
    "type": "boolean"
  },
  {
    "name": "modelValue",
    "description": "Current active value",
    "type": "AcceptableValue | AcceptableValue[]"
  }
]'} 
