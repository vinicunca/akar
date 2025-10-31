---
title: ColorModeImage
description: 'An image element with a different source for light and dark mode.'
category: color-mode
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/color-mode/ColorModeImage.vue
---

## Usage

The ColorModeImage component uses the `<NuxtImg>` component when [`@nuxt/image`](https://github.com/nuxt/image) is installed, falling back to `img` otherwise.

::docs-pohon-preview{prefix="color-mode"}
---
prettier: true
ignore:
  - width
  - height
props:
  light: 'https://picsum.photos/id/29/400'
  dark: 'https://picsum.photos/id/46/400'
  width: 200
  height: 200
---
::

::note
Switch between light and dark mode to see the different images: :p-color-mode-select{size="sm"}
::

## API

### Props

:docs-pohon-props

## Changelog

:docs-component-changelog{prefix="color-mode"}
