<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-radio-group-item' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'button\'"
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "disabled",
    "description": "When `true`, prevents the user from interacting with the radio item.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "id",
    "description": "",
    "type": "string",
    "required": false
  },
  {
    "name": "name",
    "description": "The name of the field. Submitted with its owning form as part of a name/value pair.",
    "type": "string",
    "required": false
  },
  {
    "name": "required",
    "description": "When `true`, indicates that the user must set the value before the owning form can be submitted.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "value",
    "description": "The value given as data when submitted with a `name`.",
    "type": "AcceptableValue",
    "required": false
  }
]'} 

#### Events

:docs-emits-table{name='events-radio-group-item' :data='[
  {
    "name": "select",
    "description": "Event handler called when the user selects a link (via mouse or keyboard).\\n   \\n    Calling `event.preventDefault` in this handler will prevent the navigation menu from closing when selecting that link.",
    "type": "[event: SelectEvent]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-radio-group-item' :data='[
  {
    "name": "checked",
    "description": "Current checked state",
    "type": "boolean"
  },
  {
    "name": "required",
    "description": "Required state",
    "type": "boolean"
  },
  {
    "name": "disabled",
    "description": "Disabled state",
    "type": "boolean"
  }
]'} 
