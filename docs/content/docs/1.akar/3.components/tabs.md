---
description: A set of tab panels that are displayed one at a time.
category: element
links:
  - label: Pohon
    to: /docs/pohon/components/tabs
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/tabs/index.ts
---

:docs-component-example{name="a-tabs"}

## Features

::docs-highlights
---
features:
  - Can be controlled or uncontrolled.
  - Supports horizontal/vertical orientation.
  - Supports automatic/manual activation.
  - Full keyboard navigation.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { ATabsContent, ATabsIndicator, ATabsList, ATabsRoot, ATabsTrigger } from 'akar';
</script>

<template>
  <ATabsRoot>
    <ATabsList>
      <ATabsIndicator />
      <ATabsTrigger />
    </ATabsList>
    <ATabsContent />
  </ATabsRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/tabs"}

## API Reference

### Root

Contains all the tabs component parts.

:docs-component-meta{name="a-tabs-root"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-orientation]'
    values:
      - vertical
      - horizontal
---
::

### List

Contains the triggers that are aligned along the edge of the active content.

:docs-component-meta{name="a-tabs-list"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-orientation]'
    values:
      - vertical
      - horizontal
---
::

### Trigger

The button that activates its associated content.

:docs-component-meta{name="a-tabs-trigger"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - active
      - inactive
  - attribute: '[data-disabled]'
    values: Present when disabled
  - attribute: '[data-orientation]'
    values:
      - vertical
      - horizontal
---
::

### Indicator

The indicator that highlights the current active tab.

:docs-component-meta{name="a-tabs-indicator"}

::docs-css-variables-table
---
data:
  - cssVariable: --akar-tabs-indicator-size
    description: The size of the indicator
  - cssVariable: --akar-tabs-indicator-position
    description: The position of the indicator
---
::

### Content

Contains the content associated with each trigger.

:docs-presence-tip

:docs-component-meta{name="a-tabs-content"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - active
      - inactive
  - attribute: '[data-orientation]'
    values:
      - vertical
      - horizontal
---
::

## Examples

### Vertical

You can create vertical tabs by using the `orientation` prop.

```vue{8}
<script setup>
import { ATabsContent, ATabsList, ATabsRoot, ATabsTrigger } from 'akar';
</script>

<template>
  <ATabsRoot
    default-value="tab1"
    orientation="vertical"
  >
    <ATabsList aria-label="tabs example">
      <ATabsTrigger value="tab1">
        One
      </ATabsTrigger>
      <ATabsTrigger value="tab2">
        Two
      </ATabsTrigger>
      <ATabsTrigger value="tab3">
        Three
      </ATabsTrigger>
    </ATabsList>
    <ATabsContent value="tab1">
      Tab one content
    </ATabsContent>
    <ATabsContent value="tab2">
      Tab two content
    </ATabsContent>
    <ATabsContent value="tab3">
      Tab three content
    </ATabsContent>
  </ATabsRoot>
</template>
```

## Accessibility

Adheres to the [ATabs WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel).

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-tabs
data:
  - keys: ['Tab']
    description: 'When focus moves onto the tabs, focuses the active trigger. When a trigger is focused, moves focus to the active content.'
  - keys: ['ArrowDown']
    description: 'Moves focus to the next trigger depending on `orientation` and activates its associated content.'
  - keys: ['ArrowRight']
    description: 'Moves focus to the next trigger depending on `orientation` and activates its associated content.'
  - keys: ['ArrowUp']
    description: 'Moves focus to the previous trigger depending on `orientation` and activates its associated content.'
  - keys: ['ArrowLeft']
    description: 'Moves focus to the previous trigger depending on `orientation` and activates its associated content.'
  - keys: ['Home']
    description: 'Moves focus to the first trigger and activates its associated content.'
  - keys: ['End']
    description: 'Moves focus to the last trigger and activates its associated content.'
---
::
