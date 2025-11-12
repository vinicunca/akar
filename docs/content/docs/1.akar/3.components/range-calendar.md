---
description: Presents a calendar view tailored for selecting date ranges.
category: element
links:
  - label: Pohon
    to: /docs/pohon/components/calendar#range
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/range-calendar/index.ts
---

:docs-component-example{name="a-range-calendar"}

## Features

::docs-highlights
---
features:
  - Full keyboard navigation
  - Can be controlled or uncontrolled
  - Focus is fully managed
  - Localization support
  - Highly composable
---
::

## Preface

The component depends on the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package, which solves a lot of the problems that come with working with dates and times in JavaScript.

We highly recommend reading through the documentation for the package to get a solid feel for how it works, and you'll need to install it in your project to use the date-related components.

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import {
  ARangeCalendarCell,
  ARangeCalendarCellTrigger,
  ARangeCalendarGrid,
  ARangeCalendarGridBody,
  ARangeCalendarGridHead,
  ARangeCalendarGridRow,
  ARangeCalendarHeadCell,
  ARangeCalendarHeader,
  ARangeCalendarHeading,
  ARangeCalendarNext,
  ARangeCalendarPrev,
  ARangeCalendarRoot,
} from 'akar';
</script>

<template>
  <ARangeCalendarRoot>
    <ARangeCalendarHeader>
      <ARangeCalendarPrev />
      <ARangeCalendarHeading />
      <ARangeCalendarNext />
    </ARangeCalendarHeader>
    <ARangeCalendarGrid>
      <ARangeCalendarGridHead>
        <ARangeCalendarGridRow>
          <ARangeCalendarHeadCell />
        </ARangeCalendarGridRow>
      </ARangeCalendarGridHead>
      <ARangeCalendarGridBody>
        <ARangeCalendarGridRow>
          <ARangeCalendarCell>
            <ARangeCalendarCellTrigger />
          </ARangeCalendarCell>
        </ARangeCalendarGridRow>
      </ARangeCalendarGridBody>
    </ARangeCalendarGrid>
  </ARangeCalendarRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/calendar#range"}

## API Reference

### Root

Contains all the parts of a calendar

:docs-component-meta{name="a-range-calendar-root"}

::docs-data-attributes-table
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

### Header

Contains the navigation buttons and the heading segments.

:docs-component-meta{name="a-range-calendar-header"}

### Prev Button

Calendar navigation button. It navigates the calendar one month/year/decade in the past based on the current calendar view.

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

:docs-component-meta{name="a-range-calendar-prev"}

### Next Button

Calendar navigation button. It navigates the calendar one month/year/decade in the future based on the current calendar view.

:docs-component-meta{name="a-range-calendar-next"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Heading

Heading for displaying the current month and year.

:docs-component-meta{name="a-range-calendar-heading"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Grid

Container for wrapping the calendar grid.

:docs-component-meta{name="a-range-calendar-grid"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-readonly]'
    values: Present when readonly
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Grid Head

Container for wrapping the grid head.

:docs-component-meta{name="a-range-calendar-grid-head"}

### Grid Body

Container for wrapping the grid body.

:docs-component-meta{name="a-range-calendar-grid-body"}

### Grid Row

Container for wrapping the grid row.

:docs-component-meta{name="a-range-calendar-grid-row"}

### Head Cell

Container for wrapping the head cell. Used for displaying the week days.

:docs-component-meta{name="a-range-calendar-head-cell"}

### Cell

Container for wrapping the calendar cells.

:docs-component-meta{name="a-range-calendar-cell"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Cell Trigger

Interactable container for displaying the cell dates. Clicking it selects the date.

:docs-component-meta{name="a-range-calendar-cell-trigger"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-selected]'
    values: Present when selected
  - attribute: '[data-value]'
    values: The ISO string value of the date.
  - attribute: '[data-disabled]'
    values: Present when disabled
  - attribute: '[data-unavailable]'
    values: Present when unavailable
  - attribute: '[data-today]'
    values: Present when today
  - attribute: '[data-outside-view]'
    values: Present when the date is outside the current month it is displayed in.
  - attribute: '[data-outside-visible-view]'
    values: Present when the date is outside the months that are visible on the calendar.
  - attribute: '[data-focused]'
    values: Present when focused
  - attribute: '[data-selection-start]'
    values: 'Present when the date is the start of the selection.'
  - attribute: '[data-selection-end]'
    values: 'Present when the date is the end of the selection.'
  - attribute: '[data-highlighted]'
    values: 'Present when the date is highlighted by the user as they select a range.'
  - attribute: '[data-highlighted-start]'
    values: 'Present when the date is the start of the range that is highlighted by the user.'
  - attribute: '[data-highlighted-end]'
    values: 'Present when the date is the end of the range that is highlighted by the user.'
  - attribute: '[data-focused]'
    values: 'Present when focused'
---
::

## Accessibility

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-range-calendar
data:
  - keys: ['Tab']
    description: 'When focus moves onto the calendar, focuses the first navigation button.'
  - keys: ['Space']
    description: <span>When the focus is on either <Code>CalendarNext</Code> or <Code>CalendarPrev</Code>, it navigates the calendar. Otherwise, it selects the date. </span>
  - keys: ['Enter']
    description: <span>When the focus is on either <Code>CalendarNext</Code> or <Code>CalendarPrev</Code>, it navigates the calendar. Otherwise, it selects the date.</span>
  - keys: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
    description: When the focus is on <Code>CalendarCellTrigger</Code>, it navigates the dates, changing the month/year/decade if necessary.
---
::
