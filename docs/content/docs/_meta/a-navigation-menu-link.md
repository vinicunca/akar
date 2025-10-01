<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-navigation-menu-link' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'a\'"
  },
  {
    "name": "active",
    "description": "Used to identify the link as the currently active page.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  }
]'} 

#### Events

:docs-emits-table{name='events-navigation-menu-link' :data='[
  {
    "name": "select",
    "description": "Event handler called when the user selects a link (via mouse or keyboard).\\n   \\n    Calling `event.preventDefault` in this handler will prevent the navigation menu from closing when selecting that link.",
    "type": "[payload: CustomEvent<{ originalEvent: Event; }>]"
  }
]'} 
