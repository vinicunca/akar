<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    "name": "as",
    "description": "<p>The element or component this component should render as when not a link.</p>\n",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\"div\""
  },
  {
    "name": "active",
    "description": "<p>Force the link to be active independent of the current route.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "activeClass",
    "description": "<p>Class to apply when the link is active</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "activeColor",
    "description": "",
    "type": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"info\" | \"warning\" | \"neutral\"",
    "required": false
  },
  {
    "name": "activeVariant",
    "description": "",
    "type": "\"link\" | \"solid\" | \"outline\" | \"soft\" | \"subtle\" | \"ghost\"",
    "required": false
  },
  {
    "name": "ariaCurrentValue",
    "description": "<p>Value passed to the attribute <code>aria-current</code> when the link is exact active.</p>\n",
    "type": "\"true\" | \"false\" | \"date\" | \"time\" | \"page\" | \"step\" | \"location\"",
    "required": false
  },
  {
    "name": "avatar",
    "description": "<p>Display an avatar on the left side.</p>\n",
    "type": "PAvatarProps",
    "required": false
  },
  {
    "name": "block",
    "description": "<p>Render the button full width.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "color",
    "description": "",
    "type": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"info\" | \"warning\" | \"neutral\"",
    "required": false
  },
  {
    "name": "disabled",
    "description": "",
    "type": "boolean",
    "required": false
  },
  {
    "name": "exact",
    "description": "<p>Will only be active if the current route is an exact match.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "exactActiveClass",
    "description": "<p>Class to apply when the link is exact active</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "exactHash",
    "description": "<p>Will only be active if the current route hash is an exact match.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "exactQuery",
    "description": "<p>Allows controlling how the current route query sets the link as active.</p>\n",
    "type": "boolean | \"partial\"",
    "required": false
  },
  {
    "name": "external",
    "description": "<p>Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "href",
    "description": "<p>An alias for <code>to</code>. If used with <code>to</code>, <code>href</code> will be ignored</p>\n",
    "type": "string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric",
    "required": false
  },
  {
    "name": "icon",
    "description": "<p>Display an icon based on the <code>leading</code> and <code>trailing</code> props.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "inactiveClass",
    "description": "<p>The class to apply when the link is inactive.</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "label",
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
    "name": "loadingAuto",
    "description": "<p>Set loading state automatically based on the <code>@click</code> promise state</p>\n",
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
    "name": "noPrefetch",
    "description": "<p>Escape hatch to disable <code>prefetch</code> attribute.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "noRel",
    "description": "<p>If set to true, no rel attribute will be added to the link</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "onClick",
    "description": "",
    "type": "((event: MouseEvent) => void | Promise<void>) | ((event: MouseEvent) => void | Promise<void>)[]",
    "required": false
  },
  {
    "name": "prefetch",
    "description": "<p>When enabled will prefetch middleware, layouts and payloads of links in the viewport.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "prefetchedClass",
    "description": "<p>A class to apply to links that have been prefetched.</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "prefetchOn",
    "description": "<p>Allows controlling when to prefetch links. By default, prefetch is triggered only on visibility.</p>\n",
    "type": "\"visibility\" | \"interaction\" | Partial<{ visibility: boolean; interaction: boolean; }>",
    "required": false
  },
  {
    "name": "rel",
    "description": "<p>A rel attribute value to apply on the link. Defaults to &quot;noopener noreferrer&quot; for external links.</p>\n",
    "type": "(string & {}) | \"noopener\" | \"noreferrer\" | \"nofollow\" | \"sponsored\" | \"ugc\" | null",
    "required": false
  },
  {
    "name": "replace",
    "description": "<p>Calls <code>router.replace</code> instead of <code>router.push</code>.</p>\n",
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
    "name": "square",
    "description": "<p>Render the button with equal padding on all sides.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "target",
    "description": "<p>Where to display the linked URL, as the name for a browsing context.</p>\n",
    "type": "(string & {}) | \"_blank\" | \"_parent\" | \"_self\" | \"_top\" | null",
    "required": false
  },
  {
    "name": "to",
    "description": "<p>Route Location the link should navigate to when clicked on.</p>\n",
    "type": "string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric",
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
    "name": "type",
    "description": "<p>The type of the button when not a link.</p>\n",
    "type": "\"button\" | \"reset\" | \"submit\"",
    "required": false
  },
  {
    "name": "variant",
    "description": "",
    "type": "\"link\" | \"solid\" | \"outline\" | \"soft\" | \"subtle\" | \"ghost\"",
    "required": false
  },
  {
    "name": "viewTransition",
    "description": "<p>Pass the returned promise of <code>router.push()</code> to <code>document.startViewTransition()</code> if supported.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ base?: ClassValue; label?: ClassValue; leadingIcon?: ClassValue; leadingAvatar?: ClassValue; leadingAvatarSize?: ClassValue; trailingIcon?: ClassValue; }",
    "required": false
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
