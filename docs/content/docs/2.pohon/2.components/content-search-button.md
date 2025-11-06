---
title: ContentSearchButton
description: 'A pre-styled Button to open the ContentSearch modal.'
category: content
framework: nuxt
links:
  - label: Button
    to: /docs/pohon/components/button
    icon: i-simple-icons-nuxtdotjs
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/content/ContentSearchButton.vue
---

::warning{to="/docs/getting-started/integrations/content"}
This component is only available when the `@nuxt/content` module is installed.
::

## Usage

The ContentSearchButton component is used to open the [ContentSearch](/docs/pohon/components/content-search) modal.

:component-code{prefix="content"}

It extends the [Button](/docs/pohon/components/button) component, so you can pass any property such as `color`, `variant`, `size`, etc.

::docs-pohon-preview{prefix="content"}
---
ignore:
  - variant
props:
  variant: 'subtle'
---
::

::note{to="#collapsed"}
The button defaults to `color="neutral"` and `variant="outline"` when not collapsed, `variant="ghost"` when collapsed.
::

### Collapsed

Use the `collapsed` prop to show the button's label and [kbds](#kbds). Defaults to `true`.

::docs-pohon-preview{prefix="content"}
---
prettier: true
props:
  collapsed: false
---
::

### Kbds

Use the `kbds` prop to display keyboard keys in the button. Defaults to `['meta', 'K']` to match the default shortcut of the [ContentSearch](/docs/pohon/components/content-search#shortcut) component.

::docs-pohon-preview{prefix="content"}
---
prettier: true
ignore:
  - kbds
props:
  collapsed: false
  kbds:
    - 'alt'
    - 'O'
---
::

## API

### Props

:docs-pohon-props

::callout{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
This component also supports all native `<button>` HTML attributes.
::

### Slots

:docs-pohon-slots

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog{prefix="content"}
