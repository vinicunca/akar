---
category: overlay
description: A modal dialog that interrupts the user with important content and expects a response.
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/alert-dialog/index.ts
---

:docs-component-example{name="a-alert-dialog"}

## Features

::docs-highlights
---
features:
  - Focus is automatically trapped.
  - Can be controlled or uncontrolled.
  - Manages screen reader announcements with <code>Title</code> and <code>Description</code> components.
  - Esc closes the component automatically.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup lang="ts">
import {
  AAlertDialogAction,
  AAlertDialogCancel,
  AAlertDialogContent,
  AAlertDialogDescription,
  AAlertDialogOverlay,
  AAlertDialogPortal,
  AAlertDialogRoot,
  AAlertDialogTitle,
  AAlertDialogTrigger,
} from 'akar';
</script>

<template>
  <AAlertDialogRoot>
    <AAlertDialogTrigger />
    <AAlertDialogPortal>
      <AAlertDialogOverlay />
      <AAlertDialogContent>
        <AAlertDialogTitle />
        <AAlertDialogDescription />
        <AAlertDialogCancel />
        <AAlertDialogAction />
      </AAlertDialogContent>
    </AAlertDialogPortal>
  </AAlertDialogRoot>
</template>
```

## API Reference

### Root

Contains all the parts of an alert dialog.

:docs-component-meta{name="a-alert-dialog-root"}

### Trigger

A button that opens the dialog.

:docs-component-meta{name="a-alert-dialog-trigger"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - open
      - closed
---
::

### Portal

When used, portals your overlay and content parts into the <code>body</code>.

:docs-component-meta{name="a-alert-dialog-portal"}

### Overlay

A layer that covers the inert portion of the view when the dialog is open.

:docs-component-meta{name="a-alert-dialog-overlay"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - open
      - closed
---
::

### Content

Contains content to be rendered when the dialog is open.

:docs-component-meta{name="a-alert-dialog-content"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - open
      - closed
---
::

### Cancel

A button that closes the dialog. This button should be distinguished visually from `AAlertDialogAction` buttons.

:docs-component-meta{name="a-alert-dialog-cancel"}

### Action

A button that closes the dialog. These buttons should be distinguished visually from the `AAlertDialogCancel` button.

:docs-component-meta{name="a-alert-dialog-action"}

### Title

An accessible name to be announced when the dialog is opened. Alternatively, you can provide `aria-label` or `aria-labelledby` to `AAlertDialogContent` and exclude this component.

:docs-component-meta{name="a-alert-dialog-title"}

### Description

An accessible description to be announced when the dialog is opened. Alternatively, you can provide `aria-describedby` to `AAlertDialogContent` and exclude this component.

:docs-component-meta{name="a-alert-dialog-description"}

## Examples

### Close after asynchronous form submission

Use the controlled props to programmatically close the Alert Dialog after an async operation has completed.

```vue{14,15,19,25-29}
<script setup>
import {
  AAlertDialogAction,
  AAlertDialogCancel,
  AAlertDialogContent,
  AAlertDialogDescription,
  AAlertDialogOverlay,
  AAlertDialogPortal,
  AAlertDialogRoot,
  AAlertDialogTitle,
  AAlertDialogTrigger,
} from 'akar';

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
const open = ref(false);
</script>

<template>
  <AAlertDialogRoot v-model:open="open">
    <AAlertDialogTrigger>Open</AAlertDialogTrigger>
    <AAlertDialogPortal>
      <AAlertDialogOverlay />
      <AAlertDialogContent>
        <form
          @submit.prevent="
            (event) => {
              wait().then(() => open = false);
            }
          "
        >
          <!-- some inputs -->
          <button type="submit">
            Submit
          </button>
        </form>
      </AAlertDialogContent>
    </AAlertDialogPortal>
  </AAlertDialogRoot>
</template>
```

<br />

### Custom portal container

Customise the element that your alert dialog portals into.

```vue{4,17}
<script setup>
import { ref } from 'vue';

const container = ref(null);
</script>

<template>
  <div>
    <AAlertDialogRoot>
      <AAlertDialogTrigger />
      <AAlertDialogPortal :to="container">
        <AAlertDialogOverlay />
        <AAlertDialogContent>...</AAlertDialogContent>
      </AAlertDialogPortal>
    </AAlertDialogRoot>

    <div ref="container" />
  </div>
</template>
```

## Accessibility

Adheres to the [Alert and Message Dialogs WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog).

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-alert-dialog
data:
  - keys: ['Space']
    description: 'Opens/closes the dialog.'
  - keys: ['Enter']
    description: 'Opens/closes the dialog.'
  - keys: ['Tab']
    description: 'Moves focus to the next focusable element.'
  - keys: ['Shift + Tab']
    description: 'Moves focus to the previous focusable element.'
  - keys: ['Esc']
    description: 'Closes the dialog and moves focus to `AAlertDialogTrigger`.'
---
::
