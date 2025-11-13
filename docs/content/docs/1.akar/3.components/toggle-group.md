---
description: A set of two-state buttons that can be toggled on or off.
category: form
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/toggle-group/index.ts
---

:docs-component-example{name="a-toggle-group"}

## Features

::docs-highlights
---
features:
  - Full keyboard navigation.
  - Supports horizontal/vertical orientation.
  - Support single and multiple pressed buttons.
  - Can be controlled or uncontrolled.
---
::

## Anatomy

Import the component.

```vue
<script setup>
import { AToggleGroupItem, AToggleGroupRoot } from 'akar';
</script>

<template>
  <AToggleGroupRoot>
    <AToggleGroupItem />
  </AToggleGroupRoot>
</template>
```

## API Reference

### Root

Contains all the parts of a toggle group.

:docs-component-meta{name="a-toggle-group-root"}

::docs-data-attribute-table
---
data:
  - attribute: '[data-orientation]'
    values:
      - vertical
      - horizontal
---
::

### Item

An item in the group.

:docs-component-meta{name="a-toggle-group-item"}

::docs-data-attribute-table
---
data:
  - attribute: '[data-state]'
    values:
      - on
      - off
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values:
      - vertical
      - horizontal
---
::

## Examples

### Ensuring there is always a value

You can control the component to ensure a value.

```vue{5,10-13}
<script setup>
import { AToggleGroupItem, AToggleGroupRoot } from 'akar';
import { ref } from 'vue';

const value = ref('left');
</script>

<template>
  <AToggleGroupRoot
    :model-value="value"
    @update:model-value="(val) => {
      if (val) value = val
    }"
  >
    <AToggleGroupItem value="left">
      <TextAlignLeftIcon />
    </AToggleGroupItem>
    <AToggleGroupItem value="center">
      <TextAlignCenterIcon />
    </AToggleGroupItem>
    <AToggleGroupItem value="right">
      <TextAlignRightIcon />
    </AToggleGroupItem>
  </AToggleGroupRoot>
</template>
```

## Accessibility

Uses [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.2/examples/radio/radio.html) to manage focus movement among items.

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-toggle-group
data:
  - keys: ['Tab']
    description: 'Moves focus to either the pressed item or the first item in the group.'
  - keys: ['Space']
    description: 'Activates/deactivates the item.'
  - keys: ['Enter']
    description: 'Activates/deactivates the item.'
  - keys: ['ArrowDown']
    description: 'Moves focus to the next item in the group.'
  - keys: ['ArrowRight']
    description: 'Moves focus to the next item in the group.'
  - keys: ['ArrowUp']
    description: 'Moves focus to the previous item in the group.'
  - keys: ['ArrowLeft']
    description: 'Moves focus to the previous item in the group.'
  - keys: ['Home']
    description: 'Moves focus to the first item.'
  - keys: ['End']
    description: 'Moves focus to the last item.'
---
::
