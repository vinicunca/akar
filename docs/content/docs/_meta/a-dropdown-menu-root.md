<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-dropdown-menu-root' :data='[
  {
    "name": "defaultOpen",
    "description": "The open state of the dropdown menu when it is initially rendered. Use when you do not need to control its open state.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "dir",
    "description": "The reading direction of the combobox when applicable.\\n\\nIf omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode.",
    "type": "\'ltr\' | \'rtl\'",
    "required": false
  },
  {
    "name": "modal",
    "description": "The modality of the dropdown menu.\\n\\nWhen set to `true`, interaction with outside elements will be disabled and only menu content will be visible to screen readers.",
    "type": "boolean",
    "required": false,
    "default": "true"
  },
  {
    "name": "open",
    "description": "The controlled open state of the menu. Can be used as `v-model:open`.",
    "type": "boolean",
    "required": false
  }
]'} 

#### Events

:docs-emits-table{name='events-dropdown-menu-root' :data='[
  {
    "name": "update:open",
    "description": "Event handler called when the open state of the dialog changes.",
    "type": "[payload: boolean]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-dropdown-menu-root' :data='[
  {
    "name": "open",
    "description": "Current open state",
    "type": "boolean"
  }
]'} 
