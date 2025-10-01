<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    "name": "alignFlip",
    "description": "<p>Flip alignment when colliding with boundary.\nMay only occur when <code>prioritizePosition</code> is true.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "alignOffset",
    "description": "<p>An offset in pixels from the <code>start</code> or <code>end</code> alignment options.</p>\n",
    "type": "number",
    "required": false
  },
  {
    "name": "avoidCollisions",
    "description": "<p>When <code>true</code>, overrides the side and align preferences\nto prevent collisions with boundary edges.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "checkedIcon",
    "description": "",
    "type": "string | object",
    "required": false
  },
  {
    "name": "collisionBoundary",
    "description": "<p>The element used as the collision boundary. By default\nthis is the viewport, though you can provide additional\nelement(s) to be included in this check.</p>\n",
    "type": "Element | (Element | null)[] | null",
    "required": false
  },
  {
    "name": "collisionPadding",
    "description": "<p>The distance in pixels from the boundary edges where collision\ndetection should occur. Accepts a number (same for all sides),\nor a partial padding object, for example: { top: 20, left: 20 }.</p>\n",
    "type": "number | Partial<Record<Side, number>>",
    "required": false
  },
  {
    "name": "disableUpdateOnLayoutShift",
    "description": "<p>Whether to disable the update position for the content when the layout shifted.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "externalIcon",
    "description": "",
    "type": "string | boolean | object",
    "required": false
  },
  {
    "name": "hideWhenDetached",
    "description": "<p>Whether to hide the content when the trigger becomes fully occluded.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "items",
    "description": "",
    "type": "ArrayOrNested<PContextMenuItem>",
    "required": false
  },
  {
    "name": "labelKey",
    "description": "",
    "type": "string | number",
    "required": true
  },
  {
    "name": "loadingIcon",
    "description": "",
    "type": "string | object",
    "required": false
  },
  {
    "name": "loop",
    "description": "<p>When <code>true</code>, keyboard navigation will loop from last item to first, and vice versa.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "pohonOverride",
    "description": "",
    "type": "{ content?: ClassValue; viewport?: ClassValue; group?: ClassValue; label?: ClassValue; separator?: ClassValue; item?: ClassValue; itemLeadingIcon?: ClassValue; itemLeadingAvatar?: ClassValue; itemLeadingAvatarSize?: ClassValue; itemTrailing?: ClassValue; itemTrailingIcon?: ClassValue; itemTrailingKbds?: ClassValue; itemTrailingKbdsSize?: ClassValue; itemLabel?: ClassValue; itemLabelExternalIcon?: ClassValue; }",
    "required": false
  },
  {
    "name": "portal",
    "description": "",
    "type": "string | boolean | HTMLElement",
    "required": false
  },
  {
    "name": "positionStrategy",
    "description": "<p>The type of CSS position property to use.</p>\n",
    "type": "\"fixed\" | \"absolute\"",
    "required": false
  },
  {
    "name": "prioritizePosition",
    "description": "<p>Force content to be position within the viewport.</p>\n<p>Might overlap the reference element, which may not be desired.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "reference",
    "description": "<p>The custom element or virtual element that will be set as the reference\nto position the floating element.</p>\n<p>If provided, it will replace the default anchor element.</p>\n",
    "type": "ReferenceElement",
    "required": false
  },
  {
    "name": "sideFlip",
    "description": "<p>Flip to the opposite side when colliding with boundary.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "sticky",
    "description": "<p>The sticky behavior on the align axis. <code>partial</code> will keep the\ncontent in the boundary as long as the trigger is at least partially\nin the boundary whilst &quot;always&quot; will keep the content in the boundary\nregardless.</p>\n",
    "type": "\"always\" | \"partial\"",
    "required": false
  },
  {
    "name": "sub",
    "description": "",
    "type": "boolean",
    "required": false
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ content: (props?: Record<string, any>) => string; viewport: (props?: Record<string, any>) => string; group: (props?: Record<string, any>) => string; label: (props?: Record<string, any>) => string; separator: (props?: Record<string, any>) => string; item: (props?: Record<string, any>) => string; itemLeadingIcon: (props?: Record<string, any>) => string; itemLeadingAvatar: (props?: Record<string, any>) => string; itemLeadingAvatarSize: (props?: Record<string, any>) => string; itemTrailing: (props?: Record<string, any>) => string; itemTrailingIcon: (props?: Record<string, any>) => string; itemTrailingKbds: (props?: Record<string, any>) => string; itemTrailingKbdsSize: (props?: Record<string, any>) => string; itemLabel: (props?: Record<string, any>) => string; itemLabelExternalIcon: (props?: Record<string, any>) => string; }",
    "required": true
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "closeAutoFocus",
    "description": "",
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
    "name": "pointerDownOutside",
    "description": "",
    "type": "[event: PointerDownOutsideEvent]"
  }
]" />

<DocsSlotsTable :data="[
  {
    "description": "",
    "type": ""
  },
  {
    "description": "",
    "type": ""
  }
]" />
