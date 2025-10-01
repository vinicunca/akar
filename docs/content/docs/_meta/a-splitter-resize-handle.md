<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-splitter-resize-handle' :data='[
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
    "name": "disabled",
    "description": "Disable drag handle",
    "type": "boolean",
    "required": false
  },
  {
    "name": "hitAreaMargins",
    "description": "Allow this much margin when determining resizable handle hit detection",
    "type": "PointerHitAreaMargins",
    "required": false
  },
  {
    "name": "id",
    "description": "Resize handle id (unique within group); falls back to `useId` when not provided",
    "type": "string",
    "required": false
  },
  {
    "name": "nonce",
    "description": "Will add `nonce` attribute to the style tag which can be used by Content Security Policy. <br> If omitted, inherits globally from `ConfigProvider`.",
    "type": "string",
    "required": false
  },
  {
    "name": "tabindex",
    "description": "Tabindex for the handle",
    "type": "number",
    "required": false,
    "default": "0"
  }
]'} 

#### Events

:docs-emits-table{name='events-splitter-resize-handle' :data='[
  {
    "name": "dragging",
    "description": "Event handler called when dragging the handler.",
    "type": "[isDragging: boolean]"
  }
]'} 
