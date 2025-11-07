---
description: An interactive component which expands/collapses a panel.
category: element
links:
  - label: Pohon
    to: /docs/pohon/components/collapsible
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/collapsible/index.ts
---

:docs-component-example{name="a-collapsible"}

## Features

::docs-highlights
---
features:
  - Full keyboard navigation.
  - Can be controlled or uncontrolled.
---
::

## Anatomy

Import the components and piece the parts together.

```vue
<script setup>
import { ACollapsibleContent, ACollapsibleRoot, ACollapsibleTrigger } from 'akar'
</script>

<template>
  <ACollapsibleRoot>
    <ACollapsibleTrigger />
    <ACollapsibleContent />
  </ACollapsibleRoot>
</template>
```

## API Reference

### Root

Contains all the parts of a collapsible

:docs-component-meta{name="a-collapsible-root"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - open
      - closed
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### Trigger

The button that toggles the collapsible

:docs-component-meta{name="a-collapsible-trigger"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - open
      - closed
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### Content

The component that contains the collapsible content.

:docs-presence-tip

:docs-component-meta{name="a-collapsible-content"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - open
      - closed
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

::docs-css-variables-table
---
data:
  - cssVariable: --akar-collapsible-content-width
    description: The width of the content when it opens/closes
  - cssVariable: --akar-collapsible-content-height
    description: The height of the content when it opens/closes
---
::

## Examples

### Animating content size

Use the `--akar-collapsible-content-width` and/or `--akar-collapsible-content-height` CSS variables to animate the size of the content when it opens/closes. Here's a demo:

```vue {10}
// index.vue
<script setup>
import { ACollapsibleContent, ACollapsibleRoot, ACollapsibleTrigger } from 'akar'
import './styles.css'
</script>

<template>
  <ACollapsibleRoot>
    <ACollapsibleTrigger>…</ACollapsibleTrigger>
    <ACollapsibleContent class="ACollapsibleContent">
      …
    </ACollapsibleContent>
  </ACollapsibleRoot>
</template>
```

```css {17,23}
/* styles.css */
.ACollapsibleContent {
  overflow: hidden;
}
.ACollapsibleContent[data-state="open"] {
  animation: collapsible-down 300ms ease-out;
}
.ACollapsibleContent[data-state="closed"] {
  animation: collapsible-up 300ms ease-out;
}

@keyframes collapsible-down {
  from {
    height: 0;
  }
  to {
    height: var(--akar-collapsible-content-height);
  }
}

@keyframes collapsible-up {
  from {
    height: var(--akar-collapsible-content-height);
  }
  to {
    height: 0;
  }
}
```

#### UnoCSS Preset

::tip
By installing the [Vinicunca Preset](https://vinicunca.dev/unocss-preset/pohon-ui), you gain immediate access to pre-defined animation keyframes. This means the utility classes `animate-collapsible-up` and `animate-collapsible-down` are available right out of the box, saving you the step of manually creating them.
::

### Render content even when collapsed

By default hidden content will be removed, use `:unmountOnHide="false"` to keep the content always available.

This will also allow browser to search the hidden text, and open the collapsible.

```vue {6}
<script setup>
import { ACollapsibleContent, ACollapsibleRoot, ACollapsibleTrigger } from 'akar'
</script>

<template>
  <ACollapsibleRoot :unmount-on-hide="false">
    …
  </ACollapsibleRoot>
</template>
```

## Accessibility

Adheres to the [Disclosure WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure).

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-collapsible
data:
  - keys: ['Space']
    description: 'Opens/closes the collapsible'
  - keys: ['Enter']
    description: 'Opens/closes the collapsible'
---
::
