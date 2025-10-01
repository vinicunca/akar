<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    "name": "as",
    "description": "<p>The element or component this component should render as.</p>\n",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\"header\""
  },
  {
    "name": "menu",
    "description": "<p>The props for the header menu component.</p>\n",
    "type": "PDialogProps | PDrawerProps | PSlideoverProps",
    "required": false
  },
  {
    "name": "mode",
    "description": "<p>The mode of the header menu.</p>\n",
    "type": "\"slideover\" | \"dialog\" | \"drawer\"",
    "required": false,
    "default": "\"dialog\" as never"
  },
  {
    "name": "open",
    "description": "",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "title",
    "description": "",
    "type": "string",
    "required": false,
    "default": "\"Pohon\""
  },
  {
    "name": "to",
    "description": "",
    "type": "string",
    "required": false,
    "default": "\"/\""
  },
  {
    "name": "toggle",
    "description": "<p>Customize the toggle button to open the header menu displayed when the <code>content</code> slot is used.\n<code>{ color: 'neutral', variant: 'ghost' }</code>{lang=&quot;ts-type&quot;}</p>\n",
    "type": "boolean | Partial<PButtonProps>",
    "required": false,
    "default": "true"
  },
  {
    "name": "toggleSide",
    "description": "<p>The side to render the toggle button on.</p>\n",
    "type": "\"left\" | \"right\"",
    "required": false,
    "default": "\"right\""
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root?: ClassValue; container?: ClassValue; left?: ClassValue; center?: ClassValue; right?: ClassValue; title?: ClassValue; toggle?: ClassValue; content?: ClassValue; overlay?: ClassValue; header?: ClassValue; body?: ClassValue; }",
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
