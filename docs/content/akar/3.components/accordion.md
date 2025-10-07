---
description: A vertically stacked set of interactive headings that each reveal an associated section of content.
category: data
links:
  - label: Pohon
    to: /pohon/components/accordion
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/accordion/index.ts
---

## Usage

Use the Accordion component to display a list of collapsible items.

::docs-akar-preview
---
name: 'a-accordion'
---
::

## Features

::docs-highlights
---
features:
  - Full keyboard navigation.
  - Supports horizontal/vertical orientation.
  - Supports Right to Left direction.
  - Can expand one or multiple items.
  - Can be controlled or uncontrolled.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { AAccordionContent, AAccordionHeader, AAccordionItem, AAccordionRoot, AAccordionTrigger } from 'akar'
</script>

<template>
  <AAccordionRoot>
    <AAccordionItem>
      <AAccordionHeader>
        <AAccordionTrigger />
      </AAccordionHeader>
      <AAccordionContent />
    </AAccordionItem>
  </AAccordionRoot>
</template>
```

## API Reference

### Root

Contains all the parts of an Accordion

:docs-component-meta{name="a-accordion-root"}

#### Data Attributes

::docs-data-attributes-table
---
data:
  - attribute: '[data-orientation]'
    values:
      - vertical
      - horizontal
---
::

### Item

Contains all the parts of a collapsible section.

:docs-component-meta{name="a-accordion-item"}

#### Data Attributes

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - open
      - closed
  - attribute: '[data-disabled]'
    values: Present when disabled
  - attribute: '[data-orientation]'
    values:
      - vertical
      - horizontal
---
::

### Header

Wraps an `AAccordionTrigger`. Use the `asChild` prop to update it to the appropriate heading level for your page.

:docs-component-meta{name="a-accordion-header"}

#### Data Attributes

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - open
      - closed
  - attribute: '[data-disabled]'
    values: Present when disabled
  - attribute: '[data-orientation]'
    values:
      - vertical
      - horizontal
---
::

### Trigger

Toggles the collapsed state of its associated item. It should be nested inside of an `AAccordionHeader`.

:docs-component-meta{name="a-accordion-trigger"}

#### Data Attributes

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - open
      - closed
  - attribute: '[data-disabled]'
    values: Present when disabled
  - attribute: '[data-orientation]'
    values:
      - vertical
      - horizontal
---
::

### Content

Contains the collapsible content for an item.

:docs-component-meta{name="a-accordion-content"}

#### Data Attributes

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - open
      - closed
  - attribute: '[data-disabled]'
    values: Present when disabled
  - attribute: '[data-orientation]'
    values:
      - vertical
      - horizontal
---
::

#### CSS Variables

::docs-css-variables-table
---
data:
  - cssVariable: --akar-accordion-content-width
    description: The width of the content when it opens/closes
  - cssVariable: --akar-accordion-content-height
    description: The height of the content when it opens/closes
---
::

## Examples

### Expanded by default

Use the `defaultValue` prop to define the open item by default.

```vue {4}
<template>
  <AAccordionRoot
    type="single"
    default-value="item-2"
  >
    <AAccordionItem value="item-1">
      …
    </AAccordionItem>
    <AAccordionItem value="item-2">
      …
    </AAccordionItem>
  </AAccordionRoot>
</template>
```

### Allow collapsing all items

Use the `collapsible` prop to allow all items to close.

```vue {4}
<template>
  <AAccordionRoot
    type="single"
    collapsible
  >
    <AAccordionItem value="item-1">
      …
    </AAccordionItem>
    <AAccordionItem value="item-2">
      …
    </AAccordionItem>
  </AAccordionRoot>
</template>
```

### Multiple items open at the same time

Set the `type` prop to `multiple` to enable opening multiple items at once.

```vue {2}
<template>
  <AAccordionRoot type="multiple">
    <AAccordionItem value="item-1">
      …
    </AAccordionItem>
    <AAccordionItem value="item-2">
      …
    </AAccordionItem>
  </AAccordionRoot>
</template>
```

### Rotated icon when open

You can add extra decorative elements, such as chevrons, and rotate it when the item is open.

```vue {16}
// index.vue
<script setup>
import { AAccordionContent, AAccordionHeader, AAccordionItem, AAccordionRoot, AAccordionTrigger } from 'akar'
</script>

