<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-dialog-content' :data='[
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
    "name": "disableOutsidePointerEvents",
    "description": "When `true`, hover/focus/click interactions will be disabled on elements outside\\nthe `DismissableLayer`. Users will need to click twice on outside elements to\\ninteract with them: once to close the `DismissableLayer`, and again to trigger the element.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "forceMount",
    "description": "Used to force mounting when more control is needed. Useful when\\ncontrolling animation with Vue animation libraries.",
    "type": "boolean",
    "required": false
  }
]'} 

#### Events

:docs-emits-table{name='events-dialog-content' :data='[
  {
    "name": "closeAutoFocus",
    "description": "Event handler called when auto-focusing on close.\\n    Can be prevented.",
    "type": "[event: Event]"
  },
  {
    "name": "escapeKeyDown",
    "description": "",
    "type": "[event: KeyboardEvent]"
  },
  {
    "name": "focusOutside",
    "description": "",
    "type": "[event: FocusOutsideEvent]"
  },
  {
    "name": "interactOutside",
    "description": "",
    "type": "[event: PointerDownOutsideEvent | FocusOutsideEvent]"
  },
  {
    "name": "openAutoFocus",
    "description": "Event handler called when auto-focusing on open.\\n    Can be prevented.",
    "type": "[event: Event]"
  },
  {
    "name": "pointerDownOutside",
    "description": "",
    "type": "[event: PointerDownOutsideEvent]"
  }
]'} 
