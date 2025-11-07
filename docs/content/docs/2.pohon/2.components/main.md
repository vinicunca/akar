---
title: Main
description: 'A main element that fills the available viewport height.'
category: layout
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/main.vue
---

## Usage

The Main component renders a `<main>` element that works together with the [Header](/docs/pohon/components/header) component to create a full-height layout that extends to the viewport's available height.

::tip{to="/docs/getting-started/theme/css-variables#header"}
The Main component uses the `--pohon-header-height` CSS variable to position itself correctly below the [Header](/docs/pohon/components/header). Make sure to set this variable according to your header's height.
::

## Examples

### Within `app.vue`

Use the Main component in your `app.vue` or in a layout:

```vue [app.vue]{5-9}
<template>
  <PApp>
    <PHeader />

    <PMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </PMain>

    <PFooter />
  </PApp>
</template>
```

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
