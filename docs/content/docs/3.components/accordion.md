---
description: A vertically stacked set of interactive headings that each reveal an associated section of content.
category: data
---

## Usage

Use the Accordion component to display a list of collapsible items.


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

<!-- #### Data Attributes

:docs-data-attributes-table{name="data-attributes-accordion-root" :data='[
  {
    "attribute": "[data-orientation]",
    "values": ["vertical", "horizontal"]
  }
]'}

### Item

Contains all the parts of a collapsible section.

:docs-component-meta{name="a-accordion-item"}

#### Data Attributes

:docs-data-attributes-table{name="data-attributes-accordion-item" :data='[
  {
    "attribute": "[data-state]",
    "values": ["open", "closed"]
  },
  {
    "attribute": "[data-disabled]",
    "values": "Present when disabled"
  },
  {
    "attribute": "[data-orientation]",
    "values": ["vertical", "horizontal"]
  }
]'}

### Header

Wraps an `AccordionTrigger`. Use the `asChild` prop to update it to the appropriate heading level for your page.

:docs-component-meta{name="a-accordion-header"}

#### Data Attributes

:docs-data-attributes-table{name="data-attributes-accordion-header" :data='[
  {
    "attribute": "[data-state]",
    "values": ["open", "closed"]
  },
  {
    "attribute": "[data-disabled]",
    "values": "Present when disabled"
  },
  {
    "attribute": "[data-orientation]",
    "values": ["vertical", "horizontal"]
  }
]'}

### Trigger

Toggles the collapsed state of its associated item. It should be nested inside of an `AccordionHeader`.

:docs-component-meta{name="a-accordion-trigger"}

#### Data Attributes

:docs-data-attributes-table{name="data-attributes-accordion-trigger" :data='[
  {
    "attribute": "[data-state]",
    "values": ["open", "closed"]
  },
  {
    "attribute": "[data-disabled]",
    "values": "Present when disabled"
  },
  {
    "attribute": "[data-orientation]",
    "values": ["vertical", "horizontal"]
  }
]'}

### Content

Contains the collapsible content for an item.

:docs-component-meta{name="a-accordion-content"}

#### Data Attributes

:docs-data-attributes-table{name="data-attributes-accordion-content" :data='[
  {
    "attribute": "[data-state]",
    "values": ["open", "closed"]
  },
  {
    "attribute": "[data-disabled]",
    "values": "Present when disabled"
  },
  {
    "attribute": "[data-orientation]",
    "values": ["vertical", "horizontal"]
  }
]'}

#### CSS Variables

:docs-css-variables-table{name="css-variables-accordion-content" :data='[
  {
    "cssVariable": "--akar-accordion-content-width",
    "description": "The width of the content when it opens/closes"
  },
  {
    "cssVariable": "--akar-accordion-content-height",
    "description": "The height of the content when it opens/closes"
  }
]'} -->
