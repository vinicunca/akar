---
title: InputDate
description: Enables users to input specific dates within a designated field.
category: form
links:
  - label: Akar
    to: /docs/akar/components/date-field
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/input-date.vue
---

## Usage

Use the `v-model` directive to control the selected date.

::docs-pohon-preview
---
cast:
  modelValue: DateValue
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: [2022, 2, 3]
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::docs-pohon-preview
---
cast:
  defaultValue: DateValue
ignore:
  - defaultValue
external:
  - defaultValue
props:
  defaultValue: [2022, 2, 6]
---
::

### Range

Use the `range` prop to select a range of dates.

::docs-pohon-preview
---
prettier: true
cast:
  modelValue: DateRange
ignore:
  - range
  - modelValue.start
  - modelValue.end
external:
  - modelValue
props:
  range: true
  modelValue:
    start: [2022, 2, 3]
    end: [2022, 2, 20]
---
::

### Color

Use the `color` prop to change the color of the InputDate.

::docs-pohon-preview
---
props:
  color: neutral
  highlight: true
---
::

### Variant

Use the `variant` prop to change the variant of the InputDate.

::docs-pohon-preview
---
props:
  variant: subtle
---
::

### Size

Use the `size` prop to change the size of the InputDate.

::docs-pohon-preview
---
props:
  size: xl
---
::

### Separator Icon

Use the `separator-icon` prop to change the icon of the range separator.

::docs-pohon-preview
---
props:
  range: true
  separatorIcon: 'i-lucide-arrow-right'
---
::

### Disabled

Use the `disabled` prop to disable the InputDate.

::docs-pohon-preview
---
props:
  disabled: true
---
::

## Examples

### With unavailable dates

Use the `is-date-unavailable` prop with a function to mark specific dates as unavailable.

::docs-component-example
---
name: 'input-date-unavailable-dates-example'
---
::

### With min/max dates

Use the `min-value` and `max-value` props to limit the dates.

::docs-component-example
---
name: 'input-date-min-max-dates-example'
---
::

### As a DatePicker

Use a [Calendar](/docs/pohon/components/calendar) and a [Popover](/docs/pohon/components/popover) component to create a date picker.

::docs-component-example
---
name: 'input-date-date-picker-example'
---
::

### As a DateRangePicker

Use a [Calendar](/docs/pohon/components/calendar) and a [Popover](/docs/pohon/components/popover) component to create a date range picker.

::docs-component-example
---
name: 'input-date-date-range-picker-example'
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

:docs-akar-to-pohon{to="/docs/akar/components/date-field" mode="pohon"}

## Changelog

:docs-component-changelog
