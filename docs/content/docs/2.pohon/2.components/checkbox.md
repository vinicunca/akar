---
description: An input element to toggle between checked and unchecked states.
category: form
links:
  - label: Checkbox
    icon: custom-akar
    to: /docs/akar/components/checkbox
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/checkbox.vue
---

## Usage

Use the `v-model` directive to control the checked state of the Checkbox.

::docs-pohon-preview
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: true
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::docs-pohon-preview
---
ignore:
  - defaultValue
props:
  defaultValue: true
---
::

### Indeterminate

Use the `indeterminate` value in the `v-model` directive or `default-value` prop to set the Checkbox to an [indeterminate state](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes).

::docs-pohon-preview
---
ignore:
  - defaultValue
props:
  defaultValue: 'indeterminate'
---
::

### Indeterminate Icon

Use the `indeterminate-icon` prop to customize the indeterminate icon. Defaults to `i-lucide-minus`.

::docs-pohon-preview
---
ignore:
  - defaultValue
props:
  defaultValue: 'indeterminate'
  indeterminateIcon: 'i-lucide-plus'
---
::

::docs-framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `ui.icons.minus` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `ui.icons.minus` key.
:::
::

### Label

Use the `label` prop to set the label of the Checkbox.

::docs-pohon-preview
---
props:
  label: Check me
---
::

When using the `required` prop, an asterisk is added next to the label.

::docs-pohon-preview
---
ignore:
  - label
props:
  required: true
  label: Check me
---
::

### Description

Use the `description` prop to set the description of the Checkbox.

::docs-pohon-preview
---
ignore:
  - label
props:
  label: Check me
  description: 'This is a checkbox.'
---
::

### Icon

Use the `icon` prop to set the icon of the Checkbox when it is checked. Defaults to `i-lucide-check`.

::docs-pohon-preview
---
ignore:
  - label
  - defaultValue
props:
  icon: 'i-lucide-heart'
  defaultValue: true
  label: Check me
---
::

::docs-framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `ui.icons.check` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `ui.icons.check` key.
:::
::

### Color

Use the `color` prop to change the color of the Checkbox.

::docs-pohon-preview
---
ignore:
  - label
  - defaultValue
props:
  color: neutral
  defaultValue: true
  label: Check me
---
::

### Variant

Use the `variant` prop to change the variant of the Checkbox.

::docs-pohon-preview
---
ignore:
  - label
  - defaultValue
props:
  color: 'primary'
  variant: 'card'
  defaultValue: true
  label: Check me
---
::

### Size

Use the `size` prop to change the size of the Checkbox.

::docs-pohon-preview
---
ignore:
  - label
  - defaultValue
props:
  size: xl
  variant: list
  defaultValue: true
  label: Check me
---
::

### Indicator

Use the `indicator` prop to change the position or hide the indicator. Defaults to `start`.

::docs-pohon-preview
---
ignore:
  - label
  - defaultValue
props:
  indicator: 'end'
  variant: 'card'
  defaultValue: true
  label: Check me
---
::

### Disabled

Use the `disabled` prop to disable the Checkbox.

::docs-pohon-preview
---
ignore:
  - label
props:
  disabled: true
  label: Check me
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
