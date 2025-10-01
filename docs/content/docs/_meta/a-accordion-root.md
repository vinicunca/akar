<!-- This file was automatic generated. Do not edit it manually -->

:docs-props-table{:data='[
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
    "name": "collapsible",
    "description": "When type is \'single\', allows closing content when clicking trigger for an open item.\\nWhen type is \'multiple\', this prop has no effect.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "defaultValue",
    "description": "The default active value of the item(s).\\n\\nUse when you do not need to control the state of the item(s).",
    "type": "string | string[]",
    "required": false
  },
  {
    "name": "dir",
    "description": "The reading direction of the accordion when applicable. If omitted, assumes LTR (left-to-right) reading mode.",
    "type": "\'ltr\' | \'rtl\'",
    "required": false
  },
  {
    "name": "disabled",
    "description": "When `true`, prevents the user from interacting with the accordion and all its items",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "modelValue",
    "description": "The controlled value of the active item(s).\\n\\nUse this when you need to control the state of the items. Can be binded with `v-model`",
    "type": "string | string[]",
    "required": false
  },
  {
    "name": "orientation",
    "description": "The orientation of the accordion.",
    "type": "\'horizontal\' | \'vertical\'",
    "required": false,
    "default": "\'vertical\'"
  },
  {
    "name": "type",
    "description": "Determines whether a \'single\' or \'multiple\' items can be pressed at a time.\\n\\nThis prop will overwrite the inferred type from `modelValue` and `defaultValue`.",
    "type": "\'multiple\' | \'single\'",
    "required": false
  },
  {
    "name": "unmountOnHide",
    "description": "When `true`, the element will be unmounted on closed state.",
    "type": "boolean",
    "required": false,
    "default": "true"
  }
]'} 
<!-- 
:docs-emits-table{:data='[
  {
    "name": "update:modelValue",
    "description": "<p>Event handler called when the expanded state of an item changes</p>\\n",
    "type": "[value: string | string[]]"
  }
]'} 

:docs-slots-table{:data='[
  {
    "name": "modelValue",
    "description": "<p>Current active value</p>\\n",
    "type": "AcceptableValue | AcceptableValue[] | undefined"
  }
]'}  -->
