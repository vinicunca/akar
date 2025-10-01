<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    "name": "arrow",
    "description": "<p>Display an arrow alongside the menu.</p>\n",
    "type": "boolean | Omit<AComboboxArrowProps, \"as\" | \"asChild\">",
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
    "name": "content",
    "description": "<p>The content of the menu.</p>\n",
    "type": "(Omit<AComboboxContentProps, \"as\" | \"asChild\" | \"forceMount\"> & Partial<EmitsToProps<DismissableLayerEmits>>)",
    "required": false
  },
  {
    "name": "createItem",
    "description": "<p>Determines if custom user input that does not exist in options can be added.</p>\n",
    "type": "boolean | \"always\" | { position?: \"top\" | \"bottom\"; when?: \"always\" | \"empty\"; }",
    "required": false
  },
  {
    "name": "defaultOpen",
    "description": "<p>The open state of the combobox when it is initially rendered. &lt;br&gt; Use when you do not need to control its open state.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "defaultValue",
    "description": "<p>The value of the SelectMenu when initially rendered. Use when you do not need to control the state of the SelectMenu.</p>\n",
    "type": "any",
    "required": false
  },
  {
    "name": "disabled",
    "description": "<p>When <code>true</code>, prevents the user from interacting with listbox</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "filterFields",
    "description": "<p>Fields to filter items by.</p>\n",
    "type": "string[]",
    "required": false
  },
  {
    "name": "highlight",
    "description": "<p>Highlight the ring color like a focus state.</p>\n",
    "type": "boolean",
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
    "name": "ignoreFilter",
    "description": "<p>When <code>true</code>, disable the default filters, useful for custom filtering (useAsyncData, useFetch, etc.).</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "items",
    "description": "",
    "type": "ArrayOrNested<PSelectMenuItem>",
    "required": false
  },
  {
    "name": "labelKey",
    "description": "<p>When <code>items</code> is an array of objects, select the field to use as the label.</p>\n",
    "type": "string | number",
    "required": false,
    "default": "\"label\""
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
    "name": "modelValue",
    "description": "<p>The controlled value of the SelectMenu. Can be binded-with with <code>v-model</code>.</p>\n",
    "type": "any",
    "required": false
  },
  {
    "name": "multiple",
    "description": "<p>Whether multiple options can be selected or not.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "name",
    "description": "<p>The name of the field. Submitted with its owning form as part of a name/value pair.</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "open",
    "description": "<p>The controlled open state of the Combobox. Can be binded with with <code>v-model:open</code>.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "placeholder",
    "description": "<p>The placeholder text when the select is empty.</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "portal",
    "description": "<p>Render the menu in a portal.</p>\n",
    "type": "string | boolean | HTMLElement",
    "required": false,
    "default": "true"
  },
  {
    "name": "required",
    "description": "",
    "type": "boolean",
    "required": false
  },
  {
    "name": "resetSearchTermOnBlur",
    "description": "<p>Whether to reset the searchTerm when the Combobox input blurred</p>\n",
    "type": "boolean",
    "required": false,
    "default": "true"
  },
  {
    "name": "resetSearchTermOnSelect",
    "description": "<p>Whether to reset the searchTerm when the Combobox value is selected</p>\n",
    "type": "boolean",
    "required": false,
    "default": "true"
  },
  {
    "name": "searchInput",
    "description": "<p>Whether to display the search input or not.\nCan be an object to pass additional props to the input.\n<code>{ placeholder: 'Search...', variant: 'none' }</code>{lang=&quot;ts-type&quot;}</p>\n",
    "type": "boolean | PInputProps<AcceptableValue>",
    "required": false,
    "default": "true"
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
    "description": "<p>The icon displayed to open the menu.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "valueKey",
    "description": "<p>When <code>items</code> is an array of objects, select the field to use as the value instead of the object itself.</p>\n",
    "type": "string | number",
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
    "type": "{ root?: ClassValue; base?: ClassValue; leading?: ClassValue; leadingIcon?: ClassValue; leadingAvatar?: ClassValue; leadingAvatarSize?: ClassValue; trailing?: ClassValue; trailingIcon?: ClassValue; value?: ClassValue; placeholder?: ClassValue; arrow?: ClassValue; content?: ClassValue; viewport?: ClassValue; group?: ClassValue; empty?: ClassValue; label?: ClassValue; separator?: ClassValue; item?: ClassValue; itemLeadingIcon?: ClassValue; itemLeadingAvatar?: ClassValue; itemLeadingAvatarSize?: ClassValue; itemLeadingChip?: ClassValue; itemLeadingChipSize?: ClassValue; itemTrailing?: ClassValue; itemTrailingIcon?: ClassValue; itemLabel?: ClassValue; input?: ClassValue; focusScope?: ClassValue; }",
    "required": false
  }
]" />

<DocsEmitsTable :data="[
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
    "name": "create",
    "description": "",
    "type": "[item: string]"
  },
  {
    "name": "focus",
    "description": "",
    "type": "[event: FocusEvent]"
  },
  {
    "name": "highlight",
    "description": "",
    "type": "[payload: { ref: HTMLElement; value: any; }]"
  },
  {
    "name": "update:modelValue",
    "description": "",
    "type": "[value: any]"
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
    "name": "modelValue",
    "description": "",
    "type": "any"
  },
  {
    "name": "open",
    "description": "",
    "type": "boolean"
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root: (props?: Record<string, any> | undefined) => string; base: (props?: Record<string, any> | undefined) => string; leading: (props?: Record<string, any> | undefined) => string; leadingIcon: (props?: Record<string, any> | undefined) => string; leadingAvatar: (props?: Record<string, any> | undefined) => string; leadingAvatarSize: (props?: Record<string, any> | undefined) => string; trailing: (props?: Record<string, any> | undefined) => string; trailingIcon: (props?: Record<string, any> | undefined) => string; value: (props?: Record<string, any> | undefined) => string; placeholder: (props?: Record<string, any> | undefined) => string; arrow: (props?: Record<string, any> | undefined) => string; content: (props?: Record<string, any> | undefined) => string; viewport: (props?: Record<string, any> | undefined) => string; group: (props?: Record<string, any> | undefined) => string; empty: (props?: Record<string, any> | undefined) => string; label: (props?: Record<string, any> | undefined) => string; separator: (props?: Record<string, any> | undefined) => string; item: (props?: Record<string, any> | undefined) => string; itemLeadingIcon: (props?: Record<string, any> | undefined) => string; itemLeadingAvatar: (props?: Record<string, any> | undefined) => string; itemLeadingAvatarSize: (props?: Record<string, any> | undefined) => string; itemLeadingChip: (props?: Record<string, any> | undefined) => string; itemLeadingChipSize: (props?: Record<string, any> | undefined) => string; itemTrailing: (props?: Record<string, any> | undefined) => string; itemTrailingIcon: (props?: Record<string, any> | undefined) => string; itemLabel: (props?: Record<string, any> | undefined) => string; input: (props?: Record<string, any> | undefined) => string; focusScope: (props?: Record<string, any> | undefined) => string; }"
  }
]" />
