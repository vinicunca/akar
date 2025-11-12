---
description: A component that divides your layout into resizable sections.
category: element
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/splitter/index.ts
---

:docs-component-example{name="a-splitter"}

## Features

::docs-highlights
---
features:
  - Supports keyboard interaction.
  - Supports horizontal/vertical layout.
  - Supports nested layout.
  - Supports Right to Left direction.
  - Can resize across another panel.
  - Can be mounted conditionally.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from 'akar';
</script>

<template>
  <ASplitterGroup>
    <ASplitterPanel />
    <ASplitterResizeHandle />
  </ASplitterGroup>
</template>
```

## API Reference

### Group

Contains all the parts of a ASplitter.

:docs-component-meta{name="a-splitter-group.md"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-orientation]'
    values:
      - vertical
      - horizontal
  - attribute: '[data-state]'
    values:
      - collapsed
      - expanded
      - Present when collapsible
---
::

### Panel

A collapsible section.

:docs-component-meta{name="a-splitter-panel.md"}

### Resize Handle

Handle that use for resizing.

:docs-component-meta{name="a-splitter-resize-handle.md"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
  - attribute: '[data-state]'
    values:
      - 'drag'
      - 'hover'
      - 'inactive'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

## Examples

### Collapsible

Use the `collapsible` prop to allow the panel to collapse into `collapsedSize` when `minSize` is reached.

(`collapsedSize` and `minSize` props are required.)

```vue{4-6}
<template>
  <ASplitterGroup>
    <ASplitterPanel
      collapsible
      :collapsed-size="10"
      :min-size="35"
    >
      Panel A
    </ASplitterPanel>
    <ASplitterResizeHandle />
    <ASplitterPanel>
      Panel B
    </ASplitterPanel>
  </ASplitterGroup>
</template>
```

### Persist in localStorage

Use the `autoSaveId` prop to save the layout data into `localStorage`.

```vue{2}
<template>
  <ASplitterGroup auto-save-id="any-id">
    …
  </ASplitterGroup>
</template>
```

### Persist layout with SSR

By default, ASplitter uses `localStorage` to persist layouts. With server rendering, this can cause a flicker when the default layout (rendered on the server) is replaced with the persisted layout (in `localStorage`). The way to avoid this flicker is to also persist the layout with a cookie like so:

```vue{3,,8-9,11,15}
<!-- with Nuxt -->
<script setup lang="ts">
const layout = useCookie<number[]>('splitter:layout')
</script>

<template>
  <ASplitterGroup
    direction="horizontal"
    @layout="layout = $event"
  >
    <ASplitterPanel :default-size="layout[0]">
      …
    </ASplitterPanel>
    <ASplitterResizeHandle />
    <ASplitterPanel :default-size="layout[1]">
      …
    </ASplitterPanel>
  </ASplitterGroup>
</template>
```

### Collapse/Expand programmatically

Sometimes panels need to resize or collapse/expand in response to user actions. `ASplitterPanel` exposes the `collapse` and `expand` methods to achieve this.

```vue{2,7,14}
<script setup lang="ts">
const panelRef = ref<InstanceType<typeof ASplitterPanel>>()
</script>

<template>
  <button
    @click="panelRef?.isCollapsed ? panelRef?.expand() : panelRef?.collapse() "
  >
    {{ panelRef?.isCollapsed ? 'Expand' : 'Collapse' }}
  </button>

  <ASplitterGroup>
    <ASplitterPanel
      ref="panelRef"
      collapsible
      :collapsed-size="10"
      :min-size="35"
    >
      …
    </ASplitterPanel>
    <ASplitterResizeHandle />
    <ASplitterPanel>
      …
    </ASplitterPanel>
  </ASplitterGroup>
</template>
```

### Custom handle

Customize the handle by passing any element as the slot.

 ```vue{6-8}
<template>
   <ASplitterGroup>
     <ASplitterPanel>
       …
     </ASplitterPanel>
     <ASplitterResizeHandle>
       <Icon icon="radix-icons-drag-handle-dots-2" />
     </ASplitterResizeHandle>
     <ASplitterPanel>
       …
     </ASplitterPanel>
   </ASplitterGroup>
</template>
```

### SSR

ASplitter component heavily relies on unique `id`, however for Vue<3.4 we don't have a reliable way of generating [SSR-friendly `id`](https://github.com/vuejs/rfcs/discussions/557).

Thus, if you are using Nuxt or other SSR framework, you are required to manually add the `id` for all ASplitter components. Alternatively, you can wrap the component with `<ClientOnly>`.

```vue
<template>
  <ASplitterGroup id="group-1">
    <ASplitterPanel id="group-1-panel-1">
      …
    </ASplitterPanel>
    <ASplitterResizeHandle id="group-1-resize-1">
      <Icon icon="radix-icons-drag-handle-dots-2" />
    </ASplitterResizeHandle>
    <ASplitterPanel id="group-1-panel-2">
      …
    </ASplitterPanel>
  </ASplitterGroup>
</template>
```

## Accessibility

Adheres to the [Window ASplitter WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter).

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-accordion
data:
  - keys: ['Enter']
    description: 'If the primary pane is not collapsed, collapses the pane. If the pane is collapsed, restores the splitter to its previous position.'
  - keys: ['ArrowDown']
    description: 'Moves a horizontal splitter down.'
  - keys: ['ArrowUp']
    description: 'Moves a horizontal splitter up.'
  - keys: ['ArrowRight']
    description: 'Moves a vertical splitter to the right.'
  - keys: ['ArrowLeft']
    description: 'Moves a vertical splitter to the left.'
  - keys: ['Home']
    description: 'Moves splitter to the position that gives the primary pane its smallest allowed size. '
  - keys: ['End']
    description: 'Moves splitter to the position that gives the primary pane its largest allowed size.'
---
::
