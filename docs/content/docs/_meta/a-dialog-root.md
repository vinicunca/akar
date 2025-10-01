<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-dialog-root' :data='[
  {
    "name": "defaultOpen",
    "description": "The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "modal",
    "description": "The modality of the dialog When set to `true`, <br>\\ninteraction with outside elements will be disabled and only dialog content will be visible to screen readers.",
    "type": "boolean",
    "required": false,
    "default": "true"
  },
  {
    "name": "open",
    "description": "The controlled open state of the dialog. Can be binded as `v-model:open`.",
    "type": "boolean",
    "required": false
  }
]'} 

#### Events

:docs-emits-table{name='events-dialog-root' :data='[
  {
    "name": "update:open",
    "description": "Event handler called when the open state of the dialog changes.",
    "type": "[value: boolean]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-dialog-root' :data='[
  {
    "name": "open",
    "description": "Current open state",
    "type": "boolean"
  },
  {
    "name": "close",
    "description": "Close the dialog",
    "type": "(): void"
  }
]'} 
