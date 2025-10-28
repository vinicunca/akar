---
title: DashboardGroup
description: 'A fixed layout component that provides context for dashboard components with sidebar state management and persistence.'
category: dashboard
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/DashboardGroup.vue
---

## Usage

The DashboardGroup component is the main layout that wraps the [DashboardSidebar](/docs/pohon/components/dashboard-sidebar) and [DashboardPanel](/docs/pohon/components/dashboard-panel) components to create a responsive dashboard interface.

Use it in a layout or in your `app.vue`:

```vue [layouts/dashboard.vue]{2,6}
<template>
  <UDashboardGroup>
    <UDashboardSidebar />

    <slot />
  </UDashboardGroup>
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
