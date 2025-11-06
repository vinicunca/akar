---
category: form
description: A control that allows the user to toggle between checked and not checked.
links:
  - label: Pohon
    to: /docs/pohon/components/checkbox
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/checkbox/index.ts
---

:docs-component-example{name="a-checkbox"}

## Features

::docs-highlights
---
features:
  - Supports indeterminate state.
  - Full keyboard navigation.
  - Can be controlled or uncontrolled.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { ACheckboxGroupRoot, ACheckboxIndicator, ACheckboxRoot } from 'akar'
</script>

<template>
  <ACheckboxRoot>
    <ACheckboxIndicator />
  </ACheckboxRoot>

  <!-- or with array support -->
  <ACheckboxGroupRoot>
    <ACheckboxRoot>
      <ACheckboxIndicator />
    </ACheckboxRoot>
  </ACheckboxGroupRoot>
</template>
```

## API Reference

### Root

Contains all the parts of a checkbox. An `input` will also render when used within a `form` to ensure events propagate correctly.

:docs-component-meta{name="a-checkbox-root"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - checked
      - unchecked
      - indeterminate
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### Indicator

Renders when the checkbox is in a checked or indeterminate state. You can style this element directly, or you can use it as a wrapper to put an icon into, or both.

:docs-presence-tip

:docs-component-meta{name="a-checkbox-indicator"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - checked
      - unchecked
      - indeterminate
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### Group Root

Wrapper around `CheckboxRoot` to support array of `modelValue`

:docs-component-meta{name="a-checkbox-group-root"}

## Examples

### Indeterminate

You can set the checkbox to `indeterminate` by taking control of its state.

```vue {5,9-14,16-18}
<script setup>
import { Icon } from '@iconify/vue'
import { ACheckboxIndicator, ACheckboxRoot } from 'akar'

const checked = ref('indeterminate')
</script>

<template>
  <ACheckboxRoot v-model="checked">
    <ACheckboxIndicator>
      <Icon
        v-if="checked === 'indeterminate'"
        icon="radix-icons:divider-horizontal"
      />
      <Icon
        v-if="checked"
        icon="radix-icons:check"
      />
    </ACheckboxIndicator>
  </ACheckboxRoot>

  <button
    type="button"
    @click="() => (checked === 'indeterminate' ? (checked = false) : (checked = 'indeterminate'))"
  >
    Toggle indeterminate
  </button>
</template>
```

## Accessibility

Adheres to the [tri-state Checkbox WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox).

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-checkbox
data:
  - keys: ['Space']
    description: 'Checks/unchecks the checkbox'
---
::
