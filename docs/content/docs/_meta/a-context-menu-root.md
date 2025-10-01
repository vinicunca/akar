<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-context-menu-root' :data='[
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
    "name": "pressOpenDelay",
    "description": "The duration from when the trigger is pressed until the menu openes.",
    "type": "number",
    "required": false,
    "default": "700"
  }
]'} 

#### Events

:docs-emits-table{name='events-context-menu-root' :data='[
  {
    "name": "update:open",
    "description": "Event handler called when the open state of the combobox changes.",
    "type": "[payload: boolean]"
  }
]'} 
