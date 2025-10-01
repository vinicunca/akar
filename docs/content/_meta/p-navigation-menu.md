<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    'name': 'as',
    'description': '<p>The element or component this component should render as.</p>\n',
    'type': 'APrimitiveAsTag | Component',
    'required': false,
    'default': '\'div\''
  },
  {
    'name': 'arrow',
    'description': '<p>Display an arrow alongside the menu.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'collapsed',
    'description': '<p>Collapse the navigation menu to only show icons.\nOnly works when <code>orientation</code> is <code>vertical</code>.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'collapsible',
    'description': '<p>When type is &quot;single&quot;, allows closing content when clicking trigger for an open item.\nWhen type is &quot;multiple&quot;, this prop has no effect.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'color',
    'description': '',
    'type': '\'error\' | \'primary\' | \'secondary\' | \'success\' | \'info\' | \'warning\' | \'neutral\'',
    'required': false
  },
  {
    'name': 'content',
    'description': '<p>The content of the menu.</p>\n',
    'type': '(Omit<ANavigationMenuContentProps, \'as\' | \'asChild\' | \'forceMount\'> & Partial<EmitsToProps<DismissableLayerEmits>>)',
    'required': false
  },
  {
    'name': 'contentOrientation',
    'description': '<p>The orientation of the content.\nOnly works when <code>orientation</code> is <code>horizontal</code>.</p>\n',
    'type': '\'vertical\' | \'horizontal\'',
    'required': false,
    'default': '\'horizontal\''
  },
  {
    'name': 'defaultValue',
    'description': '<p>The value of the menu item that should be active when initially rendered.</p>\n<p>Use when you do not need to control the value state.</p>\n',
    'type': 'string',
    'required': false
  },
  {
    'name': 'delayDuration',
    'description': '<p>The duration from when the pointer enters the trigger until the tooltip gets opened.</p>\n',
    'type': 'number',
    'required': false,
    'default': '0'
  },
  {
    'name': 'disableClickTrigger',
    'description': '<p>If <code>true</code>, menu cannot be open by click on trigger</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'disabled',
    'description': '<p>When <code>true</code>, prevents the user from interacting with the accordion and all its items</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'disableHoverTrigger',
    'description': '<p>If <code>true</code>, menu cannot be open by hover on trigger</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'disablePointerLeaveClose',
    'description': '<p>If <code>true</code>, menu will not close during pointer leave event</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'externalIcon',
    'description': '<p>The icon displayed when the item is an external link.\nSet to <code>false</code> to hide the external icon.</p>\n',
    'type': 'string | boolean | object',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'highlight',
    'description': '<p>Display a line next to the active item.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'highlightColor',
    'description': '',
    'type': '\'error\' | \'primary\' | \'secondary\' | \'success\' | \'info\' | \'warning\' | \'neutral\'',
    'required': false
  },
  {
    'name': 'items',
    'description': '',
    'type': 'ArrayOrNested<PNavigationMenuItem>',
    'required': false
  },
  {
    'name': 'labelKey',
    'description': '<p>The key used to get the label from the item.</p>\n',
    'type': 'string | number',
    'required': false,
    'default': '\'label\''
  },
  {
    'name': 'modelValue',
    'description': '<p>The controlled value of the menu item to activate. Can be used as <code>v-model</code>.</p>\n',
    'type': 'string',
    'required': false
  },
  {
    'name': 'orientation',
    'description': '<p>The orientation of the menu.</p>\n',
    'type': '\'vertical\' | \'horizontal\'',
    'required': false,
    'default': '\'horizontal\''
  },
  {
    'name': 'popover',
    'description': '<p>Display a popover on the items when the menu is collapsed with the children list.\n<code>{ mode: 'hover', content: { side: 'right', align: 'start', alignOffset: 2 } }</code>{lang=&quot;ts-type&quot;}</p>\n',
    'type': 'boolean | PPopoverProps',
    'required': false
  },
  {
    'name': 'skipDelayDuration',
    'description': '<p>How much time a user has to enter another trigger without incurring a delay again.</p>\n',
    'type': 'number',
    'required': false
  },
  {
    'name': 'tooltip',
    'description': '<p>Display a tooltip on the items when the menu is collapsed with the label of the item.\n<code>{ delayDuration: 0, content: { side: 'right' } }</code>{lang=&quot;ts-type&quot;}</p>\n',
    'type': 'boolean | PTooltipProps',
    'required': false
  },
  {
    'name': 'trailingIcon',
    'description': '<p>The icon displayed to open the menu.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'type',
    'description': '<p>Determines whether a &quot;single&quot; or &quot;multiple&quot; items can be pressed at a time.</p>\n<p>This prop will overwrite the inferred type from <code>modelValue</code> and <code>defaultValue</code>.</p>\n',
    'type': '\'multiple\' | \'single\'',
    'required': false,
    'default': '\'multiple\''
  },
  {
    'name': 'unmountOnHide',
    'description': '<p>When <code>true</code>, the element will be unmounted on closed state.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'variant',
    'description': '',
    'type': '\'link\' | \'pill\'',
    'required': false
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '{ root?: ClassValue; list?: ClassValue; label?: ClassValue; item?: ClassValue; link?: ClassValue; linkLeadingIcon?: ClassValue; linkLeadingAvatar?: ClassValue; linkLeadingAvatarSize?: ClassValue; linkTrailing?: ClassValue; linkTrailingBadge?: ClassValue; linkTrailingBadgeSize?: ClassValue; linkTrailingIcon?: ClassValue; linkLabel?: ClassValue; linkLabelExternalIcon?: ClassValue; childList?: ClassValue; childLabel?: ClassValue; childItem?: ClassValue; childLink?: ClassValue; childLinkWrapper?: ClassValue; childLinkIcon?: ClassValue; childLinkLabel?: ClassValue; childLinkLabelExternalIcon?: ClassValue; childLinkDescription?: ClassValue; separator?: ClassValue; viewportWrapper?: ClassValue; viewport?: ClassValue; content?: ClassValue; indicator?: ClassValue; arrow?: ClassValue; }',
    'required': false
  }
]" />

<DocsEmitsTable :data="[
  {
    'name': 'update:modelValue',
    'description': '',
    'type': '[value: string]'
  }
]" />

<DocsSlotsTable :data="[
  {
    'name': 'item',
    'description': '',
    'type': 'PNavigationMenuItem'
  },
  {
    'name': 'index',
    'description': '',
    'type': 'number'
  },
  {
    'name': 'active',
    'description': '',
    'type': 'boolean | undefined'
  }
]" />
