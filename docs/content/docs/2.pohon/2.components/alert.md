---
description: A callout to draw user's attention.
category: element
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/alert.vue
---

## Usage

### Title

Use the `title` prop to set the title of the Alert.

::docs-pohon-preview
---
props:
  title: 'Heads up!'
---
::

### Description

Use the `description` prop to set the description of the Alert.

::docs-pohon-preview
---
prettier: true
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
---
::

### Icon

Use the `icon` prop to show an [Icon](/docs/pohon/components/icon).

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - description
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  icon: 'i-lucide:terminal'
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/pohon/components/avatar).

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - description
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  avatar.src: 'https://github.com/nuxt.png'
---
::

### Color

Use the `color` prop to change the color of the Alert.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - description
  - icon
props:
  color: neutral
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  icon: 'i-lucide:terminal'
---
::

### Variant

Use the `variant` prop to change the variant of the Alert.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - description
  - icon
props:
  color: neutral
  variant: subtle
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  icon: 'i-lucide:terminal'
---
::

### Close

Use the `close` prop to display a [Button](/docs/pohon/components/button) to dismiss the Alert.

::tip
An `update:open` event will be emitted when the close button is clicked.
::

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - description
  - close
  - color
  - variant
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  color: neutral
  variant: outline
  close: true
---
::

You can pass any property from the [Button](/docs/pohon/components/button) component to customize it.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - description
  - close.color
  - close.variant
  - color
  - variant
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  color: neutral
  variant: outline
  close:
    color: primary
    variant: outline
    class: 'akar:rounded-full'
---
::

### Close Icon

Use the `close-icon` prop to customize the close button [Icon](/docs/pohon/components/icon). Defaults to `i-lucide:x`.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - description
  - close
  - color
  - variant
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  color: neutral
  variant: outline
  close: true
  closeIcon: 'i-lucide:arrow-right'
---
::

::docs-framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `pohon.icons.close` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `pohon.icons.close` key.
:::
::

### Actions

Use the `actions` prop to add some [Button](/docs/pohon/components/button) actions to the Alert.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - actions
  - color
  - variant
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  color: neutral
  variant: outline
  actions:
    - label: Action 1
    - label: Action 2
      color: neutral
      variant: subtle
---
::

### Orientation

Use the `orientation` prop to change the orientation of the Alert.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - actions
  - color
  - variant
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  color: neutral
  variant: outline
  orientation: horizontal
  actions:
    - label: Action 1
    - label: Action 2
      color: neutral
      variant: subtle
---
::

## Examples

### `class` prop

Use the `class` prop to override the base styles of the Alert.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - description
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  class: 'rounded-none'
---
::

### `pohon` prop

Use the `pohon` prop to override the slots styles of the Alert.

::docs-pohon-preview
---
prettier: true
ignore:
  - pohon
  - title
  - description
  - icon
props:
  title: 'Heads up!'
  description: 'You can change the primary color in your app config.'
  icon: i-lucide:rocket
  pohon:
    icon: 'akar:size-11'
---
::

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

### Emits

:docs-pohon-emits

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
