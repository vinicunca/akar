---
description: A short text to represent a status or a category.
category: element
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/Badge.vue
---

## Usage

Use the default slot to set the label of the Badge.

::docs-pohon-preview
---
slots:
  default: Badge
---
::

### Label

Use the `label` prop to set the label of the Badge.

::docs-pohon-preview
---
props:
  label: Badge
---
::

### Color

Use the `color` prop to change the color of the Badge.

::docs-pohon-preview
---
props:
  color: neutral
slots:
  default: Badge
---
::

### Variant

Use the `variant` props to change the variant of the Badge.

::docs-pohon-preview
---
props:
  color: neutral
  variant: outline
slots:
  default: Badge
---
::

### Size

Use the `size` prop to change the size of the Badge.

::docs-pohon-preview
---
props:
  size: xl
slots:
  default: Badge
---
::

### Icon

Use the `icon` prop to show an [Icon](/docs/pohon/components/icon) inside the Badge.

::docs-pohon-preview
---
props:
  icon: i-lucide-rocket
  size: md
  color: primary
  variant: solid
slots:
  default: Badge
---
::

Use the `leading` and `trailing` props to set the icon position or the `leading-icon` and `trailing-icon` props to set a different icon for each position.

::docs-pohon-preview
---
props:
  trailingIcon: i-lucide-arrow-right
  size: md
slots:
  default: Badge
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/pohon/components/avatar) inside the Badge.

::docs-pohon-preview
---
prettier: true
props:
  avatar:
    src: 'https://github.com/nuxt.png'
  size: md
  color: neutral
  variant: outline
slots:
  default: |

    Badge
---
::

## Examples

### `class` prop

Use the `class` prop to override the base styles of the Badge.

::docs-pohon-preview
---
props:
  class: 'font-bold rounded-full'
slots:
  default: Badge
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
