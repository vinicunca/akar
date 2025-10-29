---
title: App
description: Wraps your app to provide global configurations and more.
category: layout
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/app.vue
---

## Usage

This component implements Akar's [ConfigProvider](/docs/akar/utilities/config-provider) to provide global configuration to all components:

- Enables all primitives to inherit global reading direction.
- Enables changing the behavior of scroll body when setting body lock.
- Much more controls to prevent layout shifts.

It's also using [ToastProvider](/docs/akar/components/toast#provider) and [TooltipProvider](/docs/akar/components/tooltip#provider) to provide global toasts and tooltips, as well as programmatic modals and slideovers.

Wrap your entire application with the App component in your `app.vue` file:

```vue [app.vue]
<template>
  <PApp>
    <NuxtPage />
  </PApp>
</template>
```

::docs-framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/i18n/nuxt#locale"}
Learn how to use the `locale` prop to change the locale of your app.
:::

#vue
:::tip{to="/docs/getting-started/integrations/i18n/vue#locale"}
Learn how to use the `locale` prop to change the locale of your app.
:::
::

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

## Changelog

:docs-component-changelog
