---
description: Augments native scroll functionality for custom, cross-browser styling.
category: element
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/scroll-area/index.ts
---

:docs-component-example{name="a-scroll-area"}

## Features

::docs-highlights
---
features:
  - Scrollbar sits on top of the scrollable content, taking up no space.
  - Scrolling is native; no underlying position movements via CSS transformations.
  - Shims pointer behaviors only when interacting with the controls, so keyboard controls are unaffected.
  - Supports Right to Left direction.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { AScrollAreaRoot, AScrollAreaScrollbar, AScrollAreaThumb, AScrollAreaViewport } from 'akar';
</script>

<template>
  <AScrollAreaRoot>
    <AScrollAreaViewport />
    <AScrollAreaScrollbar orientation="horizontal">
      <AScrollAreaThumb />
    </AScrollAreaScrollbar>
    <AScrollAreaScrollbar orientation="vertical">
      <AScrollAreaThumb />
    </AScrollAreaScrollbar>
    <AScrollAreaCorner />
  </AScrollAreaRoot>
</template>
```

## API Reference

### Root

Contains all the parts of a scroll area.

:docs-component-meta{name="a-scroll-area-root"}

### Viewport

The viewport area of the scroll area.

:docs-component-meta{name="a-scroll-area-viewport"}

### Scrollbar

The vertical scrollbar. Add a second `Scrollbar` with an `orientation` prop to enable horizontal scrolling.

:docs-presence-tip

:docs-component-meta{name="a-scroll-area-scrollbar"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-orientation]'
    values:
      - vertical
      - horizontal
  - attribute: '[data-state]'
    values:
      - visible
      - hidden
---
::

### Thumb

The thumb to be used in `AScrollAreaScrollbar`.

:docs-component-meta{name="a-scroll-area-thumb"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - visible
      - hidden
---
::

### Corner

The corner where both vertical and horizontal scrollbars meet.

:docs-component-meta{name="a-scroll-area-corner"}

## Examples
### Custom Scroll
Use the exposed `viewport` to modify / or set the scroll position outside default methods

```vue{4,18}
<script setup lang="ts">
import { AScrollAreaRoot, AScrollAreaScrollbar, AScrollAreaThumb, AScrollAreaViewport } from 'akar'

const scrollArea = useTemplateRef('scrollArea')
function scrollToBottom() {
  const viewport = scrollArea.value?.viewport
  if (viewport) {
    const top = scrollArea.value?.$el.scrollHeight
    container.scrollTo({
      top,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <AScrollAreaRoot ref="scrollArea">
    <AScrollAreaViewport />
    <AScrollAreaScrollbar orientation="horizontal">
      <AScrollAreaThumb />
    </AScrollAreaScrollbar>
    <AScrollAreaScrollbar orientation="vertical">
      <AScrollAreaThumb />
    </AScrollAreaScrollbar>
    <AScrollAreaCorner />
  </AScrollAreaRoot>
</template>
```

## Accessibility

In most cases, it's best to rely on native scrolling and work with the customization options available in CSS. When that isn't enough, `AScrollArea` provides additional customizability while maintaining the browser's native scroll behavior (as well as accessibility features, like keyboard scrolling).

### Keyboard Interactions

Scrolling via keyboard is supported by default because the component relies on native scrolling. Specific keyboard interactions may differ between platforms, so we do not specify them here or add specific event listeners to handle scrolling via key events.
