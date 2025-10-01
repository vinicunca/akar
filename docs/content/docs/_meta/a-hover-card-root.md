<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-hover-card-root' :data='[
  {
    "name": "closeDelay",
    "description": "The duration from when the mouse leaves the trigger or content until the hover card closes.",
    "type": "number",
    "required": false,
    "default": "300"
  },
  {
    "name": "defaultOpen",
    "description": "The open state of the hover card when it is initially rendered. Use when you do not need to control its open state.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "open",
    "description": "The controlled open state of the hover card. Can be binded as `v-model:open`.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "openDelay",
    "description": "The duration from when the mouse enters the trigger until the hover card opens.",
    "type": "number",
    "required": false,
    "default": "700"
  }
]'} 

#### Events

:docs-emits-table{name='events-hover-card-root' :data='[
  {
    "name": "update:open",
    "description": "Event handler called when the open state of the hover card changes.",
    "type": "[value: boolean]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-hover-card-root' :data='[
  {
    "name": "open",
    "description": "Current open state",
    "type": "boolean"
  }
]'} 
