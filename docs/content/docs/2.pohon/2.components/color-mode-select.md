---
title: ColorModeSelect
description: 'A Select to switch between system, dark & light mode.'
category: color-mode
links:
  - label: SelectMenu
    to: /docs/pohon/components/select-menu
    icon: i-simple-icons-nuxtdotjs
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/color-mode/ColorModeSelect.vue
---

## Usage

The ColorModeSelect component extends the [SelectMenu](/docs/pohon/components/select-menu) component, so you can pass any property such as `color`, `variant`, `size`, etc.

:component-code{prefix="color-mode"}

## Examples

### With custom icons

::docs-framework-only
#nuxt
::div

Use the `app.config.ts` to customize the icon with the `ui.icons` property:

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    icons: {
      system: 'i-ph-desktop',
      light: 'i-ph-sun',
      dark: 'i-ph-moon'
    }
  }
})
```

::

#vue
::div
Use the `vite.config.ts` to customize the icon with the `ui.icons` property:

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    ui({
      ui: {
        icons: {
          light: 'i-ph-sun',
          dark: 'i-ph-moon'
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
