---
title: DashboardToolbar
description: 'A toolbar to display under the navbar in a dashboard.'
category: dashboard
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/dashboard-toolbar.vue
---

## Usage

The DashboardToolbar component is used to display a toolbar under the [DashboardNavbar](/docs/pohon/components/dashboard-navbar) component.

Use it inside the `header` slot of the [DashboardPanel](/docs/pohon/components/dashboard-panel) component:

```vue [pages/index.vue]{9-13}
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <PDashboardPanel>
    <template #header>
      <PDashboardNavbar />

      <PDashboardToolbar />
    </template>
  </PDashboardPanel>
</template>
```

Use the `left`, `default` and `right` slots to customize the toolbar.

::docs-component-example
---
prettier: true
name: 'dashboard-toolbar-example'
class: 'akar:px-0 akar:pt-0'
props:
  class: 'w-full'
---
::

::note
In this example, we use the [NavigationMenu](/docs/pohon/components/navigation-menu) component to render some links.
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
