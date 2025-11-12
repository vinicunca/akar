---
description: A tree view component to display and interact with hierarchical data structures.
category: element
links:
  - label: Pohon
    to: /docs/pohon/components/tree
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/tree/index.ts
---

:docs-component-example{name="a-tree"}

## Features

::docs-highlights
---
features:
  - Can be controlled or uncontrolled.
  - Focus is fully managed.
  - Full keyboard navigation.
  - Supports Right to Left direction.
  - Supports multiple selection.
  - Different selection behavior.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { ATreeItem, ATreeRoot, ATreeVirtualizer } from 'akar';
</script>

<template>
  <ATreeRoot>
    <ATreeItem />

    <!-- or with virtual -->
    <ATreeVirtualizer>
      <ATreeItem />
    </ATreeVirtualizer>
  </ATreeRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/tree"}

## API Reference

### Root

Contains all the parts of a tree.

:docs-component-example{name="a-tree-root"}

### Item

The item component.

:docs-component-example{name="a-tree-item"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-indent]'
    values: 'Number'
  - attribute: '[data-expanded]'
    values: 'Present when expanded'
  - attribute: '[data-selected]'
    values: 'Present when selected'
---
::

### Virtualizer

Virtual container to achieve list virtualization.

:docs-component-example{name="a-tree-virtualizer"}

## Examples

### Selecting multiple items

The `ATree` component allows you to select multiple items. You can enable this by providing an array of values instead of a single value and set `multiple="true"`.

```vue{12,17-18}
<script setup lang="ts">
import { ATreeRoot } from 'akar';
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
  <ATreeRoot
    v-model="selectedPeople"
    multiple
  >
    ...
  </ATreeRoot>
</template>
```

### Virtual List

Rendering a long list of item can slow down the app, thus using virtualization would significantly improve the performance.

See the [virtualization guide](/docs/akar/guides/virtualization.md) for more general info on virtualization.

```vue{8-15}
<script setup lang="ts">
import { ATreeItem, ATreeRoot, ATreeVirtualizer } from 'akar';
import { ref } from 'vue';
</script>

<template>
  <ATreeRoot :items>
    <ATreeVirtualizer
      v-slot="{ item }"
      :text-content="(opt) => opt.name"
    >
      <ATreeItem v-bind="item.bind">
        {{ person.name }}
      </ATreeItem>
    </ATreeVirtualizer>
  </ATreeRoot>
</template>
```

### With Checkbox

Some `ATree` component might want to show `toggled/indeterminate` checkbox. We can change the behavior of the `ATree` component by using a few props and `preventDefault` event.

We set `propagateSelect` to `true` because we want the parent checkbox to select/deselect it's descendants. Then, we add a checkbox that triggers `select` event.

```vue{10-11,17-25,27-30}
<script setup lang="ts">
import { ATreeItem, ATreeRoot } from 'akar';
import { ref } from 'vue';
</script>

<template>
  <ATreeRoot
    v-slot="{ flattenItems }"
    :items
    multiple
    propagate-select
  >
    <ATreeItem
      v-for="item in flattenItems"
      :key="item._id"
      v-bind="item.bind"
      v-slot="{ handleSelect, isSelected, isIndeterminate }"
      @select="(event) => {
        if (event.detail.originalEvent.type === 'click')
          event.preventDefault()
      }"
      @toggle="(event) => {
        if (event.detail.originalEvent.type === 'keydown')
          event.preventDefault()
      }"
    >
      <Icon
        v-if="item.hasChildren"
        icon="radix-icons:chevron-down"
      />

      <button
        tabindex="-1"
        @click.stop
        @change="handleSelect"
      >
        <Icon
          v-if="isSelected"
          icon="radix-icons:check"
        />
        <Icon
          v-else-if="isIndeterminate"
          icon="radix-icons:dash"
        />
        <Icon
          v-else
          icon="radix-icons:box"
        />
      </button>

      <div class="pl-2">
        {{ item.value.title }}
      </div>
    </ATreeItem>
  </ATreeRoot>
</template>
```

### Nested ATree Node

The default example shows flatten tree items and nodes, this enables [Virtualization](/docs/akar/components/tree.html#virtual-list) and custom feature such as Drag & Drop easier. However, you can also build it to have nested DOM node.

In `ATree.vue`,

```vue
<script setup lang="ts">
import { ATreeItem } from 'akar';

interface ATreeNode {
  title: string;
  icon: string;
  children?: Array<ATreeNode>;
}

withDefaults(defineProps<{
  treeItems: Array<ATreeNode>;
  level?: number;
}>(), { level: 0 });
</script>

<template>
  <li
    v-for=" tree in treeItems"
    :key="tree.title"
  >
    <ATreeItem
      v-slot="{ isExpanded }"
      as-child
      :level="level"
      :value="tree"
    >
      <button>…</button>

      <ul v-if="isExpanded && tree.children">
        <ATree
          :tree-items="tree.children"
          :level="level + 1"
        />
      </ul>
    </ATreeItem>
  </li>
</template>
```

In `CustomATree.vue`

```vue
<template>
  <ATreeRoot
    :items="items"
    :get-key="(item) => item.title"
  >
    <ATree :tree-items="items" />
  </ATreeRoot>
</template>
```

### Custom children schema

By default, `<ATreeRoot />` expects you to provide the list of node's children by passing a list of `children` for every node. You can override that by providing the `getChildren` prop.

::note

If the node doesn't have any children, `getChildren` should return `undefined` instead of an empty array.

::

```vue{22}
<script setup lang="ts">
import { ATreeRoot } from 'akar';
import { ref } from 'vue';

interface FileNode {
  title: string;
  icon: string;
}

interface DirectoryNode {
  title: string;
  icon: string;
  directories?: Array<DirectoryNode>;
  files?: Array<FileNode>;
}
</script>

<template>
  <ATreeRoot
    :items="items"
    :get-key="(item) => item.title"
    :get-children="(item) => (!item.files) ? item.directories : (!item.directories) ? item.files : [...item.directories, ...item.files]"
  >
    ...
  </ATreeRoot>
</template>
```

### Draggable/Sortable ATree

For more complex draggable `ATree` component, in this example we will be using [pragmatic-drag-and-drop](https://github.com/atlassian/pragmatic-drag-and-drop), as the core package for handling dnd.

<!-- TODO: Add demo for draggable -->
<!-- [Stackblitz Demo](https://stackblitz.com/edit/github-8f3fzs?file=src%2FATreeDND.vue) -->

## Accessibility

Adheres to the [ATree WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/).

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-tree
data:
  - keys: ['Enter']
    description: 'When highlight on <code>ATreeItem</code>, selects the focused item.'
  - keys: ['ArrowDown']
    description: 'When focus is on <code>ATreeItem</code>, moves focus to the next item.'
  - keys: ['ArrowUp']
    description: 'When focus is on <code>ATreeItem</code>, moves focus to the previous item.'
  - keys: ['ArrowRight']
    description: 'When focus is on a closed <code>ATreeItem</code> (node), it opens the node without moving focus. When on an open node, it moves focus to the first child node. When on an end node, it does nothing.'
  - keys: ['ArrowLeft']
    description: 'When focus is on an open <code>ATreeItem</code> (node), closes the node. When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node. When focus is on a root node that is also either an end node or a closed node, does nothing.'
  - keys: ['Home', 'PageUp']
    description: '<span>Moves focus first <code>ATreeItem</code></span>'
  - keys: ['End', 'PageDown']
    description: '<span>Moves focus last <code>ATreeItem</code></span>'
---
::
