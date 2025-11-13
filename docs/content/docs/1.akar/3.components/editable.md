---
description: Displays an input field used for editing a single line of text, rendering as static text on load.
category: form
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/editable/index.ts
---

:docs-component-example{name="a-editable"}

## Features

::docs-highlights
---
features:
  - Full keyboard navigation.
  - Can be controlled or uncontrolled.
  - Focus is fully managed.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import {
  AEditableArea,
  AEditableCancelTrigger,
  AEditableEditTrigger,
  AEditableInput,
  AEditablePreview,
  AEditableRoot,
  AEditableSubmitTrigger
} from 'akar';
</script>

<template>
  <AEditableRoot>
    <AEditableArea>
      <AEditablePreview />
      <AEditableInput />
    </AEditableArea>
    <AEditableEditTrigger />
    <AEditableSubmitTrigger />
    <AEditableCancelTrigger />
  </AEditableRoot>
</template>
```

## API Reference

### Root

Contains all the parts of an editable component.

:docs-component-meta{name="a-editable-root"}

### Area

Contains the text parts of an editable component.

:docs-component-meta{name="a-editable-area"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-readonly]'
    values: Present when readonly
  - attribute: '[data-disabled]'
    values: Present when disabled
  - attribute: '[data-placeholder-shown]'
    values: Present when preview is shown
  - attribute: '[data-empty]'
    values: Present when the input is empty
  - attribute: '[data-focus]'
    values: Present when the editable field is focused. To be deprecated in favor of [data-focused]
  - attribute: '[data-focused]'
    values: Present when the editable field is focused
---
::

### Input

Contains the input of an editable component.

:docs-component-meta{name="a-editable-input"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
  - attribute: '[data-invalid]'
    values: Present when invalid
---
::

### Preview

Contains the preview of the editable component.

:docs-component-meta{name="a-editable-preview"}

### Edit Trigger

Contains the edit trigger of the editable component.

:docs-component-meta{name="a-editable-edit-trigger"}

### Submit Trigger

Contains the submit trigger of the editable component.

:docs-component-meta{name="a-editable-submit-trigger"}

### Cancel Trigger

Contains the cancel trigger of the editable component.

:docs-component-meta{name="a-editable-cancel-trigger"}

## Examples

### Change only on submit

By default the component will submit when `blur` event triggers. We can modify the `submit-mode` prop to alter this behavior.
In this case, we want to submit only when user click on `AEditableSubmitTrigger`, so we change the submit mode to `none`.

```vue line=2,8
<template>
  <AEditableRoot submit-mode="none">
    <AEditableArea>
      <AEditablePreview />
      <AEditableInput />
    </AEditableArea>
    <AEditableEditTrigger />
    <AEditableSubmitTrigger />
    <AEditableCancelTrigger />
  </AEditableRoot>
</template>
```

## Accessibility

### Keyboard Interactions

::docs-keyboard-table
---
name: a-keyboard-table
data:
  - keys: ['Tab']
    description: 'When focus moves onto the editable field, switches into the editable mode if the `activation-mode` is set to focus.'
  - keys: ['Enter']
    description: 'If the `submit-mode` is set to `enter` or `both`, it submits the changes.'
  - keys: ['Escape']
    description: 'When the focus is on the editable field, it cancels the changes.'
---
::
