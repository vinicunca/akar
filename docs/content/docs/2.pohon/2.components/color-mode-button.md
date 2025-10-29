---
title: ColorModeButton
description: 'A Button to switch between light and dark mode.'
category: color-mode
links:
  - label: Button
    to: /docs/pohon/components/button
    icon: i-simple-icons-nuxtdotjs
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/color-mode/ColorModeButton.vue
---

## Usage

The ColorModeButton component extends the [Button](/docs/pohon/components/button) component, so you can pass any property such as `color`, `variant`, `size`, etc.

:component-code{prefix="color-mode"}

::note
The button defaults to `color="neutral"` and `variant="ghost"`.
::

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

### With fallback slot

As the button is wrapped in a [ClientOnly](https://nuxt.com/docs/api/components/client-only) component, you can pass a `fallback` slot to display a placeholder while the component is loading.

::docs-pohon-preview{prefix="color-mode"}
---
prettier: true
slots:
  fallback: |

    <PButton loading variant="ghost" color="neutral" />
---

#fallback
:p-button{variant="ghost" color="neutral" loading}
::

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

## Changelog

:docs-component-changelog{prefix="color-mode"}
