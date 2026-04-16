---
description: A control that toggles between two states.
category: form
links:
  - label: Pohon
    to: /docs/pohon/components/switch
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/switch/index.ts
---

:docs-component-example{name="a-switch"}

## Features

::docs-highlights
---
features:
  - Full keyboard navigation.
  - Can be controlled or uncontrolled.
  - Supports custom true/false values.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { ASwitchRoot, ASwitchThumb } from 'akar';
</script>

<template>
  <ASwitchRoot>
    <ASwitchThumb />
  </ASwitchRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/switch"}

## API Reference

### Root

Contains all the parts of a switch. An `input` will also render when used within a `form` to ensure events propagate correctly.

:docs-component-meta{name="a-switch-root"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - 'checked'
      - 'unchecked'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### Thumb

The thumb that is used to visually indicate whether the switch is on or off.

:docs-component-meta{name="a-switch-thumb"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - 'checked'
      - 'unchecked'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

## Examples

### Custom Values

Use the `trueValue` and `falseValue` props to specify custom values for the on and off states instead of the default `true`/`false`.

```vue line=4-5,9-10
<script setup>
import { ASwitchRoot, ASwitchThumb } from 'akar';
import { ref } from 'vue';

// With string values
const status = ref('inactive');

// With number values
const enabled = ref(0);
</script>

<template>
  <!-- String values -->
  <ASwitchRoot
    v-model="status"
    true-value="active"
    false-value="inactive"
  >
    <ASwitchThumb />
  </ASwitchRoot>
  <span>Status: {{ status }}</span> <!-- "active" or "inactive" -->

  <!-- Number values -->
  <ASwitchRoot
    v-model="enabled"
    :true-value="1"
    :false-value="0"
  >
    <ASwitchThumb />
  </ASwitchRoot>
  <span>Enabled: {{ enabled }}</span> <!-- 1 or 0 -->
</template>
```

## Accessibility

Adheres to the [`switch` role requirements](https://www.w3.org/WAI/ARIA/apg/patterns/switch).

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-switch
data:
  - keys: ['Space']
    description: Toggles the component's state.
  - keys: ['Enter']
    description: Toggles the component's state.
---
::
