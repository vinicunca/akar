---
description: A non-modal dialog that floats around a trigger element.
category: overlay
links:
  - label: Pohon
    to: /docs/pohon/components/popover
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/popover/index.ts
---

:docs-component-example{name="a-popover"}

## Features

::docs-highlights
---
features:
 - Can be controlled or uncontrolled.
 - Customize side, alignment, offsets, collision handling.
 - Optionally render a pointing arrow.
 - Focus is fully managed and customizable.
 - Supports modal and non-modal modes.
 - Dismissing and layering behavior is highly customizable.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { APopoverAnchor, APopoverArrow, APopoverClose, APopoverContent, APopoverPortal, APopoverRoot, APopoverTrigger } from 'akar';
</script>

<template>
  <APopoverRoot>
    <APopoverTrigger />
    <APopoverAnchor />
    <APopoverPortal>
      <APopoverContent>
        <APopoverClose />
        <APopoverArrow />
      </APopoverContent>
    </APopoverPortal>
  </APopoverRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/popover"}

## API Reference

### Root

Contains all the parts of a popover.

:docs-component-meta{name="a-popover-root"}

### Trigger

The button that toggles the popover. By default, the `APopoverContent` will position itself against the trigger.

:docs-component-meta{name="a-popover-trigger"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - open
      - closed
---
::

### Anchor

An optional element to position the `APopoverContent` against. If this part is not used, the content will position alongside the <code>APopoverTrigger</code>.

:docs-component-meta{name="a-popover-anchor"}

### Portal

When used, portals the content part into the `body`.

:docs-component-meta{name="a-popover-portal"}

### Content

The component that pops out when the popover is open.

:docs-presence-tip

:docs-component-meta{name="a-popover-content"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - open
      - closed
  - attribute: '[data-side]'
    values:
      - left
      - right
      - bottom
      - top
  - attribute: '[data-align]'
    values:
      - start
      - end
      - center
---
::

::docs-css-variables-table
---
data:
  - cssVariable: '--akar-popover-content-transform-origin'
    description: The `transform-origin` computed from the content and arrow positions/offsets
  - cssVariable: '--akar-popover-content-available-width'
    description: The remaining width between the trigger and the boundary edge
  - cssVariable: '--akar-popover-content-available-height'
    description: The remaining height between the trigger and the boundary edge
  - cssVariable: '--akar-popover-trigger-width'
    description: The width of the trigger
  - cssVariable: '--akar-popover-trigger-height'
    description: The height of the trigger
---
::

### Arrow

An optional arrow element to render alongside the popover. This can be used to help visually link the anchor with the `APopoverContent`. Must be rendered inside `APopoverContent`.

:docs-component-meta{name="a-popover-arrow"}

### Close

The button that closes an open popover.

:docs-component-meta{name="a-popover-close"}

## Examples

### Constrain the content size

You may want to constrain the width of the content so that it matches the trigger width. You may also want to constrain its height to not exceed the viewport.

We expose several CSS custom properties such as `--akar-popover-trigger-width` and `--akar-popover-content-available-height` to support this. Use them to constrain the content dimensions.

```vue{10,11}
<script setup>
import { APopoverArrow, APopoverClose, APopoverContent, APopoverPortal, APopoverRoot, APopoverTrigger } from 'akar';
</script>

<template>
  <APopoverRoot>
    <APopoverTrigger>…</APopoverTrigger>
    <APopoverPortal>
      <APopoverContent
        class="APopoverContent"
        :side-offset="5"
      >
        …
      </APopoverContent>
    </APopoverPortal>
  </APopoverRoot>
</template>
```

```css{3,4}
/* styles.css */
.APopoverContent {
  width: var(--akar-popover-trigger-width);
  max-height: var(--akar-popover-content-available-height);
}
```

### Origin-aware animations

We expose a CSS custom property `--akar-popover-content-transform-origin`. Use it to animate the content from its computed origin based on `side`, `sideOffset`, `align`, `alignOffset` and any collisions.

```vue{9}
<script setup>
import { APopoverArrow, APopoverClose, APopoverContent, APopoverPortal, APopoverRoot, APopoverTrigger } from 'akar';
</script>

<template>
  <APopoverRoot>
    <APopoverTrigger>…</APopoverTrigger>
    <APopoverPortal>
      <APopoverContent class="APopoverContent">
        …
      </APopoverContent>
    </APopoverPortal>
  </APopoverRoot>
</template>
```

```css{3}
/* styles.css */
.APopoverContent {
  transform-origin: var(--akar-popover-content-transform-origin);
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Collision-aware animations

We expose `data-side` and `data-align` attributes. Their values will change at runtime to reflect collisions. Use them to create collision and direction-aware animations.

```vue{9}
<script setup>
import { APopoverArrow, APopoverClose, APopoverContent, APopoverPortal, APopoverRoot, APopoverTrigger } from 'akar';
</script>

<template>
  <APopoverRoot>
    <APopoverTrigger>…</APopoverTrigger>
    <APopoverPortal>
      <APopoverContent class="APopoverContent">
        …
      </APopoverContent>
    </APopoverPortal>
  </APopoverRoot>
</template>
```

```css{6-11}
/* styles.css */
.APopoverContent {
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
.APopoverContent[data-side='top'] {
  animation-name: slideUp;
}
.APopoverContent[data-side='bottom'] {
  animation-name: slideDown;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### With custom anchor

You can anchor the content to another element if you do not want to use the trigger as the anchor.

```vue{7-11}
<script setup>
import { APopoverAnchor, APopoverArrow, APopoverClose, APopoverContent, APopoverPortal, APopoverRoot, APopoverTrigger } from 'akar';
</script>

<template>
  <APopoverRoot>
    <APopoverAnchor as-child>
      <div class="Row">
        Row as anchor <APopoverTrigger>Trigger</APopoverTrigger>
      </div>
    </APopoverAnchor>

    <APopoverPortal>
      <APopoverContent>…</APopoverContent>
    </APopoverPortal>
  </APopoverRoot>
</template>
```

```css
/* styles.css */
.Row {
  background-color: gainsboro;
  padding: 20px;
}
```

### Close using slot props

Alternatively, you can use the `close` method provided by the `APopoverRoot` slot props to programmatically close the popover.

```vue{4,8,16-20}
<script setup>
import { APopoverAnchor, APopoverArrow, APopoverContent, APopoverPortal, APopoverRoot, APopoverTrigger } from 'akar';
</script>

<template>
  <APopoverRoot v-slot="{ close }">
    <APopoverTrigger>Open</APopoverTrigger>
    <APopoverAnchor />
    <APopoverPortal>
      <APopoverContent>
        <button
          type="submit"
          @click="close"
        >
          Submit
        </button>
        <APopoverArrow />
      </APopoverContent>
    </APopoverPortal>
  </APopoverRoot>
</template>
```

## Accessibility

Adheres to the [Dialog WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-popover
data:
  - keys: ['Space'],
    description: 'Opens/closes the popover.',
  - keys: ['Enter'],
    description: 'Opens/closes the popover.',
  - keys: ['Tab'],
    description: 'Moves focus to the next focusable element',
  - keys: ['Shift + Tab'],
    description: 'Moves focus to the previous focusable element',
  - keys: ['Esc'],
    description: '<span> Closes the popover and moves focus to <code>APopoverTrigger</code>.</span>',
---
::

## Custom APIs

Create your own API by abstracting the primitive parts into your own component.

#### Abstract the arrow and set default configuration

This example abstracts the `APopoverArrow` part and sets a default `sideOffset` configuration.

#### Usage

```vue
<script setup lang="ts">
import { APopover, APopoverContent, APopoverTrigger } from './your-popover';
</script>

<template>
  <APopover>
    <APopoverTrigger>APopover trigger</APopoverTrigger>
    <APopoverContent>APopover content</APopoverContent>
  </APopover>
</template>
```

#### Implementation

```ts
export { APopoverRoot as APopover, APopoverTrigger } from 'akar';

// your-popover.ts
export { default as APopoverContent } from 'APopoverContent.vue';
```

```vue
<!-- APopoverContent.vue -->
<script setup lang="ts">
import type { APopoverContentEmits, APopoverContentProps } from 'akar';
import { APopoverContent, APopoverPortal, useForwardPropsEmits } from 'akar';

const props = defineProps<APopoverContentProps>();
const emits = defineEmits<APopoverContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <APopoverPortal>
    <APopoverContent v-bind="{ ...forwarded, ...$attrs }">
      <slot />
    </APopoverContent>
  </APopoverPortal>
</template>
```
