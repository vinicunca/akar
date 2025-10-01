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
    "name": "defaultValue",
    "description": "<p>The value of the radio item that should be checked when initially rendered.</p>\n<p>Use when you do not need to control the state of the radio items.</p>\n",
    "type": "AcceptableValue",
    "required": false
  },
  {
    "name": "dir",
    "description": "<p>The reading direction of the combobox when applicable. &lt;br&gt; If omitted, inherits globally from <code>AConfigProvider</code> or assumes LTR (left-to-right) reading mode.</p>\n",
    "type": "\"ltr\" | \"rtl\"",
    "required": false
  },
  {
    "name": "disabled",
    "description": "<p>When <code>true</code>, prevents the user from interacting with radio items.</p>\n",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "loop",
    "description": "<p>When <code>true</code>, keyboard navigation will loop from last item to first, and vice versa.</p>\n",
    "type": "boolean",
    "required": false,
    "default": "true"
  },
  {
    "name": "modelValue",
    "description": "<p>The controlled value of the radio item to check. Can be binded as <code>v-model</code>.</p>\n",
    "type": "AcceptableValue",
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
    "description": "<p>The orientation of the component.</p>\n",
    "type": "\"horizontal\" | \"vertical\"",
    "required": false
  },
  {
    "name": "required",
    "description": "<p>When <code>true</code>, indicates that the user must set the value before the owning form can be submitted.</p>\n",
    "type": "boolean",
    "required": false,
    "default": "false"
  }
]'} 

:docs-emits-table{:data='[
  {
    "name": "update:modelValue",
    "description": "<p>Event handler called when the radio group value changes</p>\n",
    "type": "[payload: string]"
  }
]'} 

:docs-slots-table{:data='[
  {
    "name": "modelValue",
    "description": "<p>Current input values</p>\n",
    "type": "null | string | number | bigint | Record<string, any>"
  }
]'} 
