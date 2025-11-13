---
description: Allows users to input a range of dates within a designated field.
category: form
links:
  - label: Pohon
    to: /docs/pohon/components/input-date#range
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/date-range-field/index.ts
---

:docs-component-example{name="a-date-range-field"}

## Features

::docs-highlights
---
features:
  - Full keyboard navigation.
  - Can be controlled or uncontrolled.
  - Focus is fully managed.
  - Localization support.
  - Highly composable.
  - Accessible by default.
  - Supports both date and date-time formats.
---
::

## Preface

The component depends on the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package, which solves a lot of the problems that come with working with dates and times in JavaScript.

We highly recommend reading through the documentation for the package to get a solid feel for how it works, and you'll need to install it in your project to use the date-related components.

## Installation

Install the date package.

::code-group{sync="pm"}

```bash [pnpm]
pnpm add @internationalized/date
```

```bash [npm]
npm install @internationalized/date
```

```bash [bun]
bun add @internationalized/date
```
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import {
  ADateRangeFieldInput,
  ADateRangeFieldRoot,
} from 'akar';
</script>

<template>
  <ADateRangeFieldRoot>
    <ADateRangeFieldInput />
  </ADateRangeFieldRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/input-date#range"}

## API Reference

### Root

Contains all the parts of a date field

:docs-component-meta{name="a-date-range-field-root"}

::data-attributes-table
---
data:
  - attribute: '[data-readonly]'
    values: Present when readonly
  - attribute: '[data-disabled]'
    values: Present when disabled
  - attribute: '[data-invalid]'
    values: Present when invalid
---
::

### Input

Contains the date field segments

:docs-component-meta{name="a-date-range-field-input"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
  - attribute: '[data-invalid]'
    values: Present when invalid
  - attribute: '[data-placeholder]'
    values: Present when no value is set
---
::

## Accessibility

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-date-range-field
data:
  - keys: ['Tab']
    description: 'When focus moves onto the date field, focuses the first segment.'
  - keys: ['ArrowLeft', 'ArrowRight']
    description: 'Navigates between the date field segments.'
  - keys: ['ArrowUp', 'ArrowDown']
    description: 'Increments/changes the value of the segment.'
  - keys: ['0-9']
    description: When the focus is on a numeric `ADateFieldInput`, it types in number and focuses the next segment if the next input would result in an invalid value.
  - keys: ['Backspace']
    description: 'Deletes a digit from the focused numeric segments.'
  - keys: ['A', 'P']
    description: 'When the focus is on the day period, it sets it to AM or PM.'
---
::
