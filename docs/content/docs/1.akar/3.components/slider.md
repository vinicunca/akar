---
description: An input to select a numeric value within a range.
category: form
links:
  - label: Pohon
    to: /docs/pohon/components/slider
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/slider/index.ts
---

:docs-component-example{name="a-slider"}

## Features

::docs-highlights
---
features:
  - Can be controlled or uncontrolled.
  - Supports multiple thumbs.
  - Supports a minimum value between thumbs.
  - Supports touch or click on track to update value.
  - Supports Right to Left direction.
  - Full keyboard navigation.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { ASliderRange, ASliderRoot, ASliderThumb, ASliderTrack } from 'akar';
</script>

<template>
  <ASliderRoot>
    <ASliderTrack>
      <ASliderRange />
    </ASliderTrack>
    <ASliderThumb />
  </ASliderRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/slider"}

## API Reference

### Root

Contains all the parts of a slider. It will render an `input` for each thumb when used within a `form` to ensure events propagate correctly.

:docs-component-meta{name="a-slider-root"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
---
::

### Track

The track that contains the `ASliderRange`.

:docs-component-meta{name="a-slider-track"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
---
::

### Range

The range part. Must live inside `ASliderTrack`.

:docs-component-meta{name="a-slider-range"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
---
::

### Thumb

A draggable thumb. You can render multiple thumbs.

:docs-component-meta{name="a-slider-thumb"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
---
::

## Examples

### Vertical orientation

Use the `orientation` prop to create a vertical slider.

```vue{10}
// index.vue
<script setup>
import { ASliderRange, ASliderRoot, ASliderThumb, ASliderTrack } from 'akar';
</script>

<template>
  <ASliderRoot
    class="ASliderRoot"
    :default-value="[50]"
    orientation="vertical"
  >
    <ASliderTrack class="ASliderTrack">
      <ASliderRange class="ASliderRange" />
    </ASliderTrack>
    <ASliderThumb class="ASliderThumb" />
  </ASliderRoot>
</template>
```

```css{7,18,26}
/* styles.css */
.ASliderRoot {
  position: relative;
  display: flex;
  align-items: center;
}
.ASliderRoot[data-orientation='vertical'] {
  flex-direction: column;
  width: 20px;
  height: 100px;
}

.ASliderTrack {
  position: relative;
  flex-grow: 1;
  background-color: grey;
}
.ASliderTrack[data-orientation='vertical'] {
  width: 3px;
}

.ASliderRange {
  position: absolute;
  background-color: black;
}
.ASliderRange[data-orientation='vertical'] {
  width: 100%;
}

.ASliderThumb {
  display: block;
  width: 20px;
  height: 20px;
  background-color: black;
}
```

### Create a range

Add multiple thumbs and values to create a range slider.

```vue{7,11-12}
// index.vue
<script setup>
import { ASliderRange, ASliderRoot, ASliderThumb, ASliderTrack } from 'akar';
</script>

<template>
  <ASliderRoot :default-value="[25, 75]">
    <ASliderTrack>
      <ASliderRange />
    </ASliderTrack>
    <ASliderThumb />
    <ASliderThumb />
  </ASliderRoot>
</template>
```

### Define step size

Use the `step` prop to increase the stepping interval.

```vue{9}
// index.vue
<script setup>
import { ASliderRange, ASliderRoot, ASliderThumb, ASliderTrack } from 'akar';
</script>

<template>
  <ASliderRoot
    :default-value="[50]"
    :step="10"
  >
    <ASliderTrack>
      <ASliderRange />
    </ASliderTrack>
    <ASliderThumb />
  </ASliderRoot>
</template>
```

### Prevent thumb overlap

Use `minStepsBetweenThumbs` to avoid thumbs with equal values.

```vue{10}
// index.vue
<script setup>
import { ASliderRange, ASliderRoot, ASliderThumb, ASliderTrack } from 'akar';
</script>

<template>
  <ASliderRoot
    :default-value="[25, 75]"
    :step="10"
    :min-steps-between-thumbs="1"
  >
    <ASliderTrack>
      <ASliderRange />
    </ASliderTrack>
    <ASliderThumb />
    <ASliderThumb />
  </ASliderRoot>
</template>
```

## Accessibility

Adheres to the [ASlider WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb).

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-slider
data:
  - keys: ['ArrowRight']
    description: 'Increases the value by the `step` amount.'
  - keys: ['ArrowLeft']
    description: 'Decreases the value by the `step` amount.'
  - keys: ['ArrowUp']
    description: 'Increases the value by the `step` amount.'
  - keys: ['ArrowDown']
    description: 'Decreases the value by the `step` amount.'
  - keys: ['PageUp']
    description: 'Increases the value by a larger `step`.'
  - keys: ['PageDown']
    description: 'Decreases the value by a larger `step`.'
  - keys: ['Shift + ArrowUp']
    description: 'Increases the value by a larger `step`.'
  - keys: ['Shift + ArrowDown']
    description: 'Decreases the value by a larger `step`.'
  - keys: ['Home']
    description: 'Sets the value to its minimum.'
  - keys: ['End']
    description: 'Sets the value to its maximum.'
---
::

#### Inverted sliders

When the slider is `inverted`, some controls are inverted as well, depending on the `orientation`.

- When the slider is `horizontal` (the default), <kbd value="ArrowRight"></kbd>, <kbd value="ArrowLeft"></kbd>, <kbd value="Home"></kbd>, and <kbd value="End"></kbd> are inverted.
- When the slider is `vertical`, <kbd value="ArrowUp"></kbd>, <kbd value="ArrowDown"></kbd>, <kbd value="PageUp"></kbd>, <kbd value="PageDown"></kbd>, <kbd value="Shift + ArrowUp"></kbd>, and <kbd value="Shift + ArrowDown"></kbd> are inverted.

## Custom APIs

Create your own API by abstracting the primitive parts into your own component.

### Abstract all parts

This example abstracts all of the `ASlider` parts so it can be used as a self closing element.

#### Usage

```vue
<script setup lang="ts">
import { ASlider } from './your-slider';
</script>

<template>
  <ASlider :default-value="[25]" />
</template>
```

#### Implementation

 ```ts
// your-slider.ts
export { default as ASlider } from 'ASlider.vue';
```

```vue
 <!-- ASlider.vue -->
<script setup lang="ts">
import type { ASliderRootEmits, ASliderRootProps } from 'akar';
import { ASliderRange, ASliderRoot, ASliderThumb, ASliderTrack, useForwardPropsEmits } from 'akar';

const props = defineProps<ASliderRootProps>();
const emits = defineEmits<ASliderRootEmits>();

const forward = useForwardPropsEmits(props, emits);
</script>

<template>
  <ASliderRoot
    v-slot="{ modelValue }"
    v-bind="forward"
  >
    <ASliderTrack>
      <ASliderRange />
    </ASliderTrack>

    <ASliderThumb
      v-for="(_, i) in modelValue"
      :key="i"
    />
  </ASliderRoot>
</template>
```

## Caveats

### Mouse events are not fired

Because of [a limitation](https://github.com/vinicunca/akar/blob/main/packages/core/src/slider/slider-impl.vue#L48-L49) we faced during implementation, the following example won't work as expected and the `@mousedown` and `@mousedown` event handlers won't be fired:

```vue
<ASliderRoot
  @mousedown="() => { console.log('onMouseDown')  }"
  @mouseup="() => { console.log('onMouseUp')  }"
>
  …
</ASliderRoot>
```

We recommend using pointer events instead (eg. `@pointerdown`, `@pointerup`). Regardless of the above limitation, these events are better suited for cross-platform/device handling as they are fired for all pointer input types (mouse, touch, pen, etc.).
