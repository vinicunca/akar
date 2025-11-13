---
description: A set of steps that are used to indicate progress through a multi-step process.
category: element
links:
  - label: Pohon
    to: /docs/pohon/components/stepper
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/stepper/index.ts
---

:docs-component-example{name="a-slider"}

## Features

::docs-highlights
---
features:
  - Can be controlled or uncontrolled.
  - Supports horizontal/vertical orientation.
  - Supports linear/non-linear activation.
  - Full keyboard navigation.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { AStepperDescription, AStepperIndicator, AStepperItem, AStepperRoot, AStepperTitle, AStepperTrigger } from 'akar';
</script>

<template>
  <AStepperRoot>
    <AStepperItem>
      <AStepperTrigger />
      <AStepperIndicator />

      <AStepperTitle />
      <AStepperDescription />

      <AStepperSeparator />
    </AStepperItem>
  </AStepperRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/stepper"}

## API Reference

### Root

Contains all the stepper component parts.

:docs-component-meta{name="a-stepper-root"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
  - attribute: '[data-linear]'
    values: 'Present when linear'
---
::

### Item

The step item component.

:docs-component-meta{name="a-stepper-item"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - 'active'
      - 'inactive'
      - 'completed'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
---
::

### Trigger

The trigger that toggles the step.

:docs-component-meta{name="a-stepper-trigger"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - 'active'
      - 'inactive'
      - 'completed'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
---
::

### Indicator

The indicator for the step.

:docs-component-meta{name="a-stepper-indicator"}

### Title

An accessible title to be announced when the stepper trigger is focused.

If you want to hide the title, wrap it inside our Visually Hidden utility like this `<VisuallyHidden asChild>`.

:docs-component-meta{name="a-stepper-title"}

### Description

An optional accessible description to be announced when the stepper trigger is focused.

If you want to hide the description, wrap it inside our Visually Hidden utility like this `<VisuallyHidden asChild>`. If you want to remove the description entirely, remove this part and pass `aria-describedby="undefined"` to `AStepperTrigger`.

:docs-component-meta{name="a-stepper-item"}

## Examples

### Vertical

You can create vertical steps by using the `orientation` prop.

```vue{8}
<script setup>
import { AStepperDescription, AStepperIndicator, AStepperItem, AStepperRoot, AStepperTitle } from 'akar';
</script>

<template>
  <AStepperRoot
    :default-value="1"
    orientation="vertical"
  >
    <AStepperItem>
      <AStepperIndicator />
      <AStepperTitle />
      <AStepperDescription />
    </AStepperItem>
    <AStepperItem>
      <AStepperIndicator />
      <AStepperTitle />
      <AStepperDescription />
    </AStepperItem>
  </AStepperRoot>
</template>
```

### With controls

You can add additional controls for the stepper using buttons and access the typed component instance using `useTemplateRef`.

```vue{8}
<script setup lang="ts">
const stepper = useTemplateRef('stepper');
</script>

<template>
  <AStepperRoot
    ref="stepper"
    :default-value="1"
  >
    <AStepperItem>
      <AStepperIndicator />
      <AStepperTitle />
      <AStepperDescription />
    </AStepperItem>
    <AStepperItem>
      <AStepperIndicator />
      <AStepperTitle />
      <AStepperDescription />
    </AStepperItem>
  </AStepperRoot>

  <div class="mt-4 flex gap-2 justify-between">
    <button
      :disabled="!stepper?.hasPrev()"
      @click="stepper?.prevStep()"
    >
      Prev
    </button>

    <button
      :disabled="!stepper?.hasNext()"
      @click="stepper?.nextStep()"
    >
      Next
    </button>
  </div>
</template>
```

## Accessibility

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-stepper
data:
  - keys: ['Tab']
    description: 'When focus moves onto the steps, focuses the first step.
  - keys: ['ArrowDown']
    description: 'Moves focus to the next step depending on `orientation`.
  - keys: ['ArrowRight']
    description: 'Moves focus to the next step depending on `orientation`.
  - keys: ['ArrowUp']
    description: 'Moves focus to the previous step depending on `orientation`.
  - keys: ['ArrowLeft']
    description: 'Moves focus to the previous step depending on `orientation`.
  - keys: ['Enter', 'Space']
    description: 'Selects the focused step.'
---
::
