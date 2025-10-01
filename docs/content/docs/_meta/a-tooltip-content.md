<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-tooltip-content' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'div\'"
  },
  {
    "name": "align",
    "description": "The preferred alignment against the trigger.\\nMay change when collisions occur.",
    "type": "\'start\' | \'center\' | \'end\'",
    "required": false
  },
  {
    "name": "alignOffset",
    "description": "An offset in pixels from the `start` or `end` alignment options.",
    "type": "number",
    "required": false
  },
  {
    "name": "ariaLabel",
    "description": "By default, screenreaders will announce the content inside\\nthe component. If this is not descriptive enough, or you have\\ncontent that cannot be announced, use aria-label as a more\\ndescriptive label.",
    "type": "string",
    "required": false
  },
  {
    "name": "arrowPadding",
    "description": "The padding between the arrow and the edges of the content.\\nIf your content has border-radius, this will prevent it from\\noverflowing the corners.",
    "type": "number",
    "required": false
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "avoidCollisions",
    "description": "When `true`, overrides the side and align preferences\\nto prevent collisions with boundary edges.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "collisionBoundary",
    "description": "The element used as the collision boundary. By default\\nthis is the viewport, though you can provide additional\\nelement(s) to be included in this check.",
    "type": "Element | (Element | null)[] | null",
    "required": false
  },
  {
    "name": "collisionPadding",
    "description": "The distance in pixels from the boundary edges where collision\\ndetection should occur. Accepts a number (same for all sides),\\nor a partial padding object, for example: { top: 20, left: 20 }.",
    "type": "number | Partial<Record<Side, number>>",
    "required": false
  },
  {
    "name": "forceMount",
    "description": "Used to force mounting when more control is needed. Useful when\\ncontrolling animation with Vue animation libraries.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "hideWhenDetached",
    "description": "Whether to hide the content when the trigger becomes fully occluded.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "positionStrategy",
    "description": "The type of CSS position property to use.",
    "type": "\'fixed\' | \'absolute\'",
    "required": false
  },
  {
    "name": "side",
    "description": "The preferred side of the trigger to render against when open.\\nWill be reversed when collisions occur and avoidCollisions\\nis enabled.",
    "type": "\'top\' | \'right\' | \'bottom\' | \'left\'",
    "required": false,
    "default": "\'top\'"
  },
  {
    "name": "sideOffset",
    "description": "The distance in pixels from the trigger.",
    "type": "number",
    "required": false
  },
  {
    "name": "sticky",
    "description": "The sticky behavior on the align axis. `partial` will keep the\\ncontent in the boundary as long as the trigger is at least partially\\nin the boundary whilst \'always\' will keep the content in the boundary\\nregardless.",
    "type": "\'always\' | \'partial\'",
    "required": false
  },
  {
    "name": "updatePositionStrategy",
    "description": "Strategy to update the position of the floating element on every animation frame.",
    "type": "\'always\' | \'optimized\'",
    "required": false
  }
]'} 

#### Events

:docs-emits-table{name='events-tooltip-content' :data='[
  {
    "name": "escapeKeyDown",
    "description": "Event handler called when focus moves to the destructive action after opening. It can be prevented by calling `event.preventDefault`",
    "type": "[event: KeyboardEvent]"
  },
  {
    "name": "pointerDownOutside",
    "description": "Event handler called when a pointer event occurs outside the bounds of the component. It can be prevented by calling `event.preventDefault`.",
    "type": "[event: Event]"
  }
]'} 
