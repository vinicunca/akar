---
description: An input element to enter text.
category: form
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/Input.vue
---

## Usage

Use the `v-model` directive to control the value of the Input.

::docs-pohon-preview
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ''
---
::

### Type

Use the `type` prop to change the input type. Defaults to `text`.

Some types have been implemented in their own components such as [Checkbox](/docs/pohon/components/checkbox), [Radio](/docs/pohon/components/radio-group), [InputNumber](/docs/pohon/components/input-number) etc. and others have been styled like `file` for example.

::docs-pohon-preview
---
items:
  type:
    - text
    - number
    - password
    - search
    - file
props:
  type: 'file'
---
::

::callout{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types" target="_blank"}
You can check all the available types on the MDN Web Docs.
::

### CorePlaceholder

Use the `placeholder` prop to set a placeholder text.

::docs-pohon-preview
---
props:
  placeholder: 'Search...'
---
::

### Color

Use the `color` prop to change the ring color when the Input is focused.

::docs-pohon-preview
---
ignore:
  - placeholder
props:
  color: neutral
  highlight: true
  placeholder: 'Search...'
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Variant

Use the `variant` prop to change the variant of the Input.

::docs-pohon-preview
---
ignore:
  - placeholder
props:
  color: neutral
  variant: subtle
  highlight: false
  placeholder: 'Search...'
---
::

### Size

Use the `size` prop to change the size of the Input.

::docs-pohon-preview
---
ignore:
  - placeholder
props:
  size: xl
  placeholder: 'Search...'
---
::

### Icon

Use the `icon` prop to show an [Icon](/docs/pohon/components/icon) inside the Input.

::docs-pohon-preview
---
prettier: true
ignore:
  - placeholder
props:
  icon: 'i-lucide-search'
  size: md
  variant: outline
  placeholder: 'Search...'
---
::

Use the `leading` and `trailing` props to set the icon position or the `leading-icon` and `trailing-icon` props to set a different icon for each position.

::docs-pohon-preview
---
prettier: true
ignore:
  - placeholder
props:
  trailingIcon: i-lucide-at-sign
  placeholder: 'Enter your email'
  size: md
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/pohon/components/avatar) inside the Input.

::docs-pohon-preview
---
prettier: true
ignore:
  - placeholder
props:
  avatar:
    src: 'https://github.com/nuxt.png'
  size: md
  variant: outline
  placeholder: 'Search...'
---
::

### Loading

Use the `loading` prop to show a loading icon on the Input.

::docs-pohon-preview
---
ignore:
  - placeholder
props:
  loading: true
  trailing: false
  placeholder: 'Search...'
---
::

### Loading Icon

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

::docs-pohon-preview
---
ignore:
  - placeholder
props:
  loading: true
  loadingIcon: 'i-lucide-loader'
  placeholder: 'Search...'
---
::

::docs-framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `ui.icons.loading` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `ui.icons.loading` key.
:::
::

### Disabled

Use the `disabled` prop to disable the Input.

::docs-pohon-preview
---
ignore:
  - placeholder
props:
  disabled: true
  placeholder: 'Search...'
---
::

## Examples

### With clear button

You can put a [Button](/docs/pohon/components/button) inside the `#trailing` slot to clear the Input.

::docs-component-example
---
name: 'input-clear-button-example'
---
::

### With copy button

You can put a [Button](/docs/pohon/components/button) inside the `#trailing` slot to copy the value to the clipboard.

::docs-component-example
---
name: 'input-copy-button-example'
---
::

### With password toggle

You can put a [Button](/docs/pohon/components/button) inside the `#trailing` slot to toggle the password visibility.

::docs-component-example
---
name: 'input-password-toggle-example'
---
::

### With password strength indicator

You can use the [Progress](/docs/pohon/components/progress) component to display the password strength indicator.

::docs-component-example
---
collapse: true
name: 'input-password-strength-indicator-example'
---
::

### With character limit

You can use the `#trailing` slot to add a character limit to the Input.

::docs-component-example
---
name: 'input-character-limit-example'
---
::

### With keyboard shortcut

You can use the [Kbd](/docs/pohon/components/kbd) component inside the `#trailing` slot to add a keyboard shortcut to the Input.

::docs-component-example
---
name: 'input-kbd-example'
---
::

::note{to="/composables/define-shortcuts"}
This example uses the `defineShortcuts` composable to focus the Input when the :kbd{value="/"} key is pressed.
::

### With mask

There's no built-in support for masks, but you can use libraries like [maska](https://github.com/beholdr/maska) to mask the Input.

::docs-component-example
---
name: 'input-mask-example'
---
::

### With floating label

You can use the `#default` slot to add a floating label to the Input.

::docs-component-example
---
name: 'input-floating-label-example'
---
::

### Within a FormField

You can use the Input within a [FormField](/docs/pohon/components/form-field) component to display a label, help text, required indicator, etc.

::docs-component-example
---
name: 'input-form-field-example'
---
::

::tip{to="/docs/pohon/components/form"}
It also provides validation and error handling when used within a **Form** component.
::

### Within a FieldGroup

You can use the Input within a [FieldGroup](/docs/components/pohon/field-group) component to group multiple elements together.

::docs-component-example
---
name: 'input-field-group-example'
---
::

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

### Emits

:docs-pohon-emits

### Expose

When accessing the component via a template ref, you can use the following:

| Name | Type |
| ---- | ---- |
| `inputRef`{lang="ts-type"} | `Ref<HTMLInputElement \| null>`{lang="ts-type"} |

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
