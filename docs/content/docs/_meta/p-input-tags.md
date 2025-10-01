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
    "name": "addOnBlur",
    "description": "<p>When <code>true</code> allow adding tags blur input</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "addOnPaste",
    "description": "<p>When <code>true</code>, allow adding tags on paste. Work in conjunction with delimiter prop.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "addOnTab",
    "description": "<p>When <code>true</code> allow adding tags on tab keydown</p>\n",
    "type": "boolean",
    "required": false
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
    "name": "avatar",
    "description": "<p>Display an avatar on the left side.</p>\n",
    "type": "PAvatarProps",
    "required": false
  },
  {
    "name": "color",
    "description": "",
    "type": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"info\" | \"warning\" | \"neutral\"",
    "required": false
  },
  {
    "name": "convertValue",
    "description": "<p>Convert the input value to the desired type. Mandatory when using objects as values and using <code>ATagsInputInput</code></p>\n",
    "type": "((value: string) => AcceptableInputValue)",
    "required": false
  },
  {
    "name": "defaultValue",
    "description": "<p>The value of the tags that should be added. Use when you do not need to control the state of the tags input</p>\n",
    "type": "AcceptableInputValue[]",
    "required": false
  },
  {
    "name": "deleteIcon",
    "description": "<p>The icon displayed to delete a tag.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "delimiter",
    "description": "<p>The character or regular expression to trigger the addition of a new tag. Also used to split tags for <code>@paste</code> event</p>\n",
    "type": "string | RegExp",
    "required": false
  },
  {
    "name": "disabled",
    "description": "<p>When <code>true</code>, prevents the user from interacting with the tags input.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "displayValue",
    "description": "<p>Display the value of the tag. Useful when you want to apply modifications to the value like adding a suffix or when using object as values</p>\n",
    "type": "((value: AcceptableInputValue) => string)",
    "required": false
  },
  {
    "name": "duplicate",
    "description": "<p>When <code>true</code>, allow duplicated tags.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "highlight",
    "description": "<p>Highlight the ring color like a focus state.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "icon",
    "description": "<p>Display an icon based on the <code>leading</code> and <code>trailing</code> props.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "id",
    "description": "",
    "type": "string",
    "required": false
  },
  {
    "name": "leading",
    "description": "<p>When <code>true</code>, the icon will be displayed on the left side.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "leadingIcon",
    "description": "<p>Display an icon on the left side.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "loading",
    "description": "<p>When <code>true</code>, the loading icon will be displayed.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "loadingIcon",
    "description": "<p>The icon when the <code>loading</code> prop is <code>true</code>.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "max",
    "description": "<p>Maximum number of tags.</p>\n",
    "type": "number",
    "required": false
  },
  {
    "name": "maxLength",
    "description": "<p>The maximum number of character allowed.</p>\n",
    "type": "number",
    "required": false
  },
  {
    "name": "modelValue",
    "description": "<p>The controlled value of the tags input. Can be bind as <code>v-model</code>.</p>\n",
    "type": "AcceptableInputValue[] | null",
    "required": false
  },
  {
    "name": "name",
    "description": "<p>The name of the field. Submitted with its owning form as part of a name/value pair.</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "placeholder",
    "description": "<p>The placeholder text when the input is empty.</p>\n",
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
    "name": "trailing",
    "description": "<p>When <code>true</code>, the icon will be displayed on the right side.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "trailingIcon",
    "description": "<p>Display an icon on the right side.</p>\n",
    "type": "string | object",
    "required": false
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
    "type": "{ root?: ClassValue; base?: ClassValue; leading?: ClassValue; leadingIcon?: ClassValue; leadingAvatar?: ClassValue; leadingAvatarSize?: ClassValue; trailing?: ClassValue; trailingIcon?: ClassValue; item?: ClassValue; itemText?: ClassValue; itemDelete?: ClassValue; itemDeleteIcon?: ClassValue; input?: ClassValue; }",
    "required": false
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "addTag",
    "description": "",
    "type": "[payload: AcceptableInputValue]"
  },
  {
    "name": "blur",
    "description": "",
    "type": "[event: FocusEvent]"
  },
  {
    "name": "change",
    "description": "",
    "type": "[event: Event]"
  },
  {
    "name": "focus",
    "description": "",
    "type": "[event: FocusEvent]"
  },
  {
    "name": "invalid",
    "description": "",
    "type": "[payload: AcceptableInputValue]"
  },
  {
    "name": "removeTag",
    "description": "",
    "type": "[payload: AcceptableInputValue]"
  },
  {
    "name": "update:modelValue",
    "description": "",
    "type": "[payload: AcceptableInputValue[]]"
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
