<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    'name': 'as',
    'description': '<p>The element or component this component should render as when not a link.</p>\n',
    'type': 'APrimitiveAsTag | Component',
    'required': false,
    'default': '\'button\''
  },
  {
    'name': 'active',
    'description': '<p>Force the link to be active independent of the current route.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'activeClass',
    'description': '<p>Class to apply when the link is active</p>\n',
    'type': 'string',
    'required': false
  },
  {
    'name': 'ariaCurrentValue',
    'description': '<p>Value passed to the attribute <code>aria-current</code> when the link is exact active.</p>\n',
    'type': '\'true\' | \'false\' | \'date\' | \'time\' | \'page\' | \'step\' | \'location\'',
    'required': false,
    'default': '\'page\''
  },
  {
    'name': 'custom',
    'description': '<p>Whether RouterLink should not wrap its content in an <code>a</code> tag. Useful when\nusing <code>v-slot</code> to create a custom RouterLink</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'disabled',
    'description': '',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'exact',
    'description': '<p>Will only be active if the current route is an exact match.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'exactActiveClass',
    'description': '<p>Class to apply when the link is exact active</p>\n',
    'type': 'string',
    'required': false
  },
  {
    'name': 'exactHash',
    'description': '<p>Will only be active if the current route hash is an exact match.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'exactQuery',
    'description': '<p>Allows controlling how the current route query sets the link as active.</p>\n',
    'type': 'boolean | \'partial\'',
    'required': false
  },
  {
    'name': 'external',
    'description': '<p>Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'href',
    'description': '<p>An alias for <code>to</code>. If used with <code>to</code>, <code>href</code> will be ignored</p>\n',
    'type': 'string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric',
    'required': false
  },
  {
    'name': 'inactiveClass',
    'description': '<p>The class to apply when the link is inactive.</p>\n',
    'type': 'string',
    'required': false
  },
  {
    'name': 'noPrefetch',
    'description': '<p>Escape hatch to disable <code>prefetch</code> attribute.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'noRel',
    'description': '<p>If set to true, no rel attribute will be added to the link</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'prefetch',
    'description': '<p>When enabled will prefetch middleware, layouts and payloads of links in the viewport.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'prefetchedClass',
    'description': '<p>A class to apply to links that have been prefetched.</p>\n',
    'type': 'string',
    'required': false
  },
  {
    'name': 'prefetchOn',
    'description': '<p>Allows controlling when to prefetch links. By default, prefetch is triggered only on visibility.</p>\n',
    'type': '\'visibility\' | \'interaction\' | Partial<{ visibility: boolean; interaction: boolean; }>',
    'required': false
  },
  {
    'name': 'raw',
    'description': '<p>When <code>true</code>, only styles from <code>class</code>, <code>activeClass</code>, and <code>inactiveClass</code> will be applied.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'rel',
    'description': '<p>A rel attribute value to apply on the link. Defaults to &quot;noopener noreferrer&quot; for external links.</p>\n',
    'type': '(string & {}) | \'noopener\' | \'noreferrer\' | \'nofollow\' | \'sponsored\' | \'ugc\' | null',
    'required': false
  },
  {
    'name': 'replace',
    'description': '<p>Calls <code>router.replace</code> instead of <code>router.push</code>.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'target',
    'description': '<p>Where to display the linked URL, as the name for a browsing context.</p>\n',
    'type': '(string & {}) | \'_blank\' | \'_parent\' | \'_self\' | \'_top\' | null',
    'required': false
  },
  {
    'name': 'to',
    'description': '<p>Route Location the link should navigate to when clicked on.</p>\n',
    'type': 'string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric',
    'required': false
  },
  {
    'name': 'type',
    'description': '<p>The type of the button when not a link.</p>\n',
    'type': '\'button\' | \'reset\' | \'submit\'',
    'required': false,
    'default': '\'button\''
  },
  {
    'name': 'viewTransition',
    'description': '<p>Pass the returned promise of <code>router.push()</code> to <code>document.startViewTransition()</code> if supported.</p>\n',
    'type': 'boolean',
    'required': false
  }
]" />

<DocsSlotsTable :data="[
  {
    'name': 'active',
    'description': '',
    'type': 'boolean'
  }
]" />
