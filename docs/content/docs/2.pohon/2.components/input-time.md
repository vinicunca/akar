---
title: InputTime
description: Enables users to input specific times within a designated field.
category: form
links:
  - label: Akar
    to: /docs/akar/components/time-field
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/input-time.vue
---

## Usage

Use the `v-model` directive to control the selected date.

::docs-pohon-preview
---
cast:
  modelValue: TimeValue
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: [12, 30, 0]
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::docs-pohon-preview
---
cast:
  defaultValue: TimeValue
ignore:
  - defaultValue
external:
  - defaultValue
props:
  defaultValue: [12, 30, 0]
---
::

::note
This component relies on the [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/index.html) package which provides objects and functions for representing and manipulating dates and times in a locale-aware manner.
::

### Hour Cycle

Use the `hour-cycle` prop to change the hour cycle of the InputTime. Defaults to `12`.

::docs-pohon-preview
---
cast:
  defaultValue: TimeValue
ignore:
  - hourCycle
  - defaultValue
external:
  - defaultValue
props:
  hourCycle: 24
  defaultValue: [16, 30, 0]
---
::

### Color

Use the `color` prop to change the color of the InputTime.

::docs-pohon-preview
---
props:
  color: neutral
  highlight: true
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Variant

Use the `variant` prop to change the variant of the InputTime.

::docs-pohon-preview
---
props:
  variant: subtle
---
::

### Size

Use the `size` prop to change the size of the InputTime.

::docs-pohon-preview
---
props:
  size: xl
---
::

### Icon

Use the `icon` prop to show an [Icon](/docs/pohon/components/icon) inside the InputTime.

::docs-pohon-preview
---
props:
  icon: 'i-lucide-clock'
---
::

::note
Use the `leading` and `trailing` props to set the icon position or the `leading-icon` and `trailing-icon` props to set a different icon for each position.
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/pohon/components/avatar) inside the InputTime.

::docs-pohon-preview
---
prettier: true
props:
  avatar:
    src: 'https://github.com/vuejs.png'
  size: md
  variant: outline
---
::

### Disabled

Use the `disabled` prop to disable the InputTime.

::docs-pohon-preview
---
props:
  disabled: true
---
::

## Examples

### Within a FormField

You can use the InputTime within a [FormField](/docs/pohon/components/form-field) component to display a label, help text, required indicator, etc.

::docs-component-example
---
name: 'input-time-form-field-example'
---
::

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

### Emits

:docs-pohon-emits

## Theme

:docs-pohon-theme

## Akar

:docs-akar-to-pohon{to="/docs/akar/components/time-field" mode="pohon"}

## Changelog

:docs-component-changelog
