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
    "name": "activeColor",
    "description": "<p>The color of the active pagination control.</p>\n",
    "type": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"info\" | \"warning\" | \"neutral\"",
    "required": false,
    "default": "\"primary\""
  },
  {
    "name": "activeVariant",
    "description": "<p>The variant of the active pagination control.</p>\n",
    "type": "\"link\" | \"solid\" | \"outline\" | \"soft\" | \"subtle\" | \"ghost\"",
    "required": false,
    "default": "\"solid\""
  },
  {
    "name": "color",
    "description": "<p>The color of the pagination controls.</p>\n",
    "type": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"info\" | \"warning\" | \"neutral\"",
    "required": false,
    "default": "\"neutral\""
  },
  {
    "name": "defaultPage",
    "description": "<p>The value of the page that should be active when initially rendered.</p>\n<p>Use when you do not need to control the value state.</p>\n",
    "type": "number",
    "required": false
  },
  {
    "name": "disabled",
    "description": "<p>When <code>true</code>, prevents the user from interacting with item</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "ellipsisIcon",
    "description": "<p>The icon to use for the ellipsis control.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "firstIcon",
    "description": "<p>The icon to use for the first page control.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "itemsPerPage",
    "description": "<p>Number of items per page</p>\n",
    "type": "number",
    "required": false,
    "default": "10"
  },
  {
    "name": "lastIcon",
    "description": "<p>The icon to use for the last page control.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "nextIcon",
    "description": "<p>The icon to use for the next page control.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "page",
    "description": "<p>The controlled value of the current page. Can be binded as <code>v-model:page</code>.</p>\n",
    "type": "number",
    "required": false
  },
  {
    "name": "prevIcon",
    "description": "<p>The icon to use for the previous page control.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "showControls",
    "description": "<p>Whether to show the first, previous, next, and last controls.</p>\n",
    "type": "boolean",
    "required": false,
    "default": "true"
  },
  {
    "name": "showEdges",
    "description": "<p>When <code>true</code>, always show first page, last page, and ellipsis</p>\n",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "siblingCount",
    "description": "<p>Number of sibling should be shown around the current page</p>\n",
    "type": "number",
    "required": false,
    "default": "2"
  },
  {
    "name": "size",
    "description": "",
    "type": "\"md\" | \"xs\" | \"sm\" | \"lg\" | \"xl\"",
    "required": false
  },
  {
    "name": "to",
    "description": "<p>A function to render page controls as links.</p>\n",
    "type": "((page: number) => string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric)",
    "required": false
  },
  {
    "name": "total",
    "description": "<p>Number of items in your list</p>\n",
    "type": "number",
    "required": false,
    "default": "0"
  },
  {
    "name": "variant",
    "description": "<p>The variant of the pagination controls.</p>\n",
    "type": "\"link\" | \"solid\" | \"outline\" | \"soft\" | \"subtle\" | \"ghost\"",
    "required": false,
    "default": "\"outline\""
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root?: ClassValue; list?: ClassValue; ellipsis?: ClassValue; label?: ClassValue; first?: ClassValue; prev?: ClassValue; item?: ClassValue; next?: ClassValue; last?: ClassValue; }",
    "required": false
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "update:page",
    "description": "",
    "type": "[value: number]"
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
