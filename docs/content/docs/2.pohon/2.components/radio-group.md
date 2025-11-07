---
title: RadioGroup
description: A set of radio buttons to select a single option from a list.
category: form
links:
  - label: RadioGroup
    to: /docs/akar/components/radio-group
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/radio-group.vue
---

## Usage

Use the `v-model` directive to control the value of the RadioGroup or the `default-value` prop to set the initial value when you do not need to control its state.

::docs-pohon-preview
---
prettier: true
ignore:
  - modelValue
  - items
external:
  - items
  - modelValue
props:
  modelValue: 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

### Items

Use the `items` prop as an array of strings or numbers:

::docs-pohon-preview
---
prettier: true
ignore:
  - modelValue
  - items
external:
  - items
  - modelValue
props:
  modelValue: 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

You can also pass an array of objects with the following properties:

- `label?: string`
- `description?: string`
- [`value?: string`](#value-key)
- `disabled?: boolean`
- `class?: any`
- `pohon?: { item?: ClassNameValue, container?: ClassNameValue, base?: ClassNameValue, 'indicator'?: ClassNameValue, wrapper?: ClassNameValue, label?: ClassNameValue, description?: ClassNameValue }`

::docs-pohon-preview
---
ignore:
  - modelValue
  - items
external:
  - items
  - modelValue
externalTypes:
  - RadioGroupItem[]
props:
  modelValue: 'system'
  items:
    - label: 'System'
      description: 'This is the first option.'
      value: 'system'
    - label: 'Light'
      description: 'This is the second option.'
      value: 'light'
    - label: 'Dark'
      description: 'This is the third option.'
      value: 'dark'
---
::

::caution
When using objects, you need to reference the `value` property of the object in the `v-model` directive or the `default-value` prop.
::

### Value Key

You can change the property that is used to set the value by using the `value-key` prop. Defaults to `value`.

::docs-pohon-preview
---
ignore:
  - modelValue
  - items
  - valueKey
external:
  - items
  - modelValue
externalTypes:
  - RadioGroupItem[]
props:
  modelValue: 'light'
  valueKey: 'id'
  items:
    - label: 'System'
      description: 'This is the first option.'
      id: 'system'
    - label: 'Light'
      description: 'This is the second option.'
      id: 'light'
    - label: 'Dark'
      description: 'This is the third option.'
      id: 'dark'
---
::

### Legend

Use the `legend` prop to set the legend of the RadioGroup.

::docs-pohon-preview
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
props:
  legend: 'Theme'
  defaultValue: 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

### Color

Use the `color` prop to change the color of the RadioGroup.

::docs-pohon-preview
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
props:
  color: neutral
  defaultValue: 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

### Variant

Use the `variant` prop to change the variant of the RadioGroup.

::docs-pohon-preview
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
externalTypes:
  - RadioGroupItem[]
props:
  color: 'primary'
  variant: 'table'
  defaultValue: 'pro'
  items:
    - label: 'Pro'
      value: 'pro'
      description: 'Tailored for indie hackers, freelancers and solo founders.'
    - label: 'Startup'
      value: 'startup'
      description: 'Best suited for small teams, startups and agencies.'
    - label: 'Enterprise'
      value: 'enterprise'
      description: 'Ideal for larger teams and organizations.'
---
::

### Size

Use the `size` prop to change the size of the RadioGroup.

::docs-pohon-preview
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
props:
  size: 'xl'
  variant: 'list'
  defaultValue: 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

### Orientation

Use the `orientation` prop to change the orientation of the RadioGroup. Defaults to `vertical`.

::docs-pohon-preview
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
props:
  orientation: 'horizontal'
  variant: 'list'
  defaultValue: 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

### Indicator

Use the `indicator` prop to change the position or hide the indicator. Defaults to `start`.

::docs-pohon-preview
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
props:
  indicator: 'end'
  variant: 'card'
  defaultValue: 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
---
::

### Disabled

Use the `disabled` prop to disable the RadioGroup.

::docs-pohon-preview
---
prettier: true
ignore:
  - defaultValue
  - items
external:
  - items
props:
  disabled: true
  defaultValue: 'System'
  items:
    - 'System'
    - 'Light'
    - 'Dark'
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

## Changelog

:docs-component-changelog
