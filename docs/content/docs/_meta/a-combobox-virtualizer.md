<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-combobox-virtualizer' :data='[
  {
    "name": "estimateSize",
    "description": "Estimated size (in px) of each item",
    "type": "number",
    "required": false
  },
  {
    "name": "options",
    "description": "List of items",
    "type": "AcceptableValue[]",
    "required": true
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
    "type": "((option: AcceptableValue) => string)",
    "required": false
  }
]'} 

#### Slots

:docs-slots-table{name='slots-combobox-virtualizer' :data='[
  {
    "name": "option",
    "description": "",
    "type": "null | string | number | bigint | Record<string, any>"
  },
  {
    "name": "virtualizer",
    "description": "",
    "type": "Virtualizer<HTMLElement, Element>"
  },
  {
    "name": "virtualItem",
    "description": "",
    "type": "VirtualItem"
  }
]'} 
