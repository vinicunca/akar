---
description: An input element that displays interactive tags.
category: form
links:
  - label: Pohon
    to: /docs/pohon/components/input-tags
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/tags-input/index.ts
---

:docs-component-example{name="a-tags-input"}

## Features

::docs-highlights
---
features:
  - Can be controlled or uncontrolled.
  - Full keyboard navigation.
  - Limit the number of tags.
  - Accept value from clipboard.
  - Clear button to reset all tags values.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { ATagsInputClear, ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot } from 'akar';
</script>

<template>
  <ATagsInputRoot>
    <ATagsInputItem>
      <ATagsInputItemText />
      <ATagsInputItemDelete />
    </ATagsInputItem>

    <ATagsInputInput />
    <ATagsInputClear />
  </ATagsInputRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/input-tags"}

## API Reference

### Root

Contains all the tags input component parts.

:docs-component-meta{name="a-tags-input-root"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-focused]'
    values: 'Present when focus on input'
  - attribute: '[data-invalid]'
    values: 'Present when input value is invalid'
---
::

### Item

The component that contains the tag.

:docs-component-meta{name="a-tags-input-item"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - 'active'
      - 'inactive'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### ItemText

The textual part of the tag. Important for accessibility.

:docs-component-meta{name="a-tags-input-item-text"}

### ItemDelete

The button that delete the associate tag.

:docs-component-meta{name="a-tags-input-item-delete"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - 'active'
      - 'inactive'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### Input

The input element for the tags input.

:docs-component-meta{name="a-tags-input-input"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-invalid]'
    values: 'Present when input value is invalid'
---
::

### Clear

The button that remove all tags.

:docs-component-meta{name="a-tags-input-clear"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

## Examples

### Paste behavior

You can automatically add tags on paste by passing the `add-on-paste` prop.

```vue{8}
<script setup lang="ts">
import { ATagsInputRoot } from 'akar';
</script>

<template>
  <ATagsInputRoot
    v-model="modelValue"
    add-on-paste
  >
    …
  </ATagsInputRoot>
</template>
```

### Multiple delimiters

You can pass `RegExp` as `delimiter` to allow multiple characters to trigger addition of a new tag. When `add-on-paste` is passed it will be also used to split tags for `@paste` event.

```vue{4-5,11}
<script setup lang="ts">
import { ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot } from 'akar';

// split by space, comma, semicolon, tab, or newline
const delimiter = /[ ,;\t\n\r]+/;
</script>

<template>
  <ATagsInputRoot
    v-model="modelValue"
    :delimiter="delimiter"
    add-on-paste
  >
    …
  </ATagsInputRoot>
</template>
```

## Accessibility

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-switch
data:
  - keys: ['Delete']
    description: When tag is active, remove it and set the tag on right active.
  - keys: ['Backspace']
    description: When tag is active, remove it and set the tag on left active. If there are no tags to the left, either the next tags gets focus, or the input.
  - keys: ['ArrowRight']
    description: Set the next tag active.
  - keys: ['ArrowLeft']
    description: Set the previous tag active.
  - keys: ['Home']
    description: Set the first tag active.
  - keys: ['End']
    description: Set the last tag active.
---
::
