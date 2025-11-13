---
description: A two-state button that can be either on or off.
category: form
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/toggle/index.ts
---

:docs-component-example{name="a-toggle"}

## Features

::docs-highlights
---
features:
  - Full keyboard navigation.
  - Can be controlled or uncontrolled.
---
::

## Anatomy

Import the component.

```vue
<script setup>
import { AToggle } from 'akar';
</script>

<template>
  <AToggle />
</template>
```

## API Reference

### Root

The toggle.

:docs-component-meta{name="a-toggle"}

::docs-data-attribute-table
---
data:
  - attribute: '[data-state]'
    values:
      - 'on'
      - 'off'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

## Accessibility

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-toggle
data:
  - keys: ['Space']
    description: 'Activates/deactivates the toggle.'
  - keys: ['Enter']
    description: 'Activates/deactivates the toggle.'
---
::
