---
title: InputNumber
description: An input for numerical values with a customizable range.
category: form
links:
  - label: NumberField
    icon: i-custom-akar
    to: https://www.akar.com/docs/components/number-field
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/nuxt/ui/blob/v4/src/runtime/components/InputNumber.vue
---

## Usage

Use the `v-model` directive to control the value of the InputNumber.

::docs-pohon-preview
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::docs-pohon-preview
---
ignore:
  - defaultValue
props:
  defaultValue: 5
---
::

::note
This component relies on the [`@internationalized/number`](https://react-spectrum.adobe.com/internationalized/number/index.html) package which provides utilities for formatting and parsing numbers across locales and numbering systems.
::

### Min / Max

Use the `min` and `max` props to set the minimum and maximum values of the InputNumber.

::docs-pohon-preview
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  min: 0
  max: 10
---
::

### Step

Use the `step` prop to set the step value of the InputNumber.

::docs-pohon-preview
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  step: 2
---
::

### Orientation

Use the `orientation` prop to change the orientation of the InputNumber.

::docs-pohon-preview
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  orientation: vertical
---
::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

::docs-pohon-preview
---
props:
  placeholder: 'Enter a number'
---
::

### Color

Use the `color` prop to change the ring color when the InputNumber is focused.

::docs-pohon-preview
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  color: neutral
  highlight: true
---
::

### Variant

Use the `variant` prop to change the variant of the InputNumber.

::docs-pohon-preview
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  variant: subtle
  color: neutral
  highlight: false
---
::

### Size

Use the `size` prop to change the size of the InputNumber.

::docs-pohon-preview
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  size: xl
---
::

### Disabled

Use the `disabled` prop to disable the InputNumber.

::docs-pohon-preview
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  disabled: true
---
::

### Increment / Decrement

Use the `increment` and `decrement` props to customize the increment and decrement buttons with any [Button](/docs/components/button) props. Defaults to `{ variant: 'link' }`{lang="ts-type"}.

::docs-pohon-preview
---
prettier: true
ignore:
  - modelValue
  - increment.size
  - increment.color
  - increment.variant
  - decrement.size
  - decrement.color
  - decrement.variant
external:
  - modelValue
props:
  modelValue: 5
  increment:
    color: neutral
    variant: solid
    size: xs
  decrement:
    color: neutral
    variant: solid
    size: xs
---
::

### Increment / Decrement Icons

Use the `increment-icon` and `decrement-icon` props to customize the buttons [Icon](/docs/components/icon). Defaults to `i-lucide-plus` / `i-lucide-minus`.

::docs-pohon-preview
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  incrementIcon: 'i-lucide-arrow-right'
  decrementIcon: 'i-lucide-arrow-left'
---
::

## Examples

### With decimal format

Use the `format-options` prop to customize the format of the value.

::component-example
---
name: 'input-number-decimal-example'
---
::

### With percentage format

Use the `format-options` prop with `style: 'percent'` to customize the format of the value.

::component-example
---
name: 'input-number-percentage-example'
---
::

### With currency format

Use the `format-options` prop with `style: 'currency'` to customize the format of the value.

::component-example
---
name: 'input-number-currency-example'
---
::

### Within a FormField

You can use the InputNumber within a [FormField](/docs/components/form-field) component to display a label, help text, required indicator, etc.

::component-example
---
name: 'input-number-form-field-example'
---
::

### With slots

Use the `#increment` and `#decrement` slots to customize the buttons.

::component-example
---
name: 'input-number-slots-example'
---
::

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

### Expose

When accessing the component via a template ref, you can use the following:

| Name                       | Type                                            |
| -------------------------- | ----------------------------------------------- |
| `inputRef`{lang="ts-type"} | `Ref<InstanceType<typeof NumberFieldInput> \| null>`{lang="ts-type"} |

## Theme

:component-theme

## Changelog

:component-changelog
