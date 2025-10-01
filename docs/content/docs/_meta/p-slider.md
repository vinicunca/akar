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
    "description": "<p>The value of the slider when initially rendered. Use when you do not need to control the state of the slider.</p>\n",
    "type": "number | number[]",
    "required": false
  },
  {
    "name": "disabled",
    "description": "<p>When <code>true</code>, prevents the user from interacting with the slider.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "inverted",
    "description": "<p>Whether the slider is visually inverted.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "max",
    "description": "<p>The maximum value for the range.</p>\n",
    "type": "number",
    "required": false,
    "default": "100"
  },
  {
    "name": "min",
    "description": "<p>The minimum value for the range.</p>\n",
    "type": "number",
    "required": false,
    "default": "0"
  },
  {
    "name": "minStepsBetweenThumbs",
    "description": "<p>The minimum permitted steps between multiple thumbs.</p>\n",
    "type": "number",
    "required": false
  },
  {
    "name": "modelValue",
    "description": "",
    "type": "number | number[]",
    "required": false
  },
  {
    "name": "name",
    "description": "<p>The name of the field. Submitted with its owning form as part of a name/value pair.</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "orientation",
    "description": "<p>The orientation of the slider.</p>\n",
    "type": "\"vertical\" | \"horizontal\"",
    "required": false,
    "default": "\"horizontal\""
  },
  {
    "name": "size",
    "description": "",
    "type": "\"md\" | \"xs\" | \"sm\" | \"lg\" | \"xl\"",
    "required": false
  },
  {
    "name": "step",
    "description": "<p>The stepping interval.</p>\n",
    "type": "number",
    "required": false,
    "default": "1"
  },
  {
    "name": "tooltip",
    "description": "<p>Display a tooltip around the slider thumbs with the current value.\n<code>{ disableClosingTrigger: true }</code>{lang=&quot;ts-type&quot;}</p>\n",
    "type": "boolean | PTooltipProps",
    "required": false
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root?: ClassValue; track?: ClassValue; range?: ClassValue; thumb?: ClassValue; }",
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
    "type": "[value: number | number[]]"
  }
]" />
