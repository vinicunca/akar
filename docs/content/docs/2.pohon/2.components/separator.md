---
description: Separates content horizontally or vertically.
category: element
links:
  - label: Separator
    icon: custom-akar
    to: /docs/akar/components/separator
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/Separator.vue
---

## Usage

Use the Separator component as-is to separate content.

::docs-pohon-preview
---
class: 'p-8'
---
::

### Orientation

Use the `orientation` prop to change the orientation of the Separator. Defaults to `horizontal`.

::docs-pohon-preview
---
ignore:
  - class
class: 'p-8'
props:
  orientation: vertical
  class: 'h-48'
---
::

### Label

Use the `label` prop to display a label in the middle of the Separator.

::docs-pohon-preview
---
class: 'p-8'
props:
  label: 'Hello World'
---
::

### Icon

Use the `icon` prop to display an icon in the middle of the Separator.

::docs-pohon-preview
---
class: 'p-8'
props:
  icon: 'i-simple-icons-nuxtdotjs'
---
::

### Avatar

Use the `avatar` prop to display an avatar in the middle of the Separator.

::docs-pohon-preview
---
prettier: true
class: 'p-8'
props:
  avatar:
    src: 'https://github.com/nuxt.png'
---
::

### Color

Use the `color` prop to change the color of the Separator. Defaults to `neutral`.

::docs-pohon-preview
---
class: 'p-8'
props:
  color: primary
  type: solid
---
::

### Type

Use the `type` prop to change the type of the Separator. Defaults to `solid`.

::docs-pohon-preview
---
class: 'p-8'
props:
  type: dashed
---
::

### Size

Use the `size` prop to change the size of the Separator. Defaults to `xs`.

::docs-pohon-preview
---
class: 'p-8'
props:
  size: lg
---
::

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
