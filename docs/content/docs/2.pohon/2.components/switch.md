---
description: A control that toggles between two states.
category: form
links:
  - label: Switch
    icon: i-custom-akar
    to: https://akar.com/docs/components/switch
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/nuxt/ui/blob/v4/src/runtime/components/Switch.vue
---

## Usage

Use the `v-model` directive to control the checked state of the Switch.

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

### Label

Use the `label` prop to set the label of the Switch.

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

Use the `description` prop to set the description of the Switch.

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

Use the `checked-icon` and `unchecked-icon` props to set the icons of the Switch when checked and unchecked.

::docs-pohon-preview
---
prettier: true
ignore:
  - label
  - defaultValue
props:
  uncheckedIcon: 'i-lucide-x'
  checkedIcon: 'i-lucide-check'
  defaultValue: true
  label: Check me
---
::

### Loading

Use the `loading` prop to show a loading icon on the Switch.

::docs-pohon-preview
---
ignore:
  - label
  - defaultValue
props:
  loading: true
  defaultValue: true
  label: Check me
---
::

### Loading Icon

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

::docs-pohon-preview
---
ignore:
  - label
  - defaultValue
props:
  loading: true
  loadingIcon: 'i-lucide-loader'
  defaultValue: true
  label: Check me
---
::

::framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `ui.icons.loading` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `ui.icons.loading` key.
:::
::

### Color

Use the `color` prop to change the color of the Switch.

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

### Size

Use the `size` prop to change the size of the Switch.

::docs-pohon-preview
---
ignore:
  - label
  - defaultValue
props:
  size: xl
  defaultValue: true
  label: Check me
---
::

### Disabled

Use the `disabled` prop to disable the Switch.

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

:component-props

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme

## Changelog

:component-changelog
