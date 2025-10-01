<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-focus-scope' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'div\'"
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "loop",
    "description": "When `true`, tabbing from last item will focus first tabbable\\nand shift+tab from first item will focus last tababble.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "trapped",
    "description": "When `true`, focus cannot escape the focus scope via keyboard,\\npointer, or a programmatic focus.",
    "type": "boolean",
    "required": false,
    "default": "false"
  }
]'} 

#### Events

:docs-emits-table{name='events-focus-scope' :data='[
  {
    "name": "mountAutoFocus",
    "description": "Event handler called when auto-focusing on mount.\\n    Can be prevented.",
    "type": "[event: Event]"
  },
  {
    "name": "unmountAutoFocus",
    "description": "Event handler called when auto-focusing on unmount.\\n    Can be prevented.",
    "type": "[event: Event]"
  }
]'} 
