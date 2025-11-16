---
title: DashboardPanel
description: 'A resizable panel to display in a dashboard.'
category: dashboard
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/dashboard-panel.vue
---

## Usage

The DashboardPanel component is used to display a panel. Its state (size, collapsed, etc.) will be saved based on the `storage` and `storage-key` props you provide to the [DashboardGroup](/docs/pohon/components/dashboard-group#props) component.

Use it inside the default slot of the [DashboardGroup](/docs/pohon/components/dashboard-group) component, you can put multiple panels next to each other:

```vue [pages/index.vue]{8,10}
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <PDashboardPanel
    id="inbox-1"
    resizable
  />

  <PDashboardPanel
    id="inbox-2"
    class="hidden lg:flex"
  />
</template>
```

::caution
It is recommended to set an `id` when using multiple panels in different pages to avoid conflicts.
::

::warning
This component does not have a single root element when using the `resizable` prop, so wrap it in a container (e.g., `<div class="flex flex-1">`) if you use page transitions or require a single root for layout.
::

Use the `header`, `body` and `footer` slots to customize the panel or the default slot if you don't want a scrollable body with padding.

::docs-component-example
---
collapse: true
name: 'dashboard-panel-example'
class: 'akar:p-0 akar:justify-start'
props:
  minSize: 22
  defaultSize: 35
  maxSize: 40
  class: 'akar:min-h-96 h-136'
---
::

::note
Most of the time, you will use the [`DashboardNavbar`](/docs/pohon/components/dashboard-navbar) component in the `header` slot.
::

### Resizable

Use the `resizable` prop to make the panel resizable.

::docs-pohon-preview
---
prettier: true
hide:
  - minSize
  - defaultSize
  - maxSize
  - class
props:
  resizable: true
  minSize: 22
  defaultSize: 35
  maxSize: 40
  class: 'akar:min-h-96'
slots:
  body: |

    <CorePlaceholder class="h-96" />
class: 'akar:p-0 akar:justify-start'
---

#body
:core-placeholder{class="h-96"}
::

### Size

Use the `min-size`,  `max-size` and `default-size` props to customize the size of the panel.

::docs-pohon-preview
---
prettier: true
ignore:
  - resizable
hide:
  - class
props:
  resizable: true
  minSize: 22
  defaultSize: 35
  maxSize: 40
  class: 'akar:min-h-96'
slots:
  body: |

    <CorePlaceholder class="h-96" />
class: 'akar:p-0 akar:justify-start'
---

#body
:core-placeholder{class="h-96"}
::

::tip{to="/docs/pohon/components/dashboard-group#props"}
Sizes are calculated as percentages by default. You can change this using the `unit` prop on the `DashboardGroup` component.
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
