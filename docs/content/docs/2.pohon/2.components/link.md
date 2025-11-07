---
description: A wrapper around <NuxtLink> with extra props.
category: navigation
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/link.vue
---

## Usage

The Link component is a wrapper around [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link) using the [`custom`](https://router.vuejs.org/api/interfaces/RouterLinkProps.html#Properties-custom) prop. It provides a few extra props:

- `inactive-class` prop to set a class when the link is inactive, `active-class` is used when active.
- `exact` prop to style with `active-class` when the link is active and the route is exactly the same as the current route.
- `exact-query` and `exact-hash` props to style with `active-class` when the link is active and the query or hash is exactly the same as the current query or hash.
  - use `exact-query="partial"` to style with `active-class` when the link is active and the query partially match the current query.

The incentive behind this is to provide the same API as NuxtLink back in Nuxt 2 / Vue 2. You can read more about it in the Vue Router [migration from Vue 2](https://router.vuejs.org/guide/migration/#removal-of-the-exact-prop-in-router-link) guide.

::note
It is used by the [`Breadcrumb`](/docs/pohon/components/breadcrumb), [`Button`](/docs/pohon/components/button), [`ContextMenu`](/docs/pohon/components/context-menu), [`DropdownMenu`](/docs/pohon/components/dropdown-menu) and [`NavigationMenu`](/docs/pohon/components/navigation-menu) components.
::

### Tag

The `Link` components renders an `<a>` tag when a `to` prop is provided, otherwise it renders a `<button>` tag. You can use the `as` prop to change fallback tag.

::docs-pohon-preview
---
props:
  to: ''
  as: 'button'
slots:
  default: Link
---
::

::note
You can inspect the rendered HTML by changing the `to` prop.
::

### Style

By default, the link has default active and inactive styles, check out the [#theme](#theme) section.

::docs-pohon-preview
---
props:
  to: /docs/pohon/components/link
slots:
  default: Link
---
::

::note
Try changing the `to` prop to see the active and inactive states.
::

You can override this behavior by using the `raw` prop and provide your own styles using `class`, `active-class` and `inactive-class`.

::docs-pohon-preview
---
ignore:
  - raw
props:
  raw: true
  to: /docs/pohon/components/link
  activeClass: 'font-bold'
  inactiveClass: 'text-muted'
slots:
  default: Link
---

Link
::

## IntelliSense

If you're using VSCode and wish to get autocompletion for the classes `active-class` and `inactive-class`, you can add the following settings to your `.vscode/settings.json`:

```json [.vscode/settings.json]
{
  "tailwindCSS.classAttributes": [
    "active-class",
    "inactive-class"
  ]
}
```

## API

### Props

::docs-pohon-props
---
ignore:
  - custom
---
::

::callout{icon="i-simple-icons:mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attributes" target="_blank"}
This component also supports all native `<a>` HTML attributes.
::

### Slots

:docs-pohon-slots

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
