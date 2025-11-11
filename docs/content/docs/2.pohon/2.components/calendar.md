---
title: Calendar
description: Displays dates and days of the week, facilitating date-related interactions.
category: element
links:
  - label: Calendar
    to: /docs/akar/components/calendar
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/calendar.vue
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

::note
This component relies on the [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/index.html) package which provides objects and functions for representing and manipulating dates and times in a locale-aware manner.
::

### Multiple

Use the `multiple` prop to allow multiple selections.

::docs-pohon-preview
---
prettier: true
cast:
  modelValue: DateValue[]
ignore:
  - multiple
  - modelValue
external:
  - modelValue
props:
  multiple: true
  modelValue: [[2022, 2, 4], [2022, 2, 6], [2022, 2, 8]]
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

Use the `color` prop to change the color of the calendar.

::docs-pohon-preview
---
props:
  color: neutral
---
::

### Variant

Use the `variant` prop to change the variant of the calendar.

::docs-pohon-preview
---
cast:
  defaultValue: DateRange
hide:
  - range
  - defaultValue
  - defaultValue.start
  - defaultValue.end
props:
  variant: subtle
  range: true
  defaultValue:
    start: [2022, 2, 3]
    end: [2022, 2, 20]
---
::

### Size

Use the `size` prop to change the size of the calendar.

::docs-pohon-preview
---
props:
  size: xl
---
::

### Disabled

Use the `disabled` prop to disable the calendar.

::docs-pohon-preview
---
props:
  disabled: true
---
::

### Number Of Months

Use the `numberOfMonths` prop to change the number of months in the calendar.

::docs-pohon-preview
---
props:
  numberOfMonths: 3
---
::

### Month Controls

Use the `month-controls` prop to show the month controls. Defaults to `true`.

::docs-pohon-preview
---
props:
  monthControls: false
---
::

### Year Controls

Use the `year-controls` prop to show the year controls. Defaults to `true`.

::docs-pohon-preview
---
props:
  yearControls: false
---
::

### Fixed Weeks

Use the `fixed-weeks` prop to display the calendar with fixed weeks.

::docs-pohon-preview
---
props:
  fixedWeeks: false
---
::

## Examples

### With chip events

Use the [Chip](/docs/pohon/components/chip) component to add events to specific days.

::docs-component-example
---
name: 'calendar-events-example'
---
::

### With disabled dates

Use the `is-date-disabled` prop with a function to mark specific dates as disabled.

::docs-component-example
---
name: 'calendar-disabled-dates-example'
---
::

### With unavailable dates

Use the `is-date-unavailable` prop with a function to mark specific dates as unavailable.

::docs-component-example
---
name: 'calendar-unavailable-dates-example'
---
::

### With min/max dates

Use the `min-value` and `max-value` props to limit the dates.

::docs-component-example
---
name: 'calendar-min-max-dates-example'
---
::

### With other calendar systems

You can use other calenders from `@internationalized/date` to implement a different calendar system.

::docs-component-example
---
name: 'calendar-other-system-example'
---
::

::note{to="https://react-spectrum.adobe.com/internationalized/date/Calendar.html#implementations"}
You can check all the available calendars on `@internationalized/date` docs.
::

### With external controls

You can control the calendar with external controls by manipulating the date passed in the `v-model`.

::docs-component-example
---
name: 'calendar-external-controls-example'
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

:docs-akar-to-pohon{to="/docs/akar/components/calendar" mode="pohon"}

## Changelog

:docs-component-changelog
