---
title: ColorModeAvatar
description: 'An Avatar with a different source for light and dark mode.'
category: color-mode
links:
  - label: Avatar
    to: /docs/pohon/components/avatar
    icon: i-simple-icons-nuxtdotjs
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/color-mode/ColorModeAvatar.vue
---

## Usage

The ColorModeAvatar component extends the [Avatar](/docs/pohon/components/avatar) component, so you can pass any property such as `size`, `icon`, etc.

Use the `light` and `dark` props to define the source for light and dark mode.

::docs-pohon-preview{prefix="color-mode"}
---
props:
  light: 'https://github.com/vuejs.png'
  dark: 'https://github.com/nuxt.png'
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
