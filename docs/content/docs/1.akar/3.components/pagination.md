---
description: Displays data in paged format and provides navigation between pages.
category: element
links:
  - label: Pohon
    to: /docs/pohon/components/pagination
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/pagination/index.ts
---

:docs-component-example{name="a-pagination"}

## Features

::docs-highlights
---
features:
  - Enable quick access to first, or last page
  - Enable to show edges constantly, or not
---
::

### Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { APaginationEllipsis, APaginationFirst, APaginationLast, APaginationList, APaginationListItem, APaginationNext, APaginationPrev, APaginationRoot } from 'akar';
</script>

<template>
  <APaginationRoot>
    <APaginationList v-slot="{ items }">
      <APaginationFirst />
      <APaginationPrev />
      <template v-for="(page, index) in items">
        <APaginationListItem
          v-if="page.type === 'page'"
          :key="index"
        />
        <APaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
        >
          &#8230;
        </APaginationEllipsis>
      </template>
      <APaginationNext />
      <APaginationLast />
    </APaginationList>
  </APaginationRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/pagination"}

## API Reference

### Root

Contains all of the paginations parts.

:docs-component-meta{name="a-pagination-root"}

### List

Used to show the list of pages. It also makes pagination accessible to assistive technologies.

:docs-component-meta{name="a-pagination-list"}

### Item

Used to render the button that changes the current page.

:docs-component-meta{name="a-pagination-item"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-selected]'
    values:
      - 'true'
      - ''
  - attribute: '[data-type]'
    values:
      - page
---
::

### Ellipsis

Placeholder element when the list is long, and only a small amount of `siblingCount` was set and `showEdges` was set to `true`.

:docs-component-meta{name="a-pagination-ellipsis"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-type]'
    values:
      - ellipsis
---
::

### First

Triggers that set the page value to 1

:docs-component-meta{name="a-pagination-first"}

### Prev

Triggers that set the page value to the previous page

:docs-component-meta{name="a-pagination-prev"}

### Next

Triggers that set the page value to the next page

:docs-component-meta{name="a-pagination-next"}

### Last

Triggers that set the page value to the last page

:docs-component-meta{name="a-pagination-last"}

## Examples

### With ellipsis

You can add `APaginationEllipsis` as a visual cue for more previous and after items.

```vue{10,14}
<script setup lang="ts">
import { APaginationEllipsis, APaginationList, APaginationListItem, APaginationRoot } from 'akar';
</script>

<template>
  <APaginationRoot>
    <APaginationList v-slot="{ items }">
      <template v-for="(page, index) in items">
        <APaginationListItem
          v-if="page.type === 'page'"
          :key="index"
        />
        <APaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
        >
          &#8230;
        </APaginationEllipsis>
      </template>
    </APaginationList>
  </APaginationRoot>
</template>
```

### With first/last button

You can add `APaginationFirst` to allow user to navigate to first page, or `APaginationLast` to navigate to last page.

```vue{8,10}
<script setup lang="ts">
import { APaginationFirst, APaginationLast, APaginationList, APaginationListItem, APaginationRoot } from 'akar';
</script>

<template>
  <APaginationRoot>
    <APaginationList>
      <APaginationFirst />
      ...
      <APaginationLast />
    </APaginationList>
  </APaginationRoot>
</template>
```

### Control page programmatically

You can control the current page by passing it a reactive value.

```vue{6,10,11}
<script setup lang="ts">
import { APaginationRoot } from 'akar';
import { ref } from 'vue';
import { Select } from './custom-select';

const currentPage = ref(1);
</script>

<template>
  <Select v-model="currentPage" />
  <APaginationRoot v-model:page="currentPage">
    ...
  </APaginationRoot>
</template>
```

## Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-pagination
data:
  - keys: ['Tab']
    description: 'Moves focus to the next focusable element.'
  - keys: ['Space']
    description: "<span>When focus is on a any trigger, trigger selected page or arrow navigation</span>"
  - keys: ['Enter']
    description: "<span>When focus is on a any trigger, trigger selected page or arrow navigation</span>"
---
::
