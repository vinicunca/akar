---
description: A set of radio buttons to select a single option from a list.
category: form
links:
  - label: Pohon
    to: /docs/pohon/components/radio-group
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/radio-group/index.ts
---

:docs-component-example{name="a-radio-group"}

## Features

::docs-highlights
---
features:
  - Full keyboard navigation.
  - Supports horizontal/vertical orientation.
  - Can be controlled or uncontrolled.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { ARadioGroupIndicator, ARadioGroupItem, ARadioGroupRoot } from 'akar';
</script>

<template>
  <ARadioGroupRoot>
    <ARadioGroupItem>
      <ARadioGroupIndicator />
    </ARadioGroupItem>
  </ARadioGroupRoot>
</template>
```

## API Reference

### Root

Contains all the parts of a radio group.

:docs-component-meta{name="a-radio-group-root"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### Item

An item in the group that can be checked. An `input` will also render when used within a `form` to ensure events propagate correctly.

:docs-component-meta{name="a-radio-group-item"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - checked
      - unchecked
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### Indicator

Renders when the radio item is in a checked state. You can style this element directly, or you can use it as a wrapper to put an icon into, or both.

:docs-presence-tip

:docs-component-meta{name="a-radio-group-indicator"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - checked
      - unchecked
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

## Accessibility

Adheres to the [Radio Group WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton) and uses [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.2/examples/radio/radio.html) to manage focus movement among radio items.

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-radio-group
data:
  - keys: ['Tab']
    description: Moves focus to either the checked radio item or the first radio item in the group.
  - keys: ['Space']
    description: When focus is on an unchecked radio item, checks it.
  - keys: ['ArrowDown']
    description: Moves focus and checks the next radio item in the group.
  - keys: ['ArrowRight']
    description: Moves focus and checks the next radio item in the group.
  - keys: ['ArrowUp']
    description: Moves focus to the previous radio item in the group.
  - keys: ['ArrowLeft']
    description: Moves focus to the previous radio item in the group.
---
::
