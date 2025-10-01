<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-avatar-image' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'img\'"
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "crossOrigin",
    "description": "",
    "type": "\'\' | \'anonymous\' | \'use-credentials\'",
    "required": false
  },
  {
    "name": "referrerPolicy",
    "description": "",
    "type": "\'\' | \'no-referrer\' | \'no-referrer-when-downgrade\' | \'origin\' | \'origin-when-cross-origin\' | \'same-origin\' | \'strict-origin\' | \'strict-origin-when-cross-origin\' | \'unsafe-url\'",
    "required": false
  },
  {
    "name": "src",
    "description": "",
    "type": "string",
    "required": true
  }
]'} 

#### Events

:docs-emits-table{name='events-avatar-image' :data='[
  {
    "name": "loadingStatusChange",
    "description": "A callback providing information about the loading status of the image. <br>\\n    This is useful in case you want to control more precisely what to render as the image is loading.",
    "type": "[value: ImageLoadingStatus]"
  }
]'} 
