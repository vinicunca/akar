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
    "name": "actions",
    "description": "<p>Display a list of actions next to the title.\n<code>{ color: 'neutral', size: 'xs' }</code>{lang=&quot;ts-type&quot;}</p>\n",
    "type": "PButtonProps[]",
    "required": false
  },
  {
    "name": "close",
    "description": "<p>Display a close button to dismiss the banner.\n<code>{ size: 'md', color: 'neutral', variant: 'ghost' }</code>{lang=&quot;ts-type&quot;}</p>\n",
    "type": "boolean | Partial<PButtonProps>",
    "required": false
  },
  {
    "name": "closeIcon",
    "description": "<p>The icon displayed in the close button.</p>\n",
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
    "name": "icon",
    "description": "<p>The icon displayed next to the title.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "id",
    "description": "<p>A unique id saved to local storage to remember if the banner has been dismissed.\nChange this value to show the banner again.</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "target",
    "description": "",
    "type": "(string & {}) | \"_blank\" | \"_parent\" | \"_self\" | \"_top\" | null",
    "required": false
  },
  {
    "name": "title",
    "description": "",
    "type": "string",
    "required": false
  },
  {
    "name": "to",
    "description": "",
    "type": "string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric",
    "required": false
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root?: ClassValue; container?: ClassValue; left?: ClassValue; center?: ClassValue; right?: ClassValue; icon?: ClassValue; title?: ClassValue; actions?: ClassValue; close?: ClassValue; }",
    "required": false
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "close",
    "description": "",
    "type": "[]"
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
