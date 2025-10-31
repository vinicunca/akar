---
description: Displays dates and days of the week, facilitating date-related interactions.
category: element
links:
  - label: Pohon
    to: /docs/pohon/components/calendar
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/calendar/index.ts
---

:docs-component-example{name="a-calendar"}

## Features

::docs-highlights
---
features:
  - Automatic and manual control over when the image renders.
  - Fallback part accepts any children.
  - Optionally delay fallback rendering to avoid content flashing.
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
  ACalendarCell,
  ACalendarCellTrigger,
  ACalendarGrid,
  ACalendarGridBody,
  ACalendarGridHead,
  ACalendarGridRow,
  ACalendarHeadCell,
  ACalendarHeader,
  ACalendarHeading,
  ACalendarNext,
  ACalendarPrev,
  ACalendarRoot,
} from 'akar'
</script>

<template>
  <ACalendarRoot>
    <ACalendarHeader>
      <ACalendarPrev />
      <ACalendarHeading />
      <ACalendarNext />
    </ACalendarHeader>
    <ACalendarGrid>
      <ACalendarGridHead>
        <ACalendarGridRow>
          <ACalendarHeadCell />
        </ACalendarGridRow>
      </ACalendarGridHead>
      <ACalendarGridBody>
        <ACalendarGridRow>
          <ACalendarCell>
            <ACalendarCellTrigger />
          </ACalendarCell>
        </ACalendarGridRow>
      </ACalendarGridBody>
    </ACalendarGrid>
  </ACalendarRoot>
</template>
```

## API Reference

### Root

Contains all the parts of a calendar

:docs-component-meta{name="a-calendar-root"}

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

:docs-component-meta{name="a-calendar-header"}

### Prev Button

Calendar navigation button. It navigates the calendar one month/year/decade in the past based on the current calendar view.

:docs-component-meta{name="a-calendar-prev"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Next Button

Calendar navigation button. It navigates the calendar one month/year/decade in the future based on the current calendar view.

:docs-component-meta{name="a-calendar-next"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Heading

Heading for displaying the current month and year

:docs-component-meta{name="a-calendar-heading"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled  
---
::

### Grid

Container for wrapping the calendar grid.

:docs-component-meta{name="a-calendar-grid"}

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

:docs-component-meta{name="a-calendar-grid-head"}

### Grid Body

Container for wrapping the grid body.

:docs-component-meta{name="a-calendar-grid-body"}

### Grid Row

Container for wrapping the grid row.

:docs-component-meta{name="a-calendar-grid-row"}

### Head Cell

Container for wrapping the head cell. Used for displaying the week days.

:docs-component-meta{name="a-calendar-head-cell"}

### Cell

Container for wrapping the calendar cells.

:docs-component-meta{name="a-calendar-cell"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Cell Trigger

Interactable container for displaying the cell dates. Clicking it selects the date.

:docs-component-meta{name="a-calendar-cell-trigger"}

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
---
::

## Examples

### Calendar with Year Incrementation

This example showcases a calendar which allows incrementing the year.

:docs-component-example{name="a-calendar-year-increment"}

### Calendar with Locale and Calendar System Selection

This example showcases some of the available locales and how the calendar systems are displayed.

:docs-component-example{name="a-calendar-select"}

### Calendar swipe gesture navigation

This component demonstrates intuitive calendar navigation using touch-based swipe gestures, user-friendly way to browse through months.

:docs-component-example{name="a-calendar-swipe"}

### Calendar week numbers

This example showcases usage of the CalendarWeek component used to display the number of the week.

:docs-component-example{name="a-calendar-weeks"}

## Accessibility

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-calendar
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
