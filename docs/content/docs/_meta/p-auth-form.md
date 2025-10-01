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
    "name": "description",
    "description": "",
    "type": "string",
    "required": false
  },
  {
    "name": "disabled",
    "description": "",
    "type": "boolean",
    "required": false
  },
  {
    "name": "fields",
    "description": "",
    "type": "AuthFormField[]",
    "required": false
  },
  {
    "name": "icon",
    "description": "<p>The icon displayed above the title.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "loading",
    "description": "",
    "type": "boolean",
    "required": false
  },
  {
    "name": "loadingAuto",
    "description": "",
    "type": "boolean",
    "required": false
  },
  {
    "name": "providers",
    "description": "<p>Display a list of Button under the description.\n<code>{ color: 'neutral', variant: 'subtle', block: true }</code>{lang=&quot;ts-type&quot;}</p>\n",
    "type": "PButtonProps[]",
    "required": false
  },
  {
    "name": "schema",
    "description": "",
    "type": "Struct<any, any> | StandardSchemaV1<object, object>",
    "required": false
  },
  {
    "name": "separator",
    "description": "<p>The text displayed in the separator.</p>\n",
    "type": "string | PSeparatorProps",
    "required": false,
    "default": "\"or\""
  },
  {
    "name": "submit",
    "description": "<p>Display a submit button at the bottom of the form.\n<code>{ label: 'Continue', block: true }</code>{lang=&quot;ts-type&quot;}</p>\n",
    "type": "PButtonProps",
    "required": false
  },
  {
    "name": "title",
    "description": "",
    "type": "string",
    "required": false
  },
  {
    "name": "validate",
    "description": "",
    "type": "((state: Partial<any>) => FormError<string>[] | Promise<FormError<string>[]>)",
    "required": false
  },
  {
    "name": "validateOn",
    "description": "",
    "type": "FormInputEvents[]",
    "required": false
  },
  {
    "name": "validateOnInputDelay",
    "description": "",
    "type": "number",
    "required": false
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root?: ClassValue; header?: ClassValue; leading?: ClassValue; leadingIcon?: ClassValue; title?: ClassValue; description?: ClassValue; body?: ClassValue; providers?: ClassValue; checkbox?: ClassValue; select?: ClassValue; password?: ClassValue; otp?: ClassValue; input?: ClassValue; separator?: ClassValue; form?: ClassValue; footer?: ClassValue; }",
    "required": false
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "submit",
    "description": "",
    "type": "[payload: FormSubmitEvent<any>]"
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
