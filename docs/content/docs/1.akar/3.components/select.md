---
description: A select element to choose from a list of options.
category: form
links:
  - label: Pohon
    to: /docs/pohon/components/select
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/select/index.ts
---

:docs-component-example{name="a-select"}

## Features

::docs-highlights
---
features:
  - Can be controlled or uncontrolled.
  - Offers 2 positioning modes.
  - Supports items, labels, groups of items.
  - Focus is fully managed.
  - Full keyboard navigation.
  - Supports custom placeholder.
  - Typeahead support.
  - Supports Right to Left direction.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup lang="ts">
import {
  ASelectContent,
  ASelectGroup,
  ASelectIcon,
  ASelectItem,
  ASelectItemIndicator,
  ASelectLabel,
  ASelectPortal,
  ASelectRoot,
  ASelectScrollDownButton,
  ASelectScrollUpButton,
  ASelectSeparator,
  ASelectTrigger,
  ASelectValue,
  ASelectViewport,
} from 'akar';
</script>

<template>
  <ASelectRoot>
    <ASelectTrigger>
      <ASelectValue />
      <ASelectIcon />
    </ASelectTrigger>

    <ASelectPortal>
      <ASelectContent>
        <ASelectScrollUpButton />
        <ASelectViewport>
          <ASelectItem>
            <ASelectItemText />
            <ASelectItemIndicator />
          </ASelectItem>
          <ASelectGroup>
            <ASelectLabel />
            <ASelectItem>
              <ASelectItemText />
              <ASelectItemIndicator />
            </ASelectItem>
          </ASelectGroup>
          <ASelectSeparator />
        </ASelectViewport>
        <ASelectScrollDownButton />
        <ASelectArrow />
      </ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/select"}

## API Reference

### Root

Contains all the parts of a ASelect

:docs-component-meta{name="a-select-root"}

### Trigger

The button that toggles the ASelect The `ASelectContent` will position itself by aligning over the trigger.

