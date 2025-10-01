<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-splitter-panel' :data='[
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
    "name": "collapsedSize",
    "description": "The size of panel when it is collapsed.",
    "type": "number",
    "required": false
  },
  {
    "name": "collapsible",
    "description": "Should panel collapse when resized beyond its `minSize`. When `true`, it will be collapsed to `collapsedSize`.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "defaultSize",
    "description": "Initial size of panel (numeric value between 1-100)",
    "type": "number",
    "required": false
  },
  {
    "name": "id",
    "description": "Panel id (unique within group); falls back to `useId` when not provided",
    "type": "string",
    "required": false
  },
  {
    "name": "maxSize",
    "description": "The maximum allowable size of panel (numeric value between 1-100); defaults to `100`",
    "type": "number",
    "required": false
  },
  {
    "name": "minSize",
    "description": "The minimum allowable size of panel (numeric value between 1-100); defaults to `10`",
    "type": "number",
    "required": false
  },
  {
    "name": "order",
    "description": "The order of panel within group; required for groups with conditionally rendered panels",
    "type": "number",
    "required": false
  }
]'} 

#### Events

:docs-emits-table{name='events-splitter-panel' :data='[
  {
    "name": "collapse",
    "description": "Event handler called when panel is collapsed.",
    "type": "[]"
  },
  {
    "name": "expand",
    "description": "Event handler called when panel is expanded.",
    "type": "[]"
  },
  {
    "name": "resize",
    "description": "Event handler called when panel is resized; size parameter is a numeric value between 1-100.",
    "type": "[size: number, prevSize: number]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-splitter-panel' :data='[
  {
    "name": "isCollapsed",
    "description": "Is the panel collapsed",
    "type": "boolean"
  },
  {
    "name": "isExpanded",
    "description": "Is the panel expanded",
    "type": "boolean"
  },
  {
    "name": "collapse",
    "description": "If panel is `collapsible`, collapse it fully.",
    "type": "(): void"
  },
  {
    "name": "expand",
    "description": "If panel is currently collapsed, expand it to its most recent size.",
    "type": "(): void"
  },
  {
    "name": "resize",
    "description": "Resize panel to the specified percentage (1 - 100).",
    "type": "(size: number): void"
  }
]'} 

#### Exposed

:docs-exposed-table{name='exposed-splitter-panel' :data='[
  {
    "name": "collapse",
    "description": "If panel is `collapsible`, collapse it fully.",
    "type": "() => void"
  },
  {
    "name": "expand",
    "description": "If panel is currently collapsed, expand it to its most recent size.",
    "type": "() => void"
  },
  {
    "name": "getSize",
    "description": "Gets the current size of the panel as a percentage (1 - 100).",
    "type": "() => number"
  },
  {
    "name": "resize",
    "description": "Resize panel to the specified percentage (1 - 100).",
    "type": "(size: number) => void"
  }
]'} 
