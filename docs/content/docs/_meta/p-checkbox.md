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
    "description": "<p>The value of the checkbox when it is initially rendered. Use when you do not need to control its value.</p>\n",
    "type": "boolean | \"indeterminate\"",
    "required": false
  },
  {
    "name": "description",
    "description": "",
    "type": "string",
    "required": false
  },
  {
    "name": "disabled",
    "description": "<p>When <code>true</code>, prevents the user from interacting with the checkbox</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "icon",
    "description": "<p>The icon displayed when checked.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "id",
    "description": "<p>Id of the element</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "indeterminateIcon",
    "description": "<p>The icon displayed when the checkbox is indeterminate.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "indicator",
    "description": "<p>Position of the indicator.</p>\n",
    "type": "\"hidden\" | \"start\" | \"end\"",
    "required": false
  },
  {
    "name": "label",
    "description": "",
    "type": "string",
    "required": false
  },
  {
    "name": "modelValue",
    "description": "",
    "type": "boolean | \"indeterminate\"",
    "required": false
  },
  {
    "name": "name",
    "description": "<p>The name of the field. Submitted with its owning form as part of a name/value pair.</p>\n",
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
    "name": "value",
    "description": "<p>The value given as data when submitted with a <code>name</code>.</p>\n",
    "type": "AcceptableValue",
    "required": false
  },
  {
    "name": "variant",
    "description": "",
    "type": "\"list\" | \"card\"",
    "required": false
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root?: ClassValue; container?: ClassValue; base?: ClassValue; indicator?: ClassValue; icon?: ClassValue; wrapper?: ClassValue; label?: ClassValue; description?: ClassValue; }",
    "required": false
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "change",
    "description": "",
    "type": "[event: Event]"
  },
  {
    "name": "update:modelValue",
    "description": "",
    "type": "[value: boolean | \"indeterminate\"]"
  }
]" />

<DocsSlotsTable :data="[
  {
    "name": "label",
    "description": "",
    "type": "string | undefined"
  }
]" />