:docs-component-meta{name="a-select-trigger"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - open
      - closed
  - attribute: '[data-placeholder]'
    values: Present when has placeholder
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### Value

The part that reflects the selected value. By default the selected item's text will be rendered. if you require more control, you can instead control the select and pass your own `children`. It should not be styled to ensure correct positioning. An optional `placeholder` prop is also available for when the select has no value.

:docs-component-meta{name="a-select-value"}

### Icon

A small icon often displayed next to the value as a visual affordance for the fact it can be open. By default renders ▼ but you can use your own icon via `asChild` or use `children`.

:docs-component-meta{name="a-select-item"}

### Portal

When used, portals the content part into the `body`.

:docs-component-meta{name="a-select-portal"}

### Content

The component that pops out when the select is open.

:docs-presence-tip

:docs-component-meta{name="a-select-content"}

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
  - cssVariable: --akar-select-content-transform-origin
    description: The `transform-origin` computed from the content and arrow positions/offsets. Only present when `position="popper"`
  - cssVariable: --akar-select-content-available-width
    description: The remaining width between the trigger and the boundary edge. Only present when `position="popper"`
  - cssVariable: --akar-select-content-available-height
    description: The remaining height between the trigger and the boundary edge. Only present when `position="popper"`
  - cssVariable: --akar-select-trigger-width
    description: The width of the trigger. Only present when `position="popper"`
  - cssVariable: --akar-select-trigger-height
    description: The height of the trigger. Only present when `position="popper"`
---
::

### Viewport

The scrolling viewport that contains all of the items.

:docs-component-meta{name="a-select-viewport"}

### Item

The component that contains the select items.

:docs-component-meta{name="a-select-item"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - checked
      - unchecked
  - attribute: '[data-highlighted]'
    values: Present when highlighted
  - attribute: '[data-disabled]'
    values: Present when disabled
---
::

### ItemText

The textual part of the item. It should only contain the text you want to see in the trigger when that item is selected. It should not be styled to ensure correct positioning.

:docs-component-meta{name="a-select-item-text"}

### ItemIndicator

Renders when the item is selected. You can style this element directly, or you can use it as a wrapper to put an icon into, or both.

:docs-component-meta{name="a-select-item-indicator"}

### ScrollUpButton

An optional button used as an affordance to show the viewport overflow as well as functionally enable scrolling upwards.

:docs-component-meta{name="a-select-scroll-up-button"}

### ScrollDownButton

An optional button used as an affordance to show the viewport overflow as well as functionally enable scrolling downwards.

:docs-component-meta{name="a-select-scroll-down-button"}

### Group

Used to group multiple items. use in conjunction with `ASelectLabel` to ensure good accessibility via automatic labelling.

:docs-component-meta{name="a-select-group"}

### Label

Used to render the label of a group. It won't be focusable using arrow keys.

:docs-component-meta{name="a-select-label"}

### Separator

Used to visually separate items in the ASelect

:docs-component-meta{name="a-select-separator"}
### Arrow

An optional arrow element to render alongside the content. This can be used to help visually link the trigger with the `ASelectContent`. Must be rendered inside `ASelectContent`. Only available when `position` is set to `popper`.

:docs-component-meta{name="a-select-arrow"}

## Examples

### Change the positioning mode

By default, `ASelect` will behave similarly to a native MacOS menu by positioning `ASelectContent` relative to the active item. If you would prefer an alternative positioning approach similar to `Popover` or `DropdownMenu` then you can set `position` to `popper` and make use of additional alignment options such as `side`, `sideOffset` and more.

```vue{20-23}
// index.vue
<script setup lang="ts">
import {
  ASelectContent,
  ASelectPortal,
  ASelectRoot,
  ASelectTrigger,
} from 'akar';
</script>

<template>
  <ASelectRoot>
    <ASelectTrigger>…</ASelectTrigger>
    <ASelectPortal>
      <ASelectContent
        position="popper"
        :side-offset="5"
      >
        …
      </ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
```

### Constrain the content size

When using `position="popper"` on `ASelectContent`, you may want to constrain the width of the content so that it matches the trigger width. You may also want to constrain its height to not exceed the viewport.

We expose several CSS custom properties such as `--akar-select-trigger-width` and `--akar-select-content-available-height` to support this. Use them to constrain the content dimensions.

```vue{21}
// index.vue
<script setup lang="ts">
import {
  ASelectContent,
  ASelectGroup,
  ASelectItem,
  ASelectItemIndicator,
  ASelectLabel,
  ASelectPortal,
  ASelectRoot,
  ASelectSeparator,
  ASelectTrigger,
} from 'akar';
</script>

<template>
  <ASelectRoot>
    <ASelectTrigger>…</ASelectTrigger>
    <ASelectPortal>
      <ASelectContent
        class="ASelectContent"
        position="popper"
        :side-offset="5"
      >
        …
      </ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
```

```css{3,4}
/* styles.css */
.ASelectContent {
  width: var(--akar-select-trigger-width);
  max-height: var(--akar-select-content-available-height);
}
```

### With disabled items

You can add special styles to disabled items via the `data-disabled` attribute.

```vue{23-24}
// index.vue
<script setup lang="ts">
import {
  ASelectContent,
  ASelectGroup,
  ASelectItem,
  ASelectItemIndicator,
  ASelectLabel,
  ASelectPortal,
  ASelectRoot,
  ASelectSeparator,
  ASelectTrigger,
} from 'akar';
</script>

<template>
  <ASelectRoot>
    <ASelectTrigger>…</ASelectTrigger>
    <ASelectPortal>
      <ASelectContent>
        <ASelectViewport>
          <ASelectItem
            class="ASelectItem"
            disabled
          >
            …
          </ASelectItem>
          <ASelectItem>…</ASelectItem>
          <ASelectItem>…</ASelectItem>
        </ASelectViewport>
      </ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
```

```css{2}
/* styles.css */
.ASelectItem[data-disabled] {
  color: 'gainsboro';
}
```

### With a placeholder

You can use the `placeholder` prop on `Value` for when the select has no value. There's also a `data-placeholder` attribute on `Trigger` to help with styling.

```vue{19,20}
// index.vue
<script setup lang="ts">
import {
  ASelectContent,
  ASelectGroup,
  ASelectItem,
  ASelectItemIndicator,
  ASelectLabel,
  ASelectPortal,
  ASelectRoot,
  ASelectSeparator,
  ASelectTrigger,
} from 'akar';
import './styles.css';
</script>

<template>
  <ASelectRoot>
    <ASelectTrigger class="ASelectTrigger">
      <ASelectValue placeholder="Pick an option" />
      <ASelectIcon />
    </ASelectTrigger>
    <ASelectPortal>
      <ASelectContent>…</ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
```

```css{2}
/* styles.css */
.ASelectTrigger[data-placeholder] {
  color: 'gainsboro';
}
```

### With separators

Use the `Separator` part to add a separator between items.

```vue{10}
<template>
  <ASelectRoot>
    <ASelectTrigger>…</ASelectTrigger>
    <ASelectPortal>
      <ASelectContent>
        <ASelectViewport>
          <ASelectItem>…</ASelectItem>
          <ASelectItem>…</ASelectItem>
          <ASelectItem>…</ASelectItem>
          <ASelectSeparator />
          <ASelectItem>…</ASelectItem>
          <ASelectItem>…</ASelectItem>
        </ASelectViewport>
      </ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
```

### With grouped items

Use the `Group` and `Label` parts to group items in a section.

```vue{7,8,12}
<template>
  <ASelectRoot>
    <ASelectTrigger>…</ASelectTrigger>
    <ASelectPortal>
      <ASelectContent>
        <ASelectViewport>
          <ASelectGroup>
            <ASelectLabel>Label</ASelectLabel>
            <ASelectItem>…</ASelectItem>
            <ASelectItem>…</ASelectItem>
            <ASelectItem>…</ASelectItem>
          </ASelectGroup>
        </ASelectViewport>
      </ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
```

### With complex items

You can use custom content in your items.

```vue{23}
<script setup lang="ts">
import {
  ASelectContent,
  ASelectGroup,
  ASelectItem,
  ASelectItemIndicator,
  ASelectLabel,
  ASelectPortal,
  ASelectRoot,
  ASelectSeparator,
  ASelectTrigger,
} from 'akar';
</script>

<template>
  <ASelectRoot>
    <ASelectTrigger>…</ASelectTrigger>
    <ASelectPortal>
      <ASelectContent>
        <ASelectViewport>
          <ASelectItem>
            <ASelectItemText>
              <img src="…">
              Adolfo Hess
            </ASelectItemText>
            <ASelectItemIndicator>…</ASelectItemIndicator>
          </ASelectItem>
          <ASelectItem>…</ASelectItem> <ASelectItem>…</ASelectItem>
        </ASelectViewport>
      </ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
```

### Controlling the value displayed in the trigger

By default the trigger display the selected item's text (no longer automatically render `ItemText`'s content like in v1).

If you need to render other than plain text, you can control the component using `v-model` props (or accessing `ASelectValue`'s slotProps) and passing `slot` to `ASelectValue`. Remember to make sure what you put in there is accessible.

```vue{2,4,10-12}
<script setup>
const countries = { 'france': '🇫🇷', 'united-kingdom': '🇬🇧', 'spain': '🇪🇸' };

const value = ref('france');
</script>

<template>
  <ASelectRoot v-model="value">
    <ASelectTrigger>
      <ASelectValue :aria-label="value">
        {{ countries[value] }}
      </ASelectValue>
      <ASelectIcon />
    </ASelectTrigger>
    <ASelectPortal>
      <ASelectContent>
        <ASelectViewport>
          <ASelectItem value="france">
            <ASelectItemText>France</ASelectItemText>
            <ASelectItemIndicator>…</ASelectItemIndicator>
          </ASelectItem>
          <ASelectItem value="united-kingdom">
            <ASelectItemText>United Kingdom</ASelectItemText>
            <ASelectItemIndicator>…</ASelectItemIndicator>
          </ASelectItem>
          <ASelectItem value="spain">
            <ASelectItemText>Spain</ASelectItemText>
            <ASelectItemIndicator>…</ASelectItemIndicator>
          </ASelectItem>
        </ASelectViewport>
      </ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
```

### With custom scrollbar

The native scrollbar is hidden by default as we recommend using the `ScrollUpButton` and `ScrollDownButton` parts for the best UX. If you do not want to use these parts, compose your select with our [Scroll Area](/docs/akar/components/scroll-area) primitive.

```vue{25,27,32-34}
// index.vue
<script setup lang="ts">
import {
  ASelectContent,
  ASelectGroup,
  ASelectItem,
  ASelectItemIndicator,
  ASelectLabel,
  ASelectPortal,
  ASelectRoot,
  ASelectSeparator,
  ASelectTrigger,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from 'akar';
</script>

<template>
  <ASelectRoot>
    <ASelectTrigger>…</ASelectTrigger>
    <ASelectPortal>
      <ASelectContent>
        <ScrollAreaRoot
          class="ScrollAreaRoot"
          type="auto"
        >
          <ASelectViewport as-child>
            <ScrollAreaViewport class="ScrollAreaViewport">
              <StyledItem>…</StyledItem> <StyledItem>…</StyledItem>
              <StyledItem>…</StyledItem>
            </ScrollAreaViewport>
          </ASelectViewport>
          <ScrollAreaScrollbar
            class="ScrollAreaScrollbar"
            orientation="vertical"
          >
            <ScrollAreaThumb class="ScrollAreaThumb" />
          </ScrollAreaScrollbar>
        </ScrollAreaRoot>
      </ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
```

```css
/* styles.css */
.ScrollAreaRoot {
  width: 100%;
  height: 100%;
}

.ScrollAreaViewport {
  width: 100%;
  height: 100%;
}

.ScrollAreaScrollbar {
  width: 4px;
  padding: 5px 2px;
}

.ScrollAreaThumb {
  background: rgba(0, 0, 0, 0.3);
  borderradius: 3px;
}
```

## Accessibility

Adheres to the [ListBox WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox).

See the W3C [ASelect-Only Combobox](https://www.w3.org/TR/wai-aria-practices/examples/combobox/combobox-select-only.html) example for more information.

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-select
data:
  - keys: ['Space']
    description: 'When focus is on `ASelectTrigger`, opens the select and focuses the selected item. <br /> When focus is on an item, selects the focused item.'
  - keys: ['Enter']
    description: 'When focus is on `ASelectTrigger`, opens the select and focuses the first item. <br /> When focus is on an item, selects the focused item.'
  - keys: ['ArrowDown']
    description: 'When focus is on `ASelectTrigger`, opens the ASelect <br /> When focus is on an item, moves focus to the next item.'
  - keys: ['ArrowUp']
    description: 'When focus is on `ASelectTrigger`, opens the ASelect <br /> When focus is on an item, moves focus to the previous item.'
  - keys: ['Esc']
    description: 'Closes the select and moves focus to `ASelectTrigger`.'
---
::

### Labelling

Use our [Label](label) component in order to offer a visual and accessible label for the ASelect

```vue{19,22,26,28}
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  ASelectContent,
  ASelectGroup,
  ASelectItem,
  ASelectItemIndicator,
  ASelectLabel,
  ASelectPortal,
  ASelectRoot,
  ASelectSeparator,
  ASelectTrigger,
  Label,
} from 'akar';
import { ref } from 'vue';
</script>

<template>
  <Label>
    Country
    <ASelectRoot>…</ASelectRoot>
  </Label>

  <!-- or -->

  <Label for="country">Country</Label>
  <ASelectRoot>
    <ASelectTrigger id="country">
      …
    </ASelectTrigger>
    <ASelectPortal>
      <ASelectContent>…</ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
```

## Custom APIs

Create your own API by abstracting the primitive parts into your own component.

### Abstract down to `ASelect` and `ASelectItem`

This example abstracts most of the parts.

#### Usage

```vue
<script setup lang="ts">
import { ASelect, ASelectItem } from './your-select';
</script>

<template>
  <ASelect default-value="2">
    <ASelectItem value="1">
      Item 1
    </ASelectItem>
    <ASelectItem value="2">
      Item 2
    </ASelectItem>
    <ASelectItem value="3">
      Item 3
    </ASelectItem>
  </ASelect>
</template>
```

#### Implementation

```ts
// your-select.ts
export { default as ASelect } from 'ASelect.vue';
export { default as ASelectItem } from 'ASelectItem.vue';
```

```vue
<!-- ASelect.vue -->
<script setup lang="ts">
import type { ASelectRootEmits, ASelectRootProps } from 'akar';
import { ChevronDownIcon, ChevronUpIcon, } from '@radix-icons/vue';
import { ASelectContent, ASelectIcon, ASelectPortal, ASelectRoot, ASelectScrollDownButton, ASelectScrollUpButton, ASelectTrigger, ASelectValue, ASelectViewport, useForwardPropsEmits } from 'akar';

const props = defineProps<ASelectRootProps>();
const emits = defineEmits<ASelectRootEmits>();

const forward = useForwardPropsEmits(props, emits);
</script>

<template>
  <ASelectRoot v-bind="forward">
    <ASelectTrigger>
      <ASelectValue />
      <ASelectIcon>
        <ChevronDownIcon />
      </ASelectIcon>
    </ASelectTrigger>

    <ASelectPortal>
      <ASelectContent>
        <ASelectScrollUpButton>
          <ChevronUpIcon />
        </ASelectScrollUpButton>
        <ASelectViewport>
          <slot />
        </ASelectViewport>
        <ASelectScrollDownButton>
          <ChevronDownIcon />
        </ASelectScrollDownButton>
      </ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
```

```vue
<!-- ASelectItem.vue -->
<script setup lang="ts">
import type { ASelectItemProps } from 'akar';
import { CheckIcon } from '@radix-icons/vue';
import { ASelectItem, ASelectItemIndicator, ASelectItemText } from 'akar';

const props = defineProps<ASelectItemProps>();
</script>

<template>
  <ASelectItem v-bind="props">
    <ASelectItemText>
      <slot />
    </ASelectItemText>
    <ASelectItemIndicator>
      <CheckIcon />
    </ASelectItemIndicator>
  </ASelectItem>
</template>
```
