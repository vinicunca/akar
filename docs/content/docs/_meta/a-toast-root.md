<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-toast-root' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'li\'"
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "defaultOpen",
    "description": "The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.",
    "type": "boolean",
    "required": false,
    "default": "true"
  },
  {
    "name": "duration",
    "description": "Time in milliseconds that toast should remain visible for. Overrides value\\ngiven to `AToastProvider`.",
    "type": "number",
    "required": false
  },
  {
    "name": "forceMount",
    "description": "Used to force mounting when more control is needed. Useful when\\ncontrolling animation with Vue animation libraries.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "open",
    "description": "The controlled open state of the dialog. Can be bind as `v-model:open`.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "type",
    "description": "Control the sensitivity of the toast for accessibility purposes.\\n\\nFor toasts that are the result of a user action, choose `foreground`. Toasts generated from background tasks should use `background`.",
    "type": "\'foreground\' | \'background\'",
    "required": false,
    "default": "\'foreground\'"
  }
]'} 

#### Events

:docs-emits-table{name='events-toast-root' :data='[
  {
    "name": "escapeKeyDown",
    "description": "Event handler called when the escape key is down. It can be prevented by calling `event.preventDefault`.",
    "type": "[event: KeyboardEvent]"
  },
  {
    "name": "pause",
    "description": "Event handler called when the dismiss timer is paused. This occurs when the pointer is moved over the viewport, the viewport is focused or when the window is blurred.",
    "type": "[]"
  },
  {
    "name": "resume",
    "description": "Event handler called when the dismiss timer is resumed. This occurs when the pointer is moved away from the viewport, the viewport is blurred or when the window is focused.",
    "type": "[]"
  },
  {
    "name": "swipeCancel",
    "description": "Event handler called when swipe interaction is cancelled. It can be prevented by calling `event.preventDefault`.",
    "type": "[event: SwipeEvent]"
  },
  {
    "name": "swipeEnd",
    "description": "Event handler called at the end of a swipe interaction. It can be prevented by calling `event.preventDefault`.",
    "type": "[event: SwipeEvent]"
  },
  {
    "name": "swipeMove",
    "description": "Event handler called during a swipe interaction. It can be prevented by calling `event.preventDefault`.",
    "type": "[event: SwipeEvent]"
  },
  {
    "name": "swipeStart",
    "description": "Event handler called when starting a swipe interaction. It can be prevented by calling `event.preventDefault`.",
    "type": "[event: SwipeEvent]"
  },
  {
    "name": "update:open",
    "description": "Event handler called when the open state changes",
    "type": "[value: boolean]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-toast-root' :data='[
  {
    "name": "open",
    "description": "Current open state",
    "type": "boolean"
  },
  {
    "name": "remaining",
    "description": "Remaining time (in ms)",
    "type": "number"
  },
  {
    "name": "duration",
    "description": "Total time the toast will remain visible for (in ms)",
    "type": "number"
  }
]'} 
