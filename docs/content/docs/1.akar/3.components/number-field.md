---
description: A number field allows a user to enter a number and increment or decrement the value using stepper buttons.
category: form
links:
  - label: Pohon
    to: /docs/pohon/components/input-number
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/number-field/index.ts
---

:docs-component-example{name="a-number-field"}

## Features

::docs-highlights
---
features:
  - Full keyboard navigation.
  - Can be controlled or uncontrolled.
  - Support button hold and wheel event.
  - Support numbering systems in different locale.
  - Customizable formatting.
---
::

::code-group{sync="pm"}

```bash [pnpm]
pnpm add @internationalized/number
```

```bash [npm]
npm install @internationalized/number
```

```bash [bun]
bun add @internationalized/number
```
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { ANumberFieldDecrement, ANumberFieldIncrement, ANumberFieldInput, ANumberFieldRoot } from 'akar';
</script>

<template>
  <ANumberFieldRoot>
    <ANumberFieldDecrement />
    <ANumberFieldInput />
    <ANumberFieldIncrement />
  </ANumberFieldRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/input-number"}

## API Reference

### Root

Contains all the parts of a number field. An `input` will also render when used within a `form` to ensure events propagate correctly.

:docs-component-meta{name="a-number-field-root"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Input

Input

The input component that renders the text value based on value and format options.

:docs-component-meta{name="a-number-field-input"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Increment

The button that increases the value.

:docs-component-meta{name="a-number-field-increment"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
  - attribute: '[data-pressed]'
    values: Present when pressed
---
::

### Decrement

The button that decreases the value.

:docs-component-meta{name="a-number-field-decrement"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
  - attribute: '[data-pressed]'
    values: Present when pressed
---
::

## Example

### Decimal

All options supported by `Intl.NumberFormat` are supported, including configuration of minimum and maximum fraction digits, sign display, grouping separators, etc.

```vue{3-7}
<template>
  <ANumberFieldRoot
    :default-value="5"
    :format-options="{
      signDisplay: 'exceptZero',
      minimumFractionDigits: 1,
    }"
  >
    …
  </ANumberFieldRoot>
</template>
```

### Percentage

You can set `formatOptions.style` to `percent` to treat the value as a percentage. You need to set the step to 0.01 manually to allow an appropriate step size in this mode.

```vue{3-7}
<template>
  <ANumberFieldRoot
    :default-value="0.05"
    :step="0.01"
    :format-options="{
      style: 'percent',
    }"
  >
    …
  </ANumberFieldRoot>
</template>
```

### Currency

You can set `formatOptions.style` to `currency` to treat the value as a currency value. The currency option must also be passed to set the currency code (e.g., USD).

If you need to allow the user to change the currency, you should include a separate dropdown next to the number field. The number field itself will not determine the currency from the user input.

```vue{4-9}
<template>
  <ANumberFieldRoot
    :default-value="5"
    :format-options="{
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
      currencySign: 'accounting',
    }"
  >
    …
  </ANumberFieldRoot>
</template>
```

## Accessibility

Adheres to the [Spinbutton WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton).

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-number-field
data:
  - keys: ['ArrowUp']
    description: 'Increase the value'
  - keys: ['ArrowDown']
    description: 'Decrease the value'
  - keys: ['PageUp']
    description: 'Increase the value by scale of 10'
  - keys: ['PageDown']
    description: 'Decrease the value by scale of 10'
  - keys: ['Home']
    description: 'Set value to minimum (if <code>min</code> is provided)'
  - keys: ['End']
    description: 'Set value to maximum (if <code>max</code> is provided)'
---
::