<template>
  <AAccordionRoot type="single">
    <AAccordionItem value="item-1">
      <AAccordionHeader>
        <AAccordionTrigger class="group">
          <span>Trigger text</span>
          <i
            class="i-radix-icons:chevron-down transition-transform-280 group-data-[state=open]:rotate-180"
          />
        </AAccordionTrigger>
      </AAccordionHeader>
      <AAccordionContent>…</AAccordionContent>
    </AAccordionItem>
  </AAccordionRoot>
</template>
```

### Horizontal orientation

Use the `orientation` prop to create a horizontal Accordion

```vue {2}
<template>
  <AAccordionRoot orientation="horizontal">
    <AAccordionItem value="item-1">
      …
    </AAccordionItem>
    <AAccordionItem value="item-2">
      …
    </AAccordionItem>
  </AAccordionRoot>
</template>
```

### Animating content size

Use the `--akar-accordion-content-width` and/or `--akar-accordion-content-height` CSS variables to animate the size of the content when it opens/closes:

```vue {11}
// index.vue
<script setup>
import { AAccordionContent, AAccordionHeader, AAccordionItem, AAccordionRoot, AAccordionTrigger } from 'akar'
import './styles.css'
</script>

<template>
  <AAccordionRoot type="single">
    <AAccordionItem value="item-1">
      <AAccordionHeader>…</AAccordionHeader>
      <AAccordionContent class="AAccordionContent">
        …
      </AAccordionContent>
    </AAccordionItem>
  </AAccordionRoot>
</template>
```

```css {17,23}
/* styles.css */
.AAccordionContent {
  overflow: hidden;
}
.AAccordionContent[data-state="open"] {
  animation: accordion-down 300ms ease-out;
}
.AAccordionContent[data-state="closed"] {
  animation: accordion-up 300ms ease-out;
}

@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--akar-accordion-content-height);
  }
}

@keyframes accordion-up {
  from {
    height: var(--akar-accordion-content-height);
  }
  to {
    height: 0;
  }
}
```

#### UnoCSS Preset

::tip
If you have [Vinicunca Preset](https://unocss.vinicunca.dev/) installed, the animation classes are available as `animate-accordion-up` and `animate-accordion-down`. So no need to create new keyframes.
::

### Render content even when closed

By default hidden content will be removed, use `:unmountOnHide="false"` to keep the content always available.

This will also allow browser to search the hidden text, and open the accordion.

```vue line=2
<template>
  <AAccordionRoot :unmount-on-hide="false">
    <AAccordionItem value="item-1">
      …
    </AAccordionItem>
    <AAccordionItem value="item-2">
      …
    </AAccordionItem>
  </AAccordionRoot>
</template>
```

## Accessibility

Adheres to the [Accordion WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion).

### Keyboard Interactions

::docs-keyboard-table
---
name: a-accordion-akar
data:
  - keys: ['Space']
    description: When focus is on an <code>AAccordionTrigger</code> of a collapsed section, expands the section.
  - keys: ['Enter']
    description: When focus is on an <code>AAccordionTrigger</code> of a collapsed section, expands the section.
  - keys: ['Tab']
    description: Moves focus to the next focusable element.
  - keys: ['Shift + Tab']
    description: Moves focus to the previous focusable element.
  - keys: ['ArrowDown']
    description: Moves focus to the next <code>AAccordionTrigger</code> when <code>orientation</code> is <code>vertical</code>.
  - keys: ['ArrowUp']
    description: Moves focus to the previous <code>AAccordionTrigger</code> when <code>orientation</code> is <code>vertical</code>.
  - keys: ['ArrowRight']
    description: Moves focus to the next <code>AAccordionTrigger</code> when <code>orientation</code> is <code>horizontal</code>.
  - keys: ['ArrowLeft']
    description: Moves focus to the previous <code>AAccordionTrigger</code> when <code>orientation</code> is <code>horizontal</code>.
  - keys: ['Home']
    description: When focus is on an <code>AAccordionTrigger</code>, moves focus to the start <code>AAccordionTrigger</code>.
  - keys: ['End']
    description: When focus is on an <code>AAccordionTrigger</code>, moves focus to the last <code>AAccordionTrigger</code>.
---
::
