<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-toast-viewport' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'ol\'"
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "hotkey",
    "description": "The keys to use as the keyboard shortcut that will move focus to the toast viewport.",
    "type": "string[]",
    "required": false,
    "default": "[\'F8\']"
  },
  {
    "name": "label",
    "description": "An author-localized label for the toast viewport to provide context for screen reader users\\nwhen navigating page landmarks. The available `{hotkey}` placeholder will be replaced for you.\\nAlternatively, you can pass in a custom function to generate the label.",
    "type": "string | ((hotkey: string) => string)",
    "required": false,
    "default": "\'Notifications ({hotkey})\'"
  }
]'} 
