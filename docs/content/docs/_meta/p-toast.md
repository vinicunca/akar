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
    "description": "<p>Display a close button to dismiss the toast.\n<code>{ size: 'md', color: 'neutral', variant: 'link' }</code>{lang=&quot;ts-type&quot;}</p>\n",
    "type": "boolean | Partial<PButtonProps>",
    "required": false,
    "default": "true"
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
    "name": "defaultOpen",
    "description": "<p>The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "description",
    "description": "",
    "type": "StringOrVNode",
    "required": false
  },
  {
    "name": "duration",
    "description": "<p>Time in milliseconds that toast should remain visible for. Overrides value\ngiven to <code>AToastProvider</code>.</p>\n",
    "type": "number",
    "required": false
  },
  {
    "name": "icon",
    "description": "",
    "type": "string | object",
    "required": false
  },
  {
    "name": "open",
    "description": "<p>The controlled open state of the dialog. Can be bind as <code>v-model:open</code>.</p>\n",
    "type": "boolean",
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
    "name": "progress",
    "description": "<p>Display a progress bar showing the toast's remaining duration.\n<code>{ size: 'sm' }</code>{lang=&quot;ts-type&quot;}</p>\n",
    "type": "boolean | Pick<PProgressProps, \"pohon\" | \"color\">",
    "required": false,
    "default": "true"
  },
  {
    "name": "title",
    "description": "",
    "type": "StringOrVNode",
    "required": false
  },
  {
    "name": "type",
    "description": "<p>Control the sensitivity of the toast for accessibility purposes.</p>\n<p>For toasts that are the result of a user action, choose <code>foreground</code>. Toasts generated from background tasks should use <code>background</code>.</p>\n",
    "type": "\"background\" | \"foreground\"",
    "required": false
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root?: ClassValue; wrapper?: ClassValue; title?: ClassValue; description?: ClassValue; icon?: ClassValue; avatar?: ClassValue; avatarSize?: ClassValue; actions?: ClassValue; progress?: ClassValue; close?: ClassValue; }",
    "required": false
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "escapeKeyDown",
    "description": "",
    "type": "[event: KeyboardEvent]"
  },
  {
    "name": "pause",
    "description": "",
    "type": "[]"
  },
  {
    "name": "resume",
    "description": "",
    "type": "[]"
  },
  {
    "name": "swipeCancel",
    "description": "",
    "type": "[event: SwipeEvent]"
  },
  {
    "name": "swipeEnd",
    "description": "",
    "type": "[event: SwipeEvent]"
  },
  {
    "name": "swipeMove",
    "description": "",
    "type": "[event: SwipeEvent]"
  },
  {
    "name": "swipeStart",
    "description": "",
    "type": "[event: SwipeEvent]"
  },
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
