---
category: element
links:
  - label: Pohon
    to: /docs/pohon/components/progress
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/progress/index.ts
---

:docs-component-example{name="a-progress"}

## Features

::docs-highlights
---
features:
  - Provides context for assistive technology to read the progress of a task.
---
::

### Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { AProgressIndicator, AProgressRoot } from 'akar'
</script>

<template>
  <AProgressRoot>
    <AProgressIndicator />
  </AProgressRoot>
</template>
```

## Accessibility

Adheres to the [`progressbar` role requirements](https://www.w3.org/WAI/ARIA/apg/patterns/meter).

## API Reference

### Root

Contains all of the progress parts.

:docs-component-meta{name="a-progress-root"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - complete
      - indeterminate
      - loading
  - attribute: '[data-value]'
    values: The current value
  - attribute: '[data-max]'
    values: The max value
---
::

### Indicator

Used to show the progress visually. It also makes progress accessible to assistive technologies.

:docs-component-meta{name="a-progress-indicator"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - complete
      - indeterminate
      - loading
  - attribute: '[data-value]'
    values: The current value
  - attribute: '[data-max]'
    values: The max value
---
::
