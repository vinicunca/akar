<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    "name": "as",
    "description": "<p>The element or component this component should render as.</p>\n",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\"nav\""
  },
  {
    "name": "color",
    "description": "",
    "type": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"info\" | \"warning\" | \"neutral\"",
    "required": false
  },
  {
    "name": "defaultOpen",
    "description": "<p>The open state of the collapsible when it is initially rendered. &lt;br&gt; Use when you do not need to control its open state.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "highlight",
    "description": "<p>Display a line next to the active link.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "highlightColor",
    "description": "",
    "type": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"info\" | \"warning\" | \"neutral\"",
    "required": false
  },
  {
    "name": "links",
    "description": "",
    "type": "PContentTocLink[]",
    "required": false
  },
  {
    "name": "open",
    "description": "<p>The controlled open state of the collapsible. Can be binded with <code>v-model</code>.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "title",
    "description": "<p>The title of the table of contents.</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "trailingIcon",
    "description": "<p>The icon displayed to collapse the content.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root?: ClassValue; container?: ClassValue; top?: ClassValue; bottom?: ClassValue; trigger?: ClassValue; title?: ClassValue; trailing?: ClassValue; trailingIcon?: ClassValue; content?: ClassValue; list?: ClassValue; listWithChildren?: ClassValue; item?: ClassValue; itemWithChildren?: ClassValue; link?: ClassValue; linkText?: ClassValue; indicator?: ClassValue; }",
    "required": false
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "move",
    "description": "",
    "type": "[id: string]"
  },
  {
    "name": "update:open",
    "description": "",
    "type": "[value: boolean]"
  }
]" />

<DocsSlotsTable :data="[
  {
    "name": "open",
    "description": "",
    "type": "boolean"
  }
]" />
