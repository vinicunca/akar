---
description: A control that allows the user to toggle between checked and not checked.
category: form
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/listbox/index.ts
---

:docs-component-example{name="a-listbox"}

## Features

::docs-highlights
---
features:
  - Can be controlled or uncontrolled.
  - Supports items, labels, groups of items.
  - Focus is fully managed.
  - Full keyboard navigation.
  - Supports Right to Left direction.
  - Different selection behavior.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { AListboxContent, AListboxFilter, AListboxGroup, AListboxGroupLabel, AListboxItem, AListboxItemIndicator, AListboxRoot, AListboxVirtualizer } from 'akar';
</script>

<template>
  <AListboxRoot>
    <AListboxFilter />

    <AListboxContent>
      <AListboxItem>
        <AListboxItemIndicator />
      </AListboxItem>

      <!-- or with group -->
      <AListboxGroup>
        <AListboxGroupLabel />
        <AListboxItem>
          <AListboxItemIndicator />
        </AListboxItem>
      </AListboxGroup>

      <!-- or with virtual -->
      <AListboxVirtualizer>
        <AListboxItem>
          <AListboxItemIndicator />
        </AListboxItem>
      </AListboxVirtualizer>
    </AListboxContent>
  </AListboxRoot>
</template>
```

## API Reference

### Root

Contains all the parts of a listbox. An `input` will also render when used within a `form` to ensure events propagate correctly.

:docs-component-meta{name="a-listbox-root"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Filter

Input element to perform filtering.

:docs-component-meta{name="a-listbox-filter"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Content

Contains all the listbox group and items.

:docs-component-meta{name="a-listbox-content"}

### Item

The item component.

:docs-component-meta{name="a-listbox-item"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - checked
      - unchecked
  - attribute: '[data-highlighted]'
    values: Present when highlighted
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### ItemIndicator

Renders when the item is selected. You can style this element directly, or you can use it as a wrapper to put an icon into, or both.

:docs-component-meta{name="a-listbox-item-indicator"}

### Group

Used to group multiple items. use in conjunction with `AListboxGroupLabel` to ensure good accessibility via automatic labelling.

:docs-component-meta{name="a-listbox-group"}

### GroupLabel

Used to render the label of a group. It won't be focusable using arrow keys.

:docs-component-meta{name="a-listbox-group-label"}

### Virtualizer

Virtual container to achieve list virtualization.

:docs-component-meta{name="a-listbox-virtualizer"}

## Examples

### Binding objects as values

Unlike native HTML form controls which only allow you to provide strings as values, `akar` supports binding complex objects as well.

```vue{12,16,21}
<script setup lang="ts">
import { AListboxContent, AListboxItem, AListboxRoot } from 'akar';
import { ref } from 'vue';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];
const selectedPeople = ref(people[0]);
</script>

<template>
  <AListboxRoot v-model="selectedPeople">
    <AListboxContent>
      <AListboxItem
        v-for="person in people"
        :key="person.id"
        :value="person"
        :disabled="person.unavailable"
      >
        {{ person.name }}
      </AListboxItem>
    </AListboxContent>
  </AListboxRoot>
</template>
```

### Selecting multiple values

The `AListbox` component allows you to select multiple values. You can enable this by providing an array of values instead of a single value.

```vue{12,18}
<script setup lang="ts">
import { AListboxRoot } from 'akar';
import { ref } from 'vue';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];
const selectedPeople = ref([people[0], people[1]]);
</script>

<template>
  <AListboxRoot
    v-model="selectedPeople"
    multiple
  >
    ...
  </AListboxRoot>
</template>
```

### Custom filtering

```vue{13,15-16,21,24}
<script setup lang="ts">
import { AListboxContent, AListboxFilter, AListboxItem, AListboxRoot, useFilter } from 'akar';
import { ref } from 'vue';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];
const selectedPeople = ref(people[0]);
const searchTerm = ref('');

const { startsWith } = useFilter({ sensitivity: 'base' });
const filteredPeople = computed(() => people.filter((p) => startsWith(p.name, searchTerm.value)));
</script>

<template>
  <AListboxRoot v-model="selectedPeople">
    <AListboxFilter v-model="searchTerm" />
    <AListboxContent>
      <AListboxItem
        v-for="person in filteredPeople"
        :key="person.id"
        :value="person"
      >
        {{ person.name }}
      </AListboxItem>
    </AListboxContent>
  </AListboxRoot>
</template>
```

### Virtual List

Rendering a long list of item can slow down the app, thus using virtualization would significantly improve the performance.

See the [virtualization guide](/docs/akar/guides/virtualization.md) for more general info on virtualization.

```vue{18-23}
<script setup lang="ts">
import { AListboxContent, AListboxFilter, AListboxItem, AListboxRoot, AListboxVirtualizer } from 'akar';
import { ref } from 'vue';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
  // and a lot more
];
</script>

<template>
  <AListboxRoot>
    <AListboxContent>
      <AListboxVirtualizer
        v-slot="{ option }"
        :options="people"
        :text-content="(opt) => opt.name"
      >
        <AListboxItem :value="option">
          {{ person.name }}
        </AListboxItem>
      </AListboxVirtualizer>
    </AListboxContent>
  </AListboxRoot>
</template>
```

## Accessibility

Adheres to the [AListbox WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-calendar
data:
  - keys: ['Enter']
    description: '<span>When highlight on <code>AListboxItem</code>, selects the focused item. </span>'
  - keys: ['ArrowDown']
    description: 'When focus is on <code>AListboxItem</code>, moves focus to the next item. </span>'
  - keys: ['ArrowUp']
    description: 'When focus is on <code>AListboxItem</code>, moves focus to the previous item. </span>'
  - keys: ['Home']
    description: '<span>Moves focus and highlight to the first item.</span>'
  - keys: ['End']
    description: '<span>Moves focus and highlight to the last item.</span>'
  - keys: ['Ctrl/Cmd + A']
    description: '<span>Select all the items.</span>'
---
::
