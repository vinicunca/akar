<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-config-provider' :data='[
  {
    "name": "dir",
    "description": "The global reading direction of your application. This will be inherited by all primitives.",
    "type": "\'ltr\' | \'rtl\'",
    "required": false,
    "default": "\'ltr\'"
  },
  {
    "name": "locale",
    "description": "The global locale of your application. This will be inherited by all primitives.",
    "type": "string",
    "required": false,
    "default": "\'en\'"
  },
  {
    "name": "nonce",
    "description": "The global `nonce` value of your application. This will be inherited by the related primitives.",
    "type": "string",
    "required": false
  },
  {
    "name": "scrollBody",
    "description": "The global scroll body behavior of your application. This will be inherited by the related primitives.",
    "type": "boolean | ScrollBodyOption",
    "required": false,
    "default": "true"
  },
  {
    "name": "useId",
    "description": "The global `useId` injection as a workaround for preventing hydration issue.",
    "type": "(() => string)",
    "required": false
  }
]'} 

#### Exposed

:docs-exposed-table{name='exposed-config-provider' :data='[
  {
    "name": "useId",
    "description": "The global `useId` injection as a workaround for preventing hydration issue.",
    "type": "() => string"
  }
]'} 
