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
    "description": "<p>Display a list of actions:</p>\n<ul>\n<li>under the title and description when orientation is <code>vertical</code></li>\n<li>next to the close button when orientation is <code>horizontal</code>\n<code>{ size: 'xs' }</code>{lang=&quot;ts-type&quot;}</li>\n</ul>\n",
    "type": "PButtonProps[]",
    "required": false
  },
  {
    "name": "avatar",
    "description": "",
    "type": "PAvatarProps",
    "required": false
  },
  {
    "name": "close",
    "description": "<p>Display a close button to dismiss the alert.\n<code>{ size: 'md', color: 'neutral', variant: 'link' }</code>{lang=&quot;ts-type&quot;}</p>\n",
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
    "name": "description",
    "description": "",
    "type": "string",
    "required": false
  },
  {
    "name": "icon",
    "description": "",
    "type": "string | object",
    "required": false
  },
  {
    "name": "orientation",
    "description": "<p>The orientation between the content and the actions.</p>\n",
    "type": "\"vertical\" | \"horizontal\"",
    "required": false,
    "default": "\"vertical\""
  },
  {
    "name": "title",
    "description": "",
    "type": "string",
    "required": false
  },
  {
    "name": "variant",
    "description": "",
    "type": "\"solid\" | \"outline\" | \"soft\" | \"subtle\"",
    "required": false
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root?: ClassValue; wrapper?: ClassValue; title?: ClassValue; description?: ClassValue; icon?: ClassValue; avatar?: ClassValue; avatarSize?: ClassValue; actions?: ClassValue; close?: ClassValue; }",
    "required": false
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "update:open",
    "description": "",
    "type": "[value: boolean]"
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
