<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-popover-root' :data='[
  {
    "name": "defaultOpen",
    "description": "The open state of the popover when it is initially rendered. Use when you do not need to control its open state.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "modal",
    "description": "The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "open",
    "description": "The controlled open state of the popover.",
    "type": "boolean",
    "required": false
  }
]'} 

#### Events

:docs-emits-table{name='events-popover-root' :data='[
  {
    "name": "update:open",
    "description": "Event handler called when the open state of the popover changes.",
    "type": "[value: boolean]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-popover-root' :data='[
  {
    "name": "open",
    "description": "Current open state",
    "type": "boolean"
  },
  {
    "name": "close",
    "description": "Close the popover",
    "type": "(): void"
  }
]'} 
