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
    "name": "color",
    "description": "",
    "type": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"info\" | \"warning\" | \"neutral\"",
    "required": false
  },
  {
    "name": "defaultValue",
    "description": "",
    "type": "string | number",
    "required": false
  },
  {
    "name": "items",
    "description": "",
    "type": "PTimelineItem[]",
    "required": true
  },
  {
    "name": "modelValue",
    "description": "",
    "type": "string | number",
    "required": false
  },
  {
    "name": "orientation",
    "description": "<p>The orientation of the Timeline.</p>\n",
    "type": "\"vertical\" | \"horizontal\"",
    "required": false,
    "default": "\"vertical\""
  },
  {
    "name": "reverse",
    "description": "",
    "type": "boolean",
    "required": false
  },
  {
    "name": "size",
    "description": "",
    "type": "\"md\" | \"xs\" | \"sm\" | \"lg\" | \"xl\" | \"3xs\" | \"2xs\" | \"2xl\" | \"3xl\"",
    "required": false
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root?: ClassValue; item?: ClassValue; container?: ClassValue; indicator?: ClassValue; separator?: ClassValue; wrapper?: ClassValue; date?: ClassValue; title?: ClassValue; description?: ClassValue; }",
    "required": false
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "update:modelValue",
    "description": "",
    "type": "[value: string | number]"
  }
]" />

<DocsSlotsTable :data="[
  {
    "name": "item",
    "description": "",
    "type": "PTimelineItem"
  }
]" />
