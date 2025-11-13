---
description: For sighted users to preview content available behind a link.
category: overlay
links:
  - label: Pohon
    to: /docs/pohon/components/popover#mode
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/hover-card/index.ts
---

:docs-component-example{name="a-hover-card"}

## Features

::docs-highlights
---
features:
  - Can be controlled or uncontrolled.
  - Customize side, alignment, offsets, collision handling.
  - Optionally render a pointing arrow.
  - Supports custom open and close delays.
  - Ignored by screen readers.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { AHoverCardArrow, AHoverCardContent, AHoverCardPortal, AHoverCardRoot, AHoverCardTrigger } from 'akar';
</script>

<template>
  <AHoverCardRoot>
    <AHoverCardTrigger />
    <AHoverCardPortal>
      <AHoverCardContent>
        <AHoverCardArrow />
      </AHoverCardContent>
    </AHoverCardPortal>
  </AHoverCardRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/popover#mode"}

## API Reference

### Root

Contains all the parts of a hover card.

:docs-component-meta{name="a-hover-card-root"}

### Trigger

The link that opens the hover card when hovered.

:docs-component-meta{name="a-hover-card-trigger"}

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

When used, portals the content part into the `body`.

:docs-component-meta{name="a-hover-card-portal"}

### Content

The component that pops out when the hover card is open.

:docs-presence-tip

:docs-component-meta{name="a-hover-card-content"}

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
  - cssVariable: '--akar-hover-card-content-transform-origin'
    description: The `transform-origin` computed from the content and arrow positions/offsets
  - cssVariable: '--akar-hover-card-content-available-width'
    description: The remaining width between the trigger and the boundary edge
  - cssVariable: '--akar-hover-card-content-available-height'
    description: The remaining height between the trigger and the boundary edge
  - cssVariable: '--akar-hover-card-trigger-width'
    description: The width of the trigger
  - cssVariable: '--akar-hover-card-trigger-height'
    description: The height of the trigger
---
::

### Arrow

An optional arrow element to render alongside the hover card. This can be used to help visually link the trigger with the `AHoverCardContent`. Must be rendered inside `AHoverCardContent`.

:docs-component-meta{name="a-hover-card-arrow"}

## Examples

### Show instantly

Use the `openDelay` prop to control the time it takes for the hover card to open.

```vue {12}
<script setup>
import {
  AHoverCardContent,
  AHoverCardRoot,
  AHoverCardTrigger,
} from 'akar';
</script>

<template>
  <AHoverCardRoot :open-delay="0">
    <AHoverCardTrigger>…</AHoverCardTrigger>
    <AHoverCardContent>…</AHoverCardContent>
  </AHoverCardRoot>
</template>
````

### Constrain the content size

You may want to constrain the width of the content so that it matches the trigger width. You may also want to constrain its height to not exceed the viewport.

We expose several CSS custom properties such as `--akar-hover-card-trigger-width` and `--akar-hover-card-content-available-height` to support this. Use them to constrain the content dimensions.

```vue {11}
// index.vue
<script setup>
import { AHoverCardContent, AHoverCardPortal, AHoverCardRoot, AHoverCardTrigger } from 'akar';
</script>

<template>
  <AHoverCardRoot>
    <AHoverCardTrigger>…</AHoverCardTrigger>
    <AHoverCardPortal>
      <AHoverCardContent
        class="AHoverCardContent"
        :side-offset="5"
      >
        …
      </AHoverCardContent>
    </AHoverCardPortal>
  </AHoverCardRoot>
</template>
```

```css{3-4}
/* styles.css */
.AHoverCardContent {
  width: var(--akar-hover-card-trigger-width);
  max-height: var(--akar-hover-card-content-available-height);
}
```

### Origin-aware animations

We expose a CSS custom property `--akar-hover-card-content-transform-origin`. Use it to animate the content from its computed origin based on `side`, `sideOffset`, `align`, `alignOffset` and any collisions.

```vue {8}
<script setup>
import { AHoverCardContent, AHoverCardRoot, AHoverCardTrigger } from 'akar';
</script>

<template>
  <AHoverCardRoot>
    <AHoverCardTrigger>…</AHoverCardTrigger>
    <AHoverCardContent class="AHoverCardContent">
      …
    </AHoverCardContent>
  </AHoverCardRoot>
</template>
```

```css{3}
/* styles.css */
.AHoverCardContent {
  transform-origin: var(--akar-hover-card-content-transform-origin);
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

```vue {8}
<script setup>
import { AHoverCardContent, AHoverCardRoot, AHoverCardTrigger } from 'akar';
</script>

<template>
  <AHoverCardRoot>
    <AHoverCardTrigger>…</AHoverCardTrigger>
    <AHoverCardContent class="AHoverCardContent">
      …
    </AHoverCardContent>
  </AHoverCardRoot>
</template>
```

```css{6-11}
/* styles.css */
.AHoverCardContent {
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
.AHoverCardContent[data-side="top"] {
  animation-name: slideUp;
}
.AHoverCardContent[data-side="bottom"] {
  animation-name: slideDown;
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
```

## Accessibility

The hover card is intended for sighted users only, the content will be inaccessible to keyboard users.

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-popover
data:
  - keys: ['Tab']
    description: 'Opens/closes the hover card.'
  - keys: ['Enter']
    description: 'Opens the hover card link'
---
::
