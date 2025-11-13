---
description: A popup that reveals information when hovering over an element.
category: overlay
links:
  - label: Pohon
    to: /docs/pohon/components/tooltip
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/tooltip/index.ts
---

:docs-component-example{name="a-tooltip"}

## Features

::docs-Highlights
---
features:
  - Provider to control display delay globally.
  - Opens when the trigger is focused or hovered.
  - Closes when the trigger is activated or when pressing escape.
  - Supports custom timings.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup lang="ts">
import { ATooltipArrow, ATooltipContent, ATooltipPortal, ATooltipProvider, ATooltipRoot, ATooltipTrigger } from 'akar';
</script>

<template>
  <ATooltipProvider>
    <ATooltipRoot>
      <ATooltipTrigger />
      <ATooltipPortal>
        <ATooltipContent>
          <ATooltipArrow />
        </ATooltipContent>
      </ATooltipPortal>
    </ATooltipRoot>
  </ATooltipProvider>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/tooltip"}

## API Reference

### Provider

Wraps your app to provide global functionality to your tooltips.

:docs-component-meta{name="a-tooltip-provider"}

### Root

Contains all the parts of a tooltip.

:docs-component-meta{name="a-tooltip-root"}

### Trigger

The button that toggles the tooltip. By default, the `ATooltipContent` will position itself against the trigger.

