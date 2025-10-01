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
    "description": "<p>Automatically focus the input when component is mounted.</p>\n",
    "type": "boolean",
    "required": false,
    "default": "true"
  },
  {
    "name": "back",
    "description": "<p>Display a button to navigate back in history.\n<code>{ size: 'md', color: 'neutral', variant: 'link' }</code>{lang=&quot;ts-type&quot;}</p>\n",
    "type": "boolean | PButtonProps",
    "required": false,
    "default": "true"
  },
  {
    "name": "backIcon",
    "description": "<p>The icon displayed in the back button.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "close",
    "description": "<p>Display a close button in the input (useful when inside a Dialog for example).\n<code>{ size: 'md', color: 'neutral', variant: 'ghost' }</code>{lang=&quot;ts-type&quot;}</p>\n",
    "type": "boolean | Partial<PButtonProps>",
    "required": false
  },
  {
    "name": "closeIcon",
    "description": "<p>The icon displayed in the close button.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "defaultValue",
    "description": "<p>The value of the listbox when initially rendered. Use when you do not need to control the state of the Listbox</p>\n",
    "type": "AcceptableValue | AcceptableValue[]",
    "required": false
  },
  {
    "name": "disabled",
    "description": "<p>When <code>true</code>, prevents the user from interacting with listbox</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "fuse",
    "description": "<p>Options for <a href=\"https://vueuse.org/integrations/useFuse\">useFuse</a>.</p>\n",
    "type": "UseFuseOptions<PCommandPaletteItem>",
    "required": false
  },
  {
    "name": "groups",
    "description": "",
    "type": "PCommandPaletteGroup<PCommandPaletteItem>[]",
    "required": false
  },
  {
    "name": "highlightOnHover",
    "description": "<p>When <code>true</code>, hover over item will trigger highlight</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "icon",
    "description": "<p>The icon displayed in the input.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "labelKey",
    "description": "<p>The key used to get the label from the item.</p>\n",
    "type": "string | number",
    "required": false,
    "default": "\"label\""
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
    "name": "modelValue",
    "description": "<p>The controlled value of the listbox. Can be binded with with <code>v-model</code>.</p>\n",
    "type": "AcceptableValue | AcceptableValue[]",
    "required": false,
    "default": "\"\""
  },
  {
    "name": "multiple",
    "description": "<p>Whether multiple options can be selected or not.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "placeholder",
    "description": "<p>The placeholder text for the input.</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "searchTerm",
    "description": "",
    "type": "string",
    "required": false,
    "default": "\"\""
  },
  {
    "name": "selectedIcon",
    "description": "<p>The icon displayed when an item is selected.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "selectionBehavior",
    "description": "<p>How multiple selection should behave in the collection.</p>\n",
    "type": "\"replace\" | \"toggle\"",
    "required": false
  },
  {
    "name": "trailingIcon",
    "description": "<p>The icon displayed when an item has children.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root?: ClassValue; input?: ClassValue; close?: ClassValue; back?: ClassValue; content?: ClassValue; footer?: ClassValue; viewport?: ClassValue; group?: ClassValue; empty?: ClassValue; label?: ClassValue; item?: ClassValue; itemLeadingIcon?: ClassValue; itemLeadingAvatar?: ClassValue; itemLeadingAvatarSize?: ClassValue; itemLeadingChip?: ClassValue; itemLeadingChipSize?: ClassValue; itemTrailing?: ClassValue; itemTrailingIcon?: ClassValue; itemTrailingHighlightedIcon?: ClassValue; itemTrailingKbds?: ClassValue; itemTrailingKbdsSize?: ClassValue; itemLabel?: ClassValue; itemLabelBase?: ClassValue; itemLabelPrefix?: ClassValue; itemLabelSuffix?: ClassValue; }",
    "required": false
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "entryFocus",
    "description": "",
    "type": "[event: CustomEvent<any>]"
  },
  {
    "name": "highlight",
    "description": "",
    "type": "[payload: { ref: HTMLElement; value: PCommandPaletteItem; }]"
  },
  {
    "name": "leave",
    "description": "",
    "type": "[event: Event]"
  },
  {
    "name": "update:modelValue",
    "description": "",
    "type": "[value: PCommandPaletteItem]"
  },
  {
    "name": "update:open",
    "description": "",
    "type": "[value: boolean]"
  },
  {
    "name": "update:searchTerm",
    "description": "",
    "type": "[value: string]"
  }
]" />

<DocsSlotsTable :data="[
  {
    "name": "searchTerm",
    "description": "",
    "type": "string | undefined"
  }
]" />
