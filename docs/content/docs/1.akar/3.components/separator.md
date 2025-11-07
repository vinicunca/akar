---
category: element
links:
  - label: Pohon
    to: /docs/pohon/components/separator
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/separator/index.ts
---

:docs-component-example{name="a-separator"}

## Features

::docs-highlights
---
features:
  - Supports horizontal and vertical orientations.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { ASeparator } from 'akar'
</script>

<template>
  <ASeparator />
</template>
```

## API Reference

### Root

The separator.

:docs-component-meta{name="a-separator"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-orientation]'
    values:
      - vertical
      - horizontal
---
::

## Accessibility

Adheres to the [`separator` role requirements](https://www.w3.org/TR/wai-aria-1.2/#separator).
