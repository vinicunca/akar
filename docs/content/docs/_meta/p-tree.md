<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    "name": "as",
    "description": "<p>The element or component this component should render as.</p>\n",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\"div\""
  },
  {
    "name": "bubbleSelect",
    "description": "<p>When <code>true</code>, selecting children will update the parent state.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "collapsedIcon",
    "description": "<p>The icon displayed when a parent node is collapsed.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "color",
    "description": "",
    "type": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"info\" | \"warning\" | \"neutral\"",
    "required": false
  },
  {
    "name": "defaultExpanded",
    "description": "<p>The value of the expanded tree when initially rendered. Use when you do not need to control the state of the expanded tree</p>\n",
    "type": "string[]",
    "required": false
  },
  {
    "name": "defaultValue",
    "description": "<p>The value of the Tree when initially rendered. Use when you do not need to control the state of the Tree.</p>\n",
    "type": "PTreeItem | PTreeItem[]",
    "required": false
  },
  {
    "name": "disabled",
    "description": "<p>When <code>true</code>, prevents the user from interacting with tree</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "expanded",
    "description": "<p>The controlled value of the expanded item. Can be binded with with <code>v-model</code>.</p>\n",
    "type": "string[]",
    "required": false
  },
  {
    "name": "expandedIcon",
    "description": "<p>The icon displayed when a parent node is expanded.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "getKey",
    "description": "<p>This function is passed the index of each item and should return a unique key for that item</p>\n",
    "type": "((val: PTreeItem) => string)",
    "required": false
  },
  {
    "name": "items",
    "description": "",
    "type": "PTreeItem[]",
    "required": false
  },
  {
    "name": "labelKey",
    "description": "<p>The key used to get the label from the item.</p>\n",
    "type": "string | number",
    "required": false,
    "default": "\"label\""
  },
  {
    "name": "modelValue",
    "description": "<p>The controlled value of the Tree. Can be bind as <code>v-model</code>.</p>\n",
    "type": "PTreeItem | PTreeItem[]",
    "required": false
  },
  {
    "name": "multiple",
    "description": "<p>Whether multiple options can be selected or not.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "propagateSelect",
    "description": "<p>When <code>true</code>, selecting parent will select the descendants.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "selectionBehavior",
    "description": "<p>How multiple selection should behave in the collection.</p>\n",
    "type": "\"replace\" | \"toggle\"",
    "required": false
  },
  {
    "name": "size",
    "description": "",
    "type": "\"md\" | \"xs\" | \"sm\" | \"lg\" | \"xl\"",
    "required": false
  },
  {
    "name": "trailingIcon",
    "description": "<p>The icon displayed on the right side of a parent node.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root?: ClassValue; item?: ClassValue; listWithChildren?: ClassValue; itemWithChildren?: ClassValue; link?: ClassValue; linkLeadingIcon?: ClassValue; linkLabel?: ClassValue; linkTrailing?: ClassValue; linkTrailingIcon?: ClassValue; }",
    "required": false
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "update:expanded",
    "description": "",
    "type": "[val: string[]]"
  },
  {
    "name": "update:modelValue",
    "description": "",
    "type": "[val: PTreeItem | PTreeItem[]]"
  }
]" />

<DocsSlotsTable :data="[
  {
    "name": "item",
    "description": "",
    "type": "PTreeItem"
  },
  {
    "name": "index",
    "description": "",
    "type": "number"
  },
  {
    "name": "level",
    "description": "",
    "type": "number"
  },
  {
    "name": "expanded",
    "description": "",
    "type": "boolean"
  },
  {
    "name": "selected",
    "description": "",
    "type": "boolean"
  }
]" />