:docs-component-meta{name="a-tooltip-trigger"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - closed
      - delayed-open
      - instant-open
---
::

### Portal

When used, portals the content part into the `body`.

:docs-component-meta{name="a-tooltip-portal"}

### Content

The component that pops out when the tooltip is open.

:docs-presence-tip

:docs-component-meta{name="a-tooltip-content"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - closed
      - delayed-open
      - instant-open
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
  - cssVariable: --akar-tooltip-content-transform-origin
    description: The `transform-origin` computed from the content and arrow positions/offsets
  - cssVariable: --akar-tooltip-content-available-width
    description: The remaining width between the trigger and the boundary edge
  - cssVariable: --akar-tooltip-content-available-height
    description: The remaining height between the trigger and the boundary edge
  - cssVariable: --akar-tooltip-trigger-width
    description: The width of the trigger
  - cssVariable: --akar-tooltip-trigger-height
    description: The height of the trigger
---
::

### Arrow

An optional arrow element to render alongside the tooltip. This can be used to help visually link the trigger with the `ATooltipContent`. Must be rendered inside `ATooltipContent`.

:docs-component-meta{name="a-tooltip-arrow"}

## Examples

### Configure globally

Use the `Provider` to control `delayDuration` and `skipDelayDuration` globally.

```vue {7-8}
<script setup>
import { ATooltipContent, ATooltipProvider, ATooltipRoot, ATooltipTrigger } from 'akar';
</script>

<template>
  <ATooltipProvider
    :delay-duration="800"
    :skip-delay-duration="500"
  >
    <ATooltipRoot>
      <ATooltipTrigger>…</ATooltipTrigger>
      <ATooltipContent>…</ATooltipContent>
    </ATooltipRoot>
    <ATooltipRoot>
      <ATooltipTrigger>…</ATooltipTrigger>
      <ATooltipContent>…</ATooltipContent>
    </ATooltipRoot>
  </ATooltipProvider>
</template>
```

### Show instantly

Use the `delayDuration` prop to control the time it takes for the tooltip to open.

```vue {6}
<script setup>
import { ATooltipContent, ATooltipRoot, ATooltipTrigger } from 'akar';
</script>

<template>
  <ATooltipRoot :delay-duration="0">
    <ATooltipTrigger>…</ATooltipTrigger>
    <ATooltipContent>…</ATooltipContent>
  </ATooltipRoot>
</template>
```

### Displaying a tooltip from a disabled button

Since disabled buttons don't fire events, you need to:

- Render the `Trigger` as `span`.
- Ensure the `button` has no `pointerEvents`.

```vue {7-11}
<script setup>
import { ATooltipContent, ATooltipRoot, ATooltipTrigger } from 'akar';
</script>

<template>
  <ATooltipRoot>
    <ATooltipTrigger as-child>
      <span tabindex="0">
        <button
          disabled
          style="{ pointerEvents: 'none' }"
        >…</button>
      </span>
    </ATooltipTrigger>
    <ATooltipContent>…</ATooltipContent>
  </ATooltipRoot>
</template>
```

### Constrain the content size

You may want to constrain the width of the content so that it matches the trigger width. You may also want to constrain its height to not exceed the viewport.

We expose several CSS custom properties such as `--akar-tooltip-trigger-width` and `--akar-tooltip-content-available-height` to support this. Use them to constrain the content dimensions.

```vue {10}
<script setup>
import { ATooltipContent, ATooltipRoot, ATooltipTrigger } from 'akar';
</script>

<template>
  <ATooltipRoot>
    <ATooltipTrigger>…</ATooltipTrigger>
    <ATooltipPortal>
      <ATooltipContent
        class="ATooltipContent"
        :side-offset="5"
      >
        …
      </ATooltipContent>
    </ATooltipPortal>
  </ATooltipRoot>
</template>
```

```css {3,4}
/* styles.css */
.ATooltipContent {
  width: var(--akar-tooltip-trigger-width);
  max-height: var(--akar-tooltip-content-available-height);
}
```

### Origin-aware animations

We expose a CSS custom property `--akar-tooltip-content-transform-origin`. Use it to animate the content from its computed origin based on `side`, `sideOffset`, `align`, `alignOffset` and any collisions.

```vue {8}
<script setup>
import { ATooltipContent, ATooltipRoot, ATooltipTrigger } from 'akar';
</script>

<template>
  <ATooltipRoot>
    <ATooltipTrigger>…</ATooltipTrigger>
    <ATooltipContent class="ATooltipContent">
      …
    </ATooltipContent>
  </ATooltipRoot>
</template>
```

```css {3-4}
/* styles.css */
.ATooltipContent {
  transform-origin: var(--akar-tooltip-content-transform-origin);
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
import { ATooltipContent, ATooltipRoot, ATooltipTrigger } from 'akar';
</script>

<template>
  <ATooltipRoot>
    <ATooltipTrigger>…</ATooltipTrigger>
    <ATooltipContent class="ATooltipContent">
      …
    </ATooltipContent>
  </ATooltipRoot>
</template>
```

```css {6,9}
/* styles.css */
.ATooltipContent {
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
.ATooltipContent[data-side='top'] {
  animation-name: slideUp;
}
.ATooltipContent[data-side='bottom'] {
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

## Accessibility

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-tooltip
data:
  - keys: ['Tab']
    description: Opens/closes the tooltip without delay.
  - keys: ['Space']
    description: If open, closes the tooltip without delay.
  - keys: ['Enter']
    description: If open, closes the tooltip without delay.
  - keys: ['Escape']
    description: If open, closes the tooltip without delay.
---
::

## Custom APIs

Create your own API by abstracting the primitive parts into your own component.

### Abstract parts and introduce a content prop

This example abstracts all of the `ATooltip` parts and introduces a new `content` prop.

#### Usage

```vue
<script setup lang="ts">
import { ATooltip } from './your-tooltip';
</script>

<template>
  <ATooltip content="ATooltip content">
    <button>ATooltip trigger</button>
  </ATooltip>
</template>
```

#### Implementation

Use the [`asChild` prop](/docs/akar/guides/composition) to convert the trigger part into a slottable area. It will replace the trigger with the child that gets passed to it.

```vue {13-15}
<!-- your-tooltip.vue  -->
<script setup lang="ts">
import type { ATooltipRootEmits, ATooltipRootProps } from 'akar';
import { ATooltipArrow, ATooltipContent, ATooltipRoot, ATooltipTrigger, useForwardPropsEmits } from 'akar';

const props = defineProps<ATooltipRootProps & { content?: string }>();
const emits = defineEmits<ATooltipRootEmits>();

const forward = useForwardPropsEmits(props, emits);
</script>

<template>
  <ATooltipRoot v-bind="forward">
    <ATooltipTrigger as-child>
      <slot />
    </ATooltipTrigger>
    <ATooltipContent
      side="top"
      align="center"
    >
      {{ content }}
      <ATooltipArrow
        :width="11"
        :height="5"
      />
    </ATooltipContent>
  </ATooltipRoot>
</template>
```
