<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-tree-root' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'ul\'"
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "bubbleSelect",
    "description": "When `true`, selecting children will update the parent state.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "defaultExpanded",
    "description": "The value of the expanded tree when initially rendered. Use when you do not need to control the state of the expanded tree",
    "type": "string[]",
    "required": false
  },
  {
    "name": "defaultValue",
    "description": "The value of the tree when initially rendered. Use when you do not need to control the state of the tree",
    "type": "Record<string, any> | Record<string, any>[]",
    "required": false
  },
  {
    "name": "dir",
    "description": "The reading direction of the listbox when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode.",
    "type": "\'ltr\' | \'rtl\'",
    "required": false
  },
  {
    "name": "disabled",
    "description": "When `true`, prevents the user from interacting with tree",
    "type": "boolean",
    "required": false
  },
  {
    "name": "expanded",
    "description": "The controlled value of the expanded item. Can be binded with with `v-model`.",
    "type": "string[]",
    "required": false
  },
  {
    "name": "getChildren",
    "description": "This function is passed the index of each item and should return a list of children for that item",
    "type": "((val: Record<string, any>) => Record<string, any>[])",
    "required": false,
    "default": "val.children"
  },
  {
    "name": "getKey",
    "description": "This function is passed the index of each item and should return a unique key for that item",
    "type": "(val: Record<string, any>): string",
    "required": true
  },
  {
    "name": "items",
    "description": "List of items",
    "type": "Record<string, any>[]",
    "required": false
  },
  {
    "name": "modelValue",
    "description": "The controlled value of the tree. Can be binded with with `v-model`.",
    "type": "Record<string, any> | Record<string, any>[]",
    "required": false
  },
  {
    "name": "multiple",
    "description": "Whether multiple options can be selected or not.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "propagateSelect",
    "description": "When `true`, selecting parent will select the descendants.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "selectionBehavior",
    "description": "How multiple selection should behave in the collection.",
    "type": "\'replace\' | \'toggle\'",
    "required": false,
    "default": "\'toggle\'"
  }
]'} 

#### Events

:docs-emits-table{name='events-tree-root' :data='[
  {
    "name": "update:expanded",
    "description": "",
    "type": "[val: string[]]"
  },
  {
    "name": "update:modelValue",
    "description": "Event handler called when the value changes.",
    "type": "[val: Record<string, any> | Record<string, any>[]]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-tree-root' :data='[
  {
    "name": "flattenItems",
    "description": "",
    "type": "FlattenedItem<Record<string, any>>[]"
  },
  {
    "name": "modelValue",
    "description": "",
    "type": "Record<string, any> | Record<string, any>[]"
  },
  {
    "name": "expanded",
    "description": "",
    "type": "string[]"
  }
]'} 
