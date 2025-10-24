---
title: ColorPicker
description: A component to select a color.
category: form
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/nuxt/ui/blob/v4/src/runtime/components/ColorPicker.vue
---

## Usage

Use the `v-model` directive to control the value of the ColorPicker.

::docs-pohon-preview
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: '#00C16A'
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::docs-pohon-preview
---
ignore:
  - defaultValue
props:
  defaultValue: '#00BCD4'
---
::

### RGB Format

Use the `format` prop to set `rgb` value of the ColorPicker.

::docs-pohon-preview
---
ignore:
  - modelValue
  - format
external:
  - modelValue
props:
  format: rgb
  modelValue: 'rgb(0, 193, 106)'
---
::

### HSL Format

Use the `format` prop to set `hsl` value of the ColorPicker.

::docs-pohon-preview
---
ignore:
  - modelValue
  - format
external:
  - modelValue
props:
  format: hsl
  modelValue: 'hsl(153, 100%, 37.8%)'
---
::

### CMYK Format

Use the `format` prop to set `cmyk` value of the ColorPicker.

::docs-pohon-preview
---
ignore:
  - modelValue
  - format
external:
  - modelValue
props:
  format: cmyk
  modelValue: 'cmyk(100%, 0%, 45.08%, 24.31%)'
---
::

### CIELab Format

Use the `format` prop to set `lab` value of the ColorPicker.

::docs-pohon-preview
---
ignore:
  - modelValue
  - format
external:
  - modelValue
props:
  format: lab
  modelValue: 'lab(68.88% -60.41% 32.55%)'
---
::

### Throttle

Use the `throttle` prop to set the throttle value of the ColorPicker.

::docs-pohon-preview
---
ignore:
  - modelValue
external:
  - modelValue
props:
  throttle: 100
  modelValue: '#00C16A'
---
::

### Size

Use the `size` prop to set the size of the ColorPicker.

::docs-pohon-preview
---
props:
  size: xl
---
::

### Disabled

Use the `disabled` prop to disable the ColorPicker.

::docs-pohon-preview
---
props:
  disabled: true
---
::

## Examples

### As a Color chooser

Use a [Button](/docs/components/button) and a [Popover](/docs/components/popover) component to create a color chooser.

::component-example
---
name: 'color-picker-chooser-example'
---
::

## API

### Props

:component-props

### Emits

:component-emits

## Theme

:component-theme

## Changelog

:component-changelog
