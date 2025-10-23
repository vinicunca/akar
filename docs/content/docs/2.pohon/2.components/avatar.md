---
description: An image element with a fallback for representing the user.
category: element
links:
- label: Akar
  to: /docs/akar/components/avatar
- label: GitHub
  icon: i-simple-icons-github
  to: https://github.com/vinicunca/akar/blob/main/packages/core/pohon/src/runtime/components/avatar.vue
---

## Usage

::docs-pohon-preview
---
ignore:
  - src
props:
  src: 'https://github.com/praburangki.png'
---
::


::note
You can pass any property from the HTML `<img>` element such as `alt`, `loading`, etc.
::

### Src

Use the `src` prop to set the image URL.

::docs-pohon-preview
---
props:
  src: 'https://github.com/praburangki.png'
---
::

### Size

Use the `size` prop to set the size of the Avatar.

::docs-pohon-preview
---
ignore:
  - src
props:
  src: 'https://github.com/praburangki.png'
  size: xl
---
::

::note
The `<img>` element's `width` and `height` are automatically set based on the `size` prop.
::

### Icon

Use the `icon` prop to display a fallback [Icon](/docs/components/icon).

::docs-pohon-preview
---
props:
  icon: 'i-lucide-image'
  size: md
---
::

### Text

Use the `text` prop to display a fallback text.

::docs-pohon-preview
---
props:
  text: '+1'
  size: md
---
::

### Alt

When no icon or text is provided, the **initials** of the `alt` prop is used as fallback.

::docs-pohon-preview
---
props:
  alt: 'bebedag'
  size: md
---
::

::note
The `alt` prop is passed to the `img` element as the `alt` attribute.
::

### Chip

Use the `chip` prop to display a chip around the Avatar.

::docs-pohon-preview
---
prettier: true
ignore:
  - src
  - chip.inset
props:
  src: 'https://github.com/praburangki.png'
  chip:
    inset: true
---
::

## Examples

### With tooltip

You can use a [Tooltip](/docs/pohon/components/tooltip) component to display a tooltip when hovering the Avatar.

:docs-pohon-example{name="avatar-tooltip-example"}

### With mask

You can use a CSS mask to display an Avatar with a custom shape instead of a simple circle.

:docs-pohon-example{name="avatar-mask-example"}


## API

### Props

:docs-pohon-props

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
