---
description: Facilitates the selection of date ranges through an input and calendar-based interface.
category: form
links:
  - label: Pohon
    to: /docs/pohon/components/input-date#range-picker
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/date-range-picker/index.ts
---

:docs-component-example{name="a-date-range-picker"}

## Features

::docs-highlights
---
features:
  - Full keyboard navigation.
  - Can be controlled or uncontrolled.
  - Focus is fully managed.
  - Localization support.
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
  ADateRangePickerAnchor,
  ADateRangePickerArrow,
  ADateRangePickerCalendar,
  ADateRangePickerCell,
  ADateRangePickerCellTrigger,
  ADateRangePickerClose,
  ADateRangePickerContent,
  ADateRangePickerField,
  ADateRangePickerGrid,
  ADateRangePickerGridBody,
  ADateRangePickerGridHead,
  ADateRangePickerGridRow,
  ADateRangePickerHeadCell,
  ADateRangePickerHeader,
  ADateRangePickerHeading,
  ADateRangePickerInput,
  ADateRangePickerNext,
  ADateRangePickerPrev,
  ADateRangePickerRoot,
  ADateRangePickerTrigger,
} from 'akar';
</script>

<template>
  <ADateRangePickerRoot>
    <ADateRangePickerField>
      <ADateRangePickerInput />
      <ADateRangePickerTrigger />
    </ADateRangePickerField>

    <ADateRangePickerAnchor />

    <ADateRangePickerContent>
      <ADateRangePickerClose />
      <ADateRangePickerArrow />

      <ADateRangePickerCalendar>
        <ADateRangePickerHeader>
          <ADateRangePickerPrev />
          <ADateRangePickerHeading />
          <ADateRangePickerNext />
        </ADateRangePickerHeader>

        <ADateRangePickerGrid>
          <ADateRangePickerGridHead>
            <ADateRangePickerGridRow>
              <ADateRangePickerHeadCell />
            </ADateRangePickerGridRow>
          </ADateRangePickerGridHead>

          <ADateRangePickerGridBody>
            <ADateRangePickerGridRow>
              <ADateRangePickerCell>
                <ADateRangePickerCellTrigger />
              </ADateRangePickerCell>
            </ADateRangePickerGridRow>
          </ADateRangePickerGridBody>
        </ADateRangePickerGrid>
      </ADateRangePickerCalendar>
    </ADateRangePickerContent>
  </ADateRangePickerRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/input-date#range-picker"}

## API Reference

### Root

Contains all the parts of a date picker

:docs-component-meta{name="a-date-range-picker-root"}

### Field

Contains the date picker date field segments and trigger

:docs-component-meta{name="a-date-range-picker-field"}

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

### Input

Contains the date picker date field segments

:docs-component-meta{name="a-date-range-picker-input"}

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

### Trigger

The button that toggles the popover. By default, the `ADateRangePickerContent` will position itself against the trigger.

:docs-component-meta{name="a-date-range-picker-trigger"}

### Content

The component that pops out when the popover is open.

:docs-component-meta{name="a-date-range-picker-content"}

### Arrow

An optional arrow element to render alongside the popover. This can be used to help visually link the anchor with the `ADateRangePickerContent`. Must be rendered inside `ADateRangePickerContent`.

:docs-component-meta{name="a-date-range-picker-arrow"}

### Close

The button that closes an open date picker.

:docs-component-meta{name="a-date-range-picker-close"}

### Anchor

An optional element to position the `ADateRangePickerContent` against. If this part is not used, the content will position alongside the `ADateRangePickerTrigger`.

:docs-component-meta{name="a-date-range-picker-anchor"}

### Calendar

Contains all the parts of a calendar

:docs-component-meta{name="a-date-range-picker-calendar"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
  - attribute: '[data-readonly]'
    values: Present when readonly
  - attributes: '[data-invalid]'
    values: Present when invalid
---
::

### Header

Contains the navigation buttons and the heading segments.

:docs-component-meta{name="a-date-range-picker-header"}

### Prev Button

Calendar navigation button. It navigates the calendar one month/year/decade in the past based on the current calendar view.

:docs-component-meta{name="a-date-range-picker-prev"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Next Button

Calendar navigation button. It navigates the calendar one month/year/decade in the future based on the current calendar view.

:docs-component-meta{name="a-date-range-picker-next"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Heading

Heading for displaying the current month and year

:docs-component-meta{name="a-date-range-picker-heading"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Grid

Container for wrapping the calendar grid.

:docs-component-meta{name="a-date-range-picker-grid"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
  - attribute: '[data-readonly]'
    values: Present when readonly
---
::

### Grid Head

Container for wrapping the grid head.

:docs-component-meta{name="a-date-range-picker-grid-head"}

### Grid Body

Container for wrapping the grid body.

:docs-component-meta{name="a-date-range-picker-grid-body"}

### Grid Row

Container for wrapping the grid row.

:docs-component-meta{name="a-date-range-picker-grid-row"}

### Head Cell

Container for wrapping the head cell. Used for displaying the week days.

:docs-component-meta{name="a-date-range-picker-head-cell"}

### Cell

Container for wrapping the calendar cells.

:docs-component-meta{name="a-date-range-picker-cell"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Cell Trigger

Interactable container for displaying the cell dates. Clicking it selects the date.

:docs-component-meta{name="a-date-range-picker-cell-trigger"}

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

## Accessibility

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-date-picker
data:
  - keys: ['Tab']
    description: 'When focus moves onto the date field, focuses the first segment.'
  - keys: ['Space']
    description: '<span>When the focus is on either <Code>ADatePickerNext</Code> or <Code>ADatePickerPrev</Code>, it navigates the calendar. Otherwise, it selects the date. If the focus is on <Code>ADatePickerTrigger</Code>, it opens/closes the popover.</span>'
  - keys: ['Enter']
    description: '<span> When the focus is on either <Code>ADatePickerNext</Code> or <Code>ADatePickerPrev</Code>, it navigates the calendar. Otherwise it selects the date. If the focus is on <Code>ADatePickerTrigger</Code>, it opens/closes the popover.</span>'
  - keys: ['ArrowLeft', 'ArrowRight']
    description: 'Navigates between the date field segments. If the focus is on the <Code>ADatePickerCalendar</Code>, it navigates between dates.'
  - keys: ['ArrowUp', 'ArrowDown']
    description: 'Increments/changes the value of the segment. If the focus is on the <Code>ADatePickerCalendar</Code>, it navigates between the dates.'
  - keys: ['0-9']
    description: 'When the focus is on a numeric <Code>ADatePickerInput</Code>, it types in the number and focuses the next segment if the next input would result in an invalid value.'
  - keys: ['Backspace']
    description: 'Deletes a digit from the focused numeric segments.'
  - keys: ['A', 'P']
    description: 'When the focus is on the day period, it sets it to AM or PM.'
---
::
