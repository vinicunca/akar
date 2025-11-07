---
title: ColorModeSwitch
description: 'A switch to toggle between light and dark mode.'
category: color-mode
links:
  - label: Switch
    to: /docs/pohon/components/switch
    icon: i-simple-icons:nuxtdotjs
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/color-mode/ColorModeSwitch.vue
---

## Usage

The ColorModeSwitch component extends the [Switch](/docs/pohon/components/switch) component, so you can pass any property such as `color`, `size`, etc.

:component-code{prefix="color-mode"}

## Examples

### With custom icons

::docs-framework-only
#nuxt
::div

Use the `app.config.ts` to customize the icon with the `pohon.icons` property:

```ts [app.config.ts]
export default defineAppConfig({
  pohon: {
    icons: {
      light: 'i-ph:sun',
      dark: 'i-ph:moon'
    }
  }
})
```

::

#vue
::div
Use the `vite.config.ts` to customize the icon with the `pohon.icons` property:

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    pohon({
      pohon: {
        icons: {
          light: 'i-ph:sun',
          dark: 'i-ph:moon'
        }
      }
    })
  ]
})
```

::

::

## API

### Props

:docs-pohon-props

## Changelog

:docs-component-changelog{prefix="color-mode"}
