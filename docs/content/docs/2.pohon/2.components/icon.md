---
description: A component to display any icon from Iconify or another component.
category: element
links:
  - label: Icônes
    to: https://icones.js.org/
    target: _blank
    icon: custom-icones-js
---

## Usage

Use the `name` prop to display an icon:

::docs-pohon-preview
---
props:
  name: 'i-lucide-lightbulb'
  class: 'size-5'
---
::

::docs-framework-only
#nuxt
:::caution{to="/docs/pohon/getting-started/integrations/icons/nuxt#collections"}
It's highly recommended to install the icons collections you need, read more about this.
:::
::

## Examples

### SVG

You can also pass a Vue component into the `name` prop:

::docs-component-example
---
name: 'icon-svg-example'
---
::

You can define your icon components yourself, or use [`unplugin-icons`](https://github.com/unplugin/unplugin-icons) to import them directly from SVG files:

```vue
<script setup lang="ts">
import IconLightbulb from '~icons/lucide/lightbulb'
</script>

<template>
  <PIcon :name="IconLightbulb" class="size-5" />
</template>
```

## API

### Props

:docs-pohon-props

## Changelog

:docs-component-changelog
