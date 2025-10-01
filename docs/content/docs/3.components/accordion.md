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
