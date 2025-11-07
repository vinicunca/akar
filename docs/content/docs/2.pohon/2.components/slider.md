---
description: An input to select a numeric value within a range.
category: form
links:
  - label: Slider
    to: /docs/akar/components/slider
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/slider.vue
---

## Usage

Use the `v-model` directive to control the value of the Slider.

::docs-pohon-preview
---
external:
  - modelValue
props:
  modelValue: 50
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::docs-pohon-preview
---
ignore:
  - defaultValue
props:
  defaultValue: 50
---
::

### Min / Max

Use the `min` and `max` props to set the minimum and maximum values of the Slider. Defaults to `0` and `100`.

::docs-pohon-preview
---
ignore:
  - defaultValue
props:
  min: 0
  max: 50
  defaultValue: 50
---
::

### Step

Use the `step` prop to set the increment value of the Slider. Defaults to `1`.

::docs-pohon-preview
---
ignore:
  - defaultValue
props:
  step: 10
  defaultValue: 50
---
::

### Multiple

Use the `v-model` directive or the `default-value` prop with an array of values to create a range Slider.

::docs-pohon-preview
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: [25, 75]
---
::

Use the `min-steps-between-thumbs` prop to limit the minimum distance between the thumbs.

::docs-pohon-preview
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: [25, 50, 75]
  minStepsBetweenThumbs: 10
---
::

### Orientation

Use the `orientation` prop to change the orientation of the Slider. Defaults to `horizontal`.

::docs-pohon-preview
---
ignore:
  - defaultValue
  - class
props:
  orientation: vertical
  defaultValue: 50
  class: 'akar:h-48'
---
::

### Color

Use the `color` prop to change the color of the Slider.

::docs-pohon-preview
---
ignore:
  - defaultValue
props:
  color: neutral
  defaultValue: 50
---
::

### Size

Use the `size` prop to change the size of the Slider.

::docs-pohon-preview
---
ignore:
  - defaultValue
props:
  size: xl
  defaultValue: 50
---
::

### Tooltip

Use the `tooltip` prop to display a [Tooltip](/docs/pohon/components/tooltip) around the Slider thumbs with the current value. You can set it to `true` for default behavior or pass an object to customize it with any property from the [Tooltip](/docs/pohon/components/tooltip#props) component.

::docs-pohon-preview
---
ignore:
  - defaultValue
  - tooltip
props:
  defaultValue: 50
  tooltip: true
---
::

### Disabled

Use the `disabled` prop to disable the Slider.

::docs-pohon-preview
---
ignore:
  - defaultValue
props:
  disabled: true
  defaultValue: 50
---
::

### Inverted

Use the `inverted` prop to visually invert the Slider.

::docs-pohon-preview
---
ignore:
  - defaultValue
props:
  inverted: true
  defaultValue: 25
---
::

## API

### Props

:docs-pohon-props

### Emits

:docs-pohon-emits

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
