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
    "name": "autofocus",
    "description": "",
    "type": "boolean",
    "required": false
  },
  {
    "name": "autofocusDelay",
    "description": "",
    "type": "number",
    "required": false,
    "default": "0"
  },
  {
    "name": "color",
    "description": "",
    "type": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"info\" | \"warning\" | \"neutral\"",
    "required": false
  },
  {
    "name": "defaultValue",
    "description": "<p>The default value of the pin inputs when it is initially rendered. Use when you do not need to control its checked state.</p>\n",
    "type": "string[]",
    "required": false
  },
  {
    "name": "disabled",
    "description": "<p>When <code>true</code>, prevents the user from interacting with the pin input</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "highlight",
    "description": "",
    "type": "boolean",
    "required": false
  },
  {
    "name": "id",
    "description": "<p>Id of the element</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "length",
    "description": "<p>The number of input fields.</p>\n",
    "type": "string | number",
    "required": false,
    "default": "5"
  },
  {
    "name": "mask",
    "description": "<p>When <code>true</code>, pin inputs will be treated as password.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "modelValue",
    "description": "<p>The controlled checked state of the pin input. Can be binded as <code>v-model</code>.</p>\n",
    "type": "string[] | null",
    "required": false
  },
  {
    "name": "name",
    "description": "<p>The name of the field. Submitted with its owning form as part of a name/value pair.</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "otp",
    "description": "<p>When <code>true</code>, mobile devices will autodetect the OTP from messages or clipboard, and enable the autocomplete field.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "placeholder",
    "description": "<p>The placeholder character to use for empty pin-inputs.</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "required",
    "description": "<p>When <code>true</code>, indicates that the user must set the value before the owning form can be submitted.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "size",
    "description": "",
    "type": "\"md\" | \"xs\" | \"sm\" | \"lg\" | \"xl\"",
    "required": false
  },
  {
    "name": "type",
    "description": "<p>Input type for the inputs.</p>\n",
    "type": "\"number\" | \"text\"",
    "required": false,
    "default": "\"text\" as never"
  },
  {
    "name": "variant",
    "description": "",
    "type": "\"outline\" | \"soft\" | \"subtle\" | \"ghost\" | \"none\"",
    "required": false
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root?: ClassValue; base?: ClassValue; }",
    "required": false
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "blur",
    "description": "",
    "type": "[event: Event]"
  },
  {
    "name": "change",
    "description": "",
    "type": "[event: Event]"
  },
  {
    "name": "complete",
    "description": "",
    "type": "[value: string[]]"
  },
  {
    "name": "update:modelValue",
    "description": "",
    "type": "[value: string[]]"
  }
]" />
