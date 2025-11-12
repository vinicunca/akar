---
description: Renders an accessible label associated with controls.
category: form
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/label/index.ts
---

:docs-component-example{name="a-label"}

## Features

::docs-highlights
---
features:
  - Text selection is prevented when double clicking label.
  - Supports nested controls.
---
::

## Anatomy

Import the component.

```vue
<script setup>
import { ALabel } from 'akar';
</script>

<template>
  <ALabel />
</template>
```

## API Reference

### Root

Contains the content for the label.

:docs-component-meta{name="a-label"}

## Accessibility

This component is based on the native `label` element, it will automatically apply the correct labelling when wrapping controls or using the `for` attribute. For your own custom controls to work correctly, ensure they use native elements such as `button` or `input` as a base.
