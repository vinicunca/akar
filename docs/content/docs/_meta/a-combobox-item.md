<!-- This file was automatic generated. Do not edit it manually -->

:docs-props-table{:data='[
  {
    "name": "as",
    "description": "<p>The element or component this component should render as. Can be overwritten by <code>asChild</code>.</p>\n",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\"div\""
  },
  {
    "name": "asChild",
    "description": "<p>Change the default rendered element for the one passed as a child, merging their props and behavior.</p>\n<p>Read our <a href=\"https://akar.vinicunca.dev/core/guides/composition\">Composition</a> guide for more details.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "disabled",
    "description": "<p>When <code>true</code>, prevents the user from interacting with the item.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "textValue",
    "description": "<p>A string representation of the item contents.</p>\n<p>If the children are not plain text, then the <code>textValue</code> prop must also be set to a plain text representation, which will be used for autocomplete in the ComboBox.</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "value",
    "description": "<p>The value given as data when submitted with a <code>name</code>.</p>\n",
    "type": "AcceptableValue",
    "required": true
  }
]'} 

:docs-emits-table{:data='[
  {
    "name": "select",
    "description": "",
    "type": "[event: SelectEvent<AcceptableValue>]"
  }
]'} 
