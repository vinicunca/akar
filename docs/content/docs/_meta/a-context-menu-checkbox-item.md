<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-context-menu-checkbox-item' :data='[
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
    "name": "disabled",
    "description": "When `true`, prevents the user from interacting with the item.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "modelValue",
    "description": "The controlled checked state of the item. Can be used as `v-model`.",
    "type": "false | true | \'indeterminate\'",
    "required": false
  },
  {
    "name": "textValue",
    "description": "Optional text used for typeahead purposes. By default the typeahead behavior will use the `.textContent` of the item. <br>\\n Use this when the content is complex, or you have non-textual content inside.",
    "type": "string",
    "required": false
  }
]'} 

#### Events

:docs-emits-table{name='events-context-menu-checkbox-item' :data='[
  {
    "name": "select",
    "description": "",
    "type": "[event: Event]"
  },
  {
    "name": "update:modelValue",
    "description": "Event handler called when the value changes.",
    "type": "[payload: boolean]"
  }
]'} 
