---
description: A sequence of one-character alphanumeric inputs.
category: form
links:
  - label: Pohon
    to: /docs/pohon/components/pin-input
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/pin-input/index.ts
---

:docs-component-example{name="a-pin-input"}

## Features

::docs-Highlights
---
features:
  - Full keyboard navigation.
  - Can be controlled or uncontrolled.
  - Supports pasting from clipboard
  - Emit event when inputs were filled.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { APinInputInput, APinInputRoot } from 'akar';
</script>

<template>
  <APinInputRoot>
    <APinInputInput />
  </APinInputRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/pin-input"}

## API Reference

### Root

Contains all the parts of a pin. An `input` will also render when used within a `form` to ensure events propagate correctly.

:docs-component-meta{name="a-pin-input-root"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-complete]'
    values: 'Present when all inputs are filled'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### Input

Input field for Pin Input. You can add as many input as you like.

:docs-component-meta{name="a-pin-input-input"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-complete]'
    values: 'Present when all inputs are filled'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

## Examples

### OTP mode

You can set the pin input to `otp` mode by setting otp to `true`.

```vue{6}
<script setup lang="ts">
import { Label, APinInputInput, APinInputRoot } from 'akar'
</script>

<template>
  <APinInputRoot v-model="value" otp>
    …
  </APinInputRoot>
</template>
``

### Numeric mode

You can set the pin input to only accept `number` type by setting type to `number`.

```vue{6}
<script setup lang="ts">
import { Label, APinInputInput, APinInputRoot } from 'akar'
</script>

<template>
  <APinInputRoot v-model="value" type="number">
    …
  </APinInputRoot>
</template>
```

## Accessibility

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-number-field
data:
  - keys: ['ArrowLeft']
    description: Focus on previous input.
  - keys: ['ArrowRight']
    description: Focus on next input.
  - keys: ['Home']
    description: Focus on the first input.
  - keys: ['End']
    description: Focus on the last input.
  - keys: ['Backspace']
    description: Deletes the value of the current input. If the input is empty, moves to the previous input and deletes that value as well.
  - keys: ['Delete']
    description: Deletes the value of the current input.
  - keys: ['Ctrl + V']
    description: Pastes the contents of the clipboard into the pin input. If the number of characters in the clipboard equals exceeds the number of inputs, the contents are pasted from the first input. Otherwise, the contents are pasted from the current input onwards.
---
::
