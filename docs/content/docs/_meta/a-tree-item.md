<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-tree-item' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'li\'"
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "level",
    "description": "Level of depth",
    "type": "number",
    "required": true
  },
  {
    "name": "value",
    "description": "Value given to this item",
    "type": "Record<string, any>",
    "required": true
  }
]'} 

#### Events

:docs-emits-table{name='events-tree-item' :data='[
  {
    "name": "select",
    "description": "Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`.",
    "type": "[event: SelectEvent<Record<string, any>>]"
  },
  {
    "name": "toggle",
    "description": "Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`.",
    "type": "[event: ToggleEvent<Record<string, any>>]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-tree-item' :data='[
  {
    "name": "isExpanded",
    "description": "",
    "type": "boolean"
  },
  {
    "name": "isSelected",
    "description": "",
    "type": "boolean"
  },
  {
    "name": "isIndeterminate",
    "description": "",
    "type": "boolean | undefined"
  },
  {
    "name": "handleToggle",
    "description": "",
    "type": "(): void"
  },
  {
    "name": "handleSelect",
    "description": "",
    "type": "(): void"
  }
]'} 

#### Exposed

:docs-exposed-table{name='exposed-tree-item' :data='[
  {
    "name": "handleToggle",
    "description": "",
    "type": "() => void"
  },
  {
    "name": "handleSelect",
    "description": "",
    "type": "() => void"
  }
]'} 
