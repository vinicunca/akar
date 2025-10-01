<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-tree-virtualizer' :data='[
  {
    "name": "estimateSize",
    "description": "Estimated size (in px) of each item",
    "type": "number",
    "required": false
  },
  {
    "name": "overscan",
    "description": "Number of items rendered outside the visible area",
    "type": "number",
    "required": false
  },
  {
    "name": "textContent",
    "description": "Text content for each item to achieve type-ahead feature",
    "type": "((item: Record<string, any>) => string)",
    "required": false
  }
]'} 

#### Slots

:docs-slots-table{name='slots-tree-virtualizer' :data='[
  {
    "name": "item",
    "description": "",
    "type": "FlattenedItem<Record<string, any>>"
  },
  {
    "name": "virtualizer",
    "description": "",
    "type": "Virtualizer<Element | Window, Element>"
  },
  {
    "name": "virtualItem",
    "description": "",
    "type": "VirtualItem"
  }
]'} 
