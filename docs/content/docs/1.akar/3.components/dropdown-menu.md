---
description: A menu to display actions when clicking on an element.
category: overlay
links:
  - label: Pohon
    to: /docs/pohon/components/dropdown-menu
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/dropdown-menu/index.ts
---

:docs-component-example{name="a-dropdown-menu"}

## Features

::docs-highlights
---
features:
  - Can be controlled or uncontrolled.
  - Supports submenus with configurable reading direction.
  - Supports items, labels, groups of items.
  - Supports checkable items (single or multiple) with optional indeterminate state.
  - Supports modal and non-modal modes.
  - Customize side, alignment, offsets, collision handling.
  - Optionally render a pointing arrow.
  - Focus is fully managed.
  - Full keyboard navigation.
  - Typeahead support.
  - Dismissing and layering behavior is highly customizable.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup lang="ts">
import {
  ADropdownMenuArrow,
  ADropdownMenuCheckboxItem,
  ADropdownMenuContent,
  ADropdownMenuGroup,
  ADropdownMenuItem,
  ADropdownMenuItemIndicator,
  ADropdownMenuLabel,
  ADropdownMenuPortal,
  ADropdownMenuRadioGroup,
  ADropdownMenuRadioItem,
  ADropdownMenuRoot,
  ADropdownMenuSeparator,
  ADropdownMenuSub,
  ADropdownMenuSubContent,
  ADropdownMenuSubTrigger,
  ADropdownMenuTrigger,
} from 'akar';
</script>

<template>
  <ADropdownMenuRoot>
    <ADropdownMenuTrigger />

    <ADropdownMenuPortal>
      <ADropdownMenuContent>
        <ADropdownMenuLabel />
        <ADropdownMenuItem />

        <ADropdownMenuGroup>
          <ADropdownMenuItem />
        </ADropdownMenuGroup>

        <ADropdownMenuCheckboxItem>
          <ADropdownMenuItemIndicator />
        </ADropdownMenuCheckboxItem>

        <ADropdownMenuRadioGroup>
          <ADropdownMenuRadioItem>
            <ADropdownMenuItemIndicator />
          </ADropdownMenuRadioItem>
        </ADropdownMenuRadioGroup>

        <ADropdownMenuSub>
          <ADropdownMenuSubTrigger />
          <ADropdownMenuPortal>
            <ADropdownMenuSubContent />
          </ADropdownMenuPortal>
        </ADropdownMenuSub>

        <ADropdownMenuSeparator />
        <ADropdownMenuArrow />
      </ADropdownMenuContent>
    </ADropdownMenuPortal>
  </ADropdownMenuRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/dropdown-menu"}

## API Reference

### Root

Contains all the parts of a dropdown menu.

:docs-component-meta{name="a-dropdown-menu-root"}

### Trigger

The button that toggles the dropdown menu. By default, the `ADropdownMenuContent` will position itself against the trigger.

:docs-component-meta{name="a-dropdown-menu-trigger"}

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

### Portal

When used, portals the content part into the `body`.

:docs-component-meta{name="a-dropdown-menu-portal"}

### Content

The component that pops out when the dropdown menu is open.

:docs-component-meta{name="a-dropdown-menu-content"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - 'open'
      - 'closed'
  - attribute: '[data-side]'
    values:
      - 'left'
      - 'right'
      - 'bottom'
      - 'top'
  - attribute: '[data-align]'
    values:
      - 'start'
      - 'end'
      - 'center'
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
---
::

::docs-css-variables-table
---
data:
  - cssVariable: '--akar-dropdown-menu-content-transform-origin'
    description: The `transform-origin` computed from the content and arrow positions/offsets'
  - cssVariable: '--akar-dropdown-menu-content-available-width'
    description: The remaining width between the trigger and the boundary edge
  - cssVariable: '--akar-dropdown-menu-content-available-height'
    description: The remaining height between the trigger and the boundary edge
  - cssVariable: '--akar-dropdown-menu-trigger-width'
    description: The width of the trigger
  - cssVariable: '--akar-dropdown-menu-trigger-height'
    description: The height of the trigger
---
::

### Arrow

An optional arrow element to render alongside the dropdown menu. This can be used to help visually link the trigger with the `ADropdownMenuContent`. Must be rendered inside `ADropdownMenuContent`.

:docs-component-meta{name="a-dropdown-menu-arrow"}

### Item

The component that contains the dropdown menu items.

:docs-component-meta{name="a-dropdown-menu-item"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
  - attribute: '[data-highlighted]'
    values: 'Present when highlighted'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### Group

Used to group multiple `ADropdownMenuItem`s.

:docs-component-meta{name="a-dropdown-menu-group"}

### Label

Used to render a label. It won't be focusable using arrow keys.

:docs-component-meta{name="a-dropdown-menu-label"}

### CheckboxItem

An item that can be controlled and rendered like a checkbox.

:docs-component-meta{name="a-dropdown-menu-checkbox-item"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - checked
      - unchecked
      - indeterminate
  - attribute: '[data-highlighted]'
    values: 'Present when highlighted'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### RadioGroup

Used to group multiple `ADropdownMenuRadioItem`s.

:docs-component-meta{name="a-dropdown-menu-radio-group"}

### RadioItem

An item that can be controlled and rendered like a radio.

:docs-component-meta{name="a-dropdown-menu-radio-item"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - 'checked'
      - 'unchecked'
      - 'indeterminate'
  - attribute: '[data-highlighted]'
    values: 'Present when highlighted'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### ItemIndicator

Renders when the parent `ADropdownMenuCheckboxItem` or `ADropdownMenuRadioItem` is checked. You can style this element directly, or you can use it as a wrapper to put an icon into, or both.

:docs-component-meta{name="a-dropdown-menu-item-indicator"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - 'checked'
      - 'unchecked'
      - 'indeterminate'
---
::

### Separator

Used to visually separate items in the dropdown menu.

:docs-component-meta{name="a-dropdown-menu-separator"}

### Sub

Contains all the parts of a submenu.

:docs-component-meta{name="a-dropdown-menu-sub"}

### SubTrigger

An item that opens a submenu. Must be rendered inside `ADropdownMenuSub`.

:docs-component-meta{name="a-dropdown-menu-sub-trigger"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - 'open'
      - 'closed'
  - attribute: '[data-highlighted]'
    values: 'Present when highlighted'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

::docs-css-variables-table
---
data:
  - cssVariable: '--akar-dropdown-menu-content-transform-origin'
    description: The `transform-origin` computed from the content and arrow positions/offsets
  - cssVariable: '--akar-dropdown-menu-content-available-width'
    description: The remaining width between the trigger and the boundary edge
  - cssVariable: '--akar-dropdown-menu-content-available-height'
    description: The remaining height between the trigger and the boundary edge
  - cssVariable: '--akar-dropdown-menu-trigger-width'
    description: The width of the trigger
  - cssVariable: '--akar-dropdown-menu-trigger-height'
    description: The height of the trigger
---
::

### SubContent

The component that pops out when a submenu is open. Must be rendered inside `ADropdownMenuSub`.

:docs-component-meta{name="a-dropdown-menu-sub-content"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - 'open'
      - 'closed'
  - attribute: '[data-side]'
    values:
      - 'left'
      - 'right'
      - 'bottom'
      - 'top'
  - attribute: '[data-align]'
    values:
      - 'start'
      - 'end'
      - 'center'
  - attribute: '[data-orientation]'
    values:
      - 'vertical'
      - 'horizontal'
---
::

## Examples

### With submenus

You can create submenus by using `ADropdownMenuSub` in combination with its parts.

```vue{9-11,24-33}
<script setup lang="ts">
import {
  ADropdownMenuArrow,
  ADropdownMenuContent,
  ADropdownMenuItem,
  ADropdownMenuPortal,
  ADropdownMenuRoot,
  ADropdownMenuSeparator,
  ADropdownMenuSub,
  ADropdownMenuSubContent,
  ADropdownMenuSubTrigger,
  ADropdownMenuTrigger,
} from 'akar';
</script>

<template>
  <ADropdownMenuRoot>
    <ADropdownMenuTrigger>…</ADropdownMenuTrigger>
    <ADropdownMenuPortal>
      <ADropdownMenuContent>
        <ADropdownMenuItem>…</ADropdownMenuItem>
        <ADropdownMenuItem>…</ADropdownMenuItem>
        <ADropdownMenuSeparator />
        <ADropdownMenuSub>
          <ADropdownMenuSubTrigger>Sub menu →</ADropdownMenuSubTrigger>
          <ADropdownMenuPortal>
            <ADropdownMenuSubContent>
              <ADropdownMenuItem>Sub menu item</ADropdownMenuItem>
              <ADropdownMenuItem>Sub menu item</ADropdownMenuItem>
              <ADropdownMenuArrow />
            </ADropdownMenuSubContent>
          </ADropdownMenuPortal>
        </ADropdownMenuSub>
        <ADropdownMenuSeparator />
        <ADropdownMenuItem>…</ADropdownMenuItem>
      </ADropdownMenuContent>
    </ADropdownMenuPortal>
  </ADropdownMenuRoot>
</template>
```

### With disabled items

You can add special styles to disabled items via the `data-disabled` attribute.

```vue{18}
<script setup lang="ts">
import {
  ADropdownMenuContent,
  ADropdownMenuItem,
  ADropdownMenuPortal,
  ADropdownMenuRoot,
  ADropdownMenuTrigger,
} from 'akar';
</script>

<template>
  <ADropdownMenuRoot>
    <ADropdownMenuTrigger>…</ADropdownMenuTrigger>
    <ADropdownMenuPortal>
      <ADropdownMenuContent>
        <ADropdownMenuItem
          class="ADropdownMenuItem"
          disabled
        >
          …
        </ADropdownMenuItem>
        <ADropdownMenuItem class="ADropdownMenuItem">
          …
        </ADropdownMenuItem>
      </ADropdownMenuContent>
    </ADropdownMenuPortal>
  </ADropdownMenuRoot>
</template>
```

```css{2}
/* styles.css */
.ADropdownMenuItem[data-disabled] {
  color: gainsboro;
}
```

### With separators

Use the `Separator` part to add a separator between items.

```vue{7,18,20}
<script setup lang="ts">
import {
  ADropdownMenuContent,
  ADropdownMenuItem,
  ADropdownMenuPortal,
  ADropdownMenuRoot,
  ADropdownMenuSeparator,
  ADropdownMenuTrigger,
} from 'akar';
</script>

<template>
  <ADropdownMenuRoot>
    <ADropdownMenuTrigger>…</ADropdownMenuTrigger>
    <ADropdownMenuPortal>
      <ADropdownMenuContent>
        <ADropdownMenuItem>…</ADropdownMenuItem>
        <ADropdownMenuSeparator />
        <ADropdownMenuItem>…</ADropdownMenuItem>
        <ADropdownMenuSeparator />
        <ADropdownMenuItem>…</ADropdownMenuItem>
      </ADropdownMenuContent>
    </ADropdownMenuPortal>
  </ADropdownMenuRoot>
</template>
```

### With labels

Use the `Label` part to help label a section.

```vue{5,17}
<script setup lang="ts">
import {
  ADropdownMenuContent,
  ADropdownMenuItem,
  ADropdownMenuLabel,
  ADropdownMenuPortal,
  ADropdownMenuRoot,
  ADropdownMenuTrigger,
} from 'akar';
</script>

<template>
  <ADropdownMenuRoot>
    <ADropdownMenuTrigger>…</ADropdownMenuTrigger>
    <ADropdownMenuPortal>
      <ADropdownMenuContent>
        <ADropdownMenuLabel>Label</ADropdownMenuLabel>
        <ADropdownMenuItem>…</ADropdownMenuItem>
        <ADropdownMenuItem>…</ADropdownMenuItem>
        <ADropdownMenuItem>…</ADropdownMenuItem>
      </ADropdownMenuContent>
    </ADropdownMenuPortal>
  </ADropdownMenuRoot>
</template>
```

### With checkbox items

Use the `CheckboxItem` part to add an item that can be checked.

```vue{5,26-31}
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  ADropdownMenuCheckboxItem,
  ADropdownMenuContent,
  ADropdownMenuItem,
  ADropdownMenuItemIndicator,
  ADropdownMenuPortal,
  ADropdownMenuRoot,
  ADropdownMenuSeparator,
  ADropdownMenuTrigger,
} from 'akar';
import { ref } from 'vue';

const checked = ref(false);
</script>

<template>
  <ADropdownMenuRoot>
    <ADropdownMenuTrigger>…</ADropdownMenuTrigger>
    <ADropdownMenuPortal>
      <ADropdownMenuContent>
        <ADropdownMenuItem>…</ADropdownMenuItem>
        <ADropdownMenuItem>…</ADropdownMenuItem>
        <ADropdownMenuSeparator />
        <ADropdownMenuCheckboxItem v-model="checked">
          <ADropdownMenuItemIndicator>
            <Icon icon="radix-icons:check" />
          </ADropdownMenuItemIndicator>
          Checkbox item
        </ADropdownMenuCheckboxItem>
      </ADropdownMenuContent>
    </ADropdownMenuPortal>
  </ADropdownMenuRoot>
</template>
```

### With radio items

Use the `RadioGroup` and `RadioItem` parts to add an item that can be checked amongst others.

```vue{8-9,22-41}
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  ADropdownMenuContent,
  ADropdownMenuItemIndicator,
  ADropdownMenuPortal,
  ADropdownMenuRadioGroup,
  ADropdownMenuRadioItem,
  ADropdownMenuRoot,
  ADropdownMenuTrigger,
} from 'akar';
import { ref } from 'vue';

const color = ref(false);
</script>

<template>
  <ADropdownMenuRoot>
    <ADropdownMenuTrigger>…</ADropdownMenuTrigger>
    <ADropdownMenuPortal>
      <ADropdownMenuContent>
        <ADropdownMenuRadioGroup v-model="color">
          <ADropdownMenuRadioItem value="red">
            <ADropdownMenuItemIndicator>
              <Icon icon="radix-icons:check" />
            </ADropdownMenuItemIndicator>
            Red
          </ADropdownMenuRadioItem>
          <ADropdownMenuRadioItem value="blue">
            <ADropdownMenuItemIndicator>
              <Icon icon="radix-icons:check" />
            </ADropdownMenuItemIndicator>
            Blue
          </ADropdownMenuRadioItem>
          <ADropdownMenuRadioItem value="green">
            <ADropdownMenuItemIndicator>
              <Icon icon="radix-icons:check" />
            </ADropdownMenuItemIndicator>
            Green
          </ADropdownMenuRadioItem>
        </ADropdownMenuRadioGroup>
      </ADropdownMenuContent>
    </ADropdownMenuPortal>
  </ADropdownMenuRoot>
</template>
```

### With complex items

You can add extra decorative elements in the `Item` parts, such as images.

```vue{17,21}
<script setup lang="ts">
import {
  ADropdownMenuContent,
  ADropdownMenuItem,
  ADropdownMenuPortal,
  ADropdownMenuRoot,
  ADropdownMenuTrigger,
} from 'akar';
</script>

<template>
  <ADropdownMenuRoot>
    <ADropdownMenuTrigger>…</ADropdownMenuTrigger>
    <ADropdownMenuPortal>
      <ADropdownMenuContent>
        <ADropdownMenuItem>
          <img src="…">
          Adolfo Hess
        </ADropdownMenuItem>
        <ADropdownMenuItem>
          <img src="…">
          Miyah Myles
        </ADropdownMenuItem>
      </ADropdownMenuContent>
    </ADropdownMenuPortal>
  </ADropdownMenuRoot>
</template>
```

### Constrain the content/sub-content size

You may want to constrain the width of the content (or sub-content) so that it matches the trigger (or sub-trigger) width. You may also want to constrain its height to not exceed the viewport.

We expose several CSS custom properties such as `--akar-dropdown-menu-trigger-width` and `--akar-dropdown-menu-content-available-height` to support this. Use them to constrain the content dimensions.

```vue{9-12}
<script setup lang="ts">
import { ADropdownMenuContent, ADropdownMenuPortal, ADropdownMenuRoot, ADropdownMenuTrigger } from 'akar';
</script>

<template>
  <ADropdownMenuRoot>
    <ADropdownMenuTrigger>…</ADropdownMenuTrigger>
    <ADropdownMenuPortal>
      <ADropdownMenuContent
        class="ADropdownMenuContent"
        :side-offset="5"
      >
        …
      </ADropdownMenuContent>
    </ADropdownMenuPortal>
  </ADropdownMenuRoot>
</template>
```

```css{3-4}
/* styles.css */
.ADropdownMenuContent {
  width: var(--akar-dropdown-menu-trigger-width);
  max-height: var(--akar-dropdown-menu-content-available-height);
}
```

### Origin-aware animations

We expose a CSS custom property `--akar-dropdown-menu-content-transform-origin`. Use it to animate the content from its computed origin based on `side`, `sideOffset`, `align`, `alignOffset` and any collisions.

```vue{9}
<script setup lang="ts">
import { ADropdownMenuContent, ADropdownMenuPortal, ADropdownMenuRoot, ADropdownMenuTrigger } from 'akar';
</script>

<template>
  <ADropdownMenuRoot>
    <ADropdownMenuTrigger>…</ADropdownMenuTrigger>
    <ADropdownMenuPortal>
      <ADropdownMenuContent class="ADropdownMenuContent">
        …
      </ADropdownMenuContent>
    </ADropdownMenuPortal>
  </ADropdownMenuRoot>
</template>
```

```css{3}
/* styles.css */
.ADropdownMenuContent {
  transform-origin: var(--akar-dropdown-menu-content-transform-origin);
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
<script setup lang="ts">
import { ADropdownMenuContent, ADropdownMenuPortal, ADropdownMenuRoot, ADropdownMenuTrigger } from 'akar';
</script>

<template>
  <ADropdownMenuRoot>
    <ADropdownMenuTrigger>…</ADropdownMenuTrigger>
    <ADropdownMenuPortal>
      <ADropdownMenuContent class="ADropdownMenuContent">
        …
      </ADropdownMenuContent>
    </ADropdownMenuPortal>
  </ADropdownMenuRoot>
</template>
```

```css{6-11}
/* styles.css */
.ADropdownMenuContent {
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
.ADropdownMenuContent[data-side='top'] {
  animation-name: slideUp;
}
.ADropdownMenuContent[data-side='bottom'] {
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

Adheres to the [Menu Button WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button) and uses [roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex) to manage focus movement among menu items.

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-dropdown-menu
data:
  - keys: ['Space']
    description: When focus is on `ADropdownMenuTrigger`, opens the dropdown menu and focuses the first item. <br/> When focus is on an item, activates the focused item.
  - keys: ['Enter']
    description: When focus is on `ADropdownMenuTrigger`, opens the dropdown menu and focuses the first item. <br/> When focus is on an item, activates the focused item.
  - keys: ['ArrowDown']
    description: When focus is on `ADropdownMenuTrigger`, opens the dropdown menu. <br/> When focus is on an item, moves focus to the next item.
  - keys: ['ArrowUp']
    description: When focus is on an item, moves focus to the previous item.
  - keys: ['ArrowRight', 'ArrowLeft']
    description: When focus is on `ADropdownMenuSubTrigger`, opens or closes the submenu depending on reading direction.
  - keys: ['Esc']
    description: Closes the dropdown menu and moves focus to `ADropdownMenuTrigger`.
---
::

## Custom APIs

Create your own API by abstracting the primitive parts into your own component.

### Abstract the arrow and item indicators

This example abstracts the `ADropdownMenuArrow` and `ADropdownMenuItemIndicator` parts. It also wraps implementation details for `CheckboxItem` and `RadioItem`.

#### Usage

```vue
<script setup lang="ts">
import {
  ADropdownMenu,
  ADropdownMenuCheckboxItem,
  ADropdownMenuContent,
  ADropdownMenuGroup,
  ADropdownMenuItem,
  ADropdownMenuLabel,
  ADropdownMenuRadioGroup,
  ADropdownMenuRadioItem,
  ADropdownMenuSeparator,
  ADropdownMenuTrigger,
} from './your-dropdown-menu';
</script>

<template>
  <ADropdownMenu>
    <ADropdownMenuTrigger>ADropdownMenu trigger</ADropdownMenuTrigger>
    <ADropdownMenuContent>
      <ADropdownMenuItem>Item</ADropdownMenuItem>
      <ADropdownMenuLabel>Label</ADropdownMenuLabel>
      <ADropdownMenuGroup>Group</ADropdownMenuGroup>
      <ADropdownMenuCheckboxItem>CheckboxItem</ADropdownMenuCheckboxItem>
      <ADropdownMenuSeparator>Separator</ADropdownMenuSeparator>
      <ADropdownMenuRadioGroup>
        <ADropdownMenuRadioItem>RadioItem</ADropdownMenuRadioItem>
        <ADropdownMenuRadioItem>RadioItem</ADropdownMenuRadioItem>
      </ADropdownMenuRadioGroup>
    </ADropdownMenuContent>
  </ADropdownMenu>
</template>
```

#### Implementation

```ts
export { default as ADropdownMenuCheckboxItem } from 'ADropdownMenuCheckboxItem.vue';
// your-dropdown-menu.ts
export { default as ADropdownMenuContent } from 'ADropdownMenuContent.vue';
export { default as ADropdownMenuRadioItem } from 'ADropdownMenuRadioItem.vue';

export {
  ADropdownMenuRoot as ADropdownMenu,
  ADropdownMenuGroup,
  ADropdownMenuItem,
  ADropdownMenuLabel,
  ADropdownMenuRadioGroup,
  ADropdownMenuSeparator,
  ADropdownMenuTrigger
} from 'akar';
```

```vue
<!-- ADropdownMenuContent.vue -->
<script setup lang="ts">
import type { ADropdownMenuContentEmits, ADropdownMenuContentProps } from 'akar';
import { ADropdownMenuContent, ADropdownMenuPortal, useForwardPropsEmits } from 'akar';

const props = defineProps<ADropdownMenuContentProps>();
const emits = defineEmits<ADropdownMenuContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ADropdownMenuPortal>
    <ADropdownMenuContent v-bind="forwarded">
      <slot />
    </ADropdownMenuContent>
  </ADropdownMenuPortal>
</template>
```

```vue
<!-- ADropdownMenuCheckboxItem.vue -->
<script setup lang="ts">
import type { ADropdownMenuCheckboxItemEmits, ADropdownMenuCheckboxItemProps } from 'akar';
import { CheckIcon } from '@radix-icons/vue';
import { ADropdownMenuCheckboxItem, ADropdownMenuItemIndicator, useForwardPropsEmits } from 'akar';

const props = defineProps<ADropdownMenuCheckboxItemProps>();
const emits = defineEmits<ADropdownMenuCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ADropdownMenuCheckboxItem v-bind="forwarded">
    <span>
      <ADropdownMenuItemIndicator>
        <CheckIcon />
      </ADropdownMenuItemIndicator>
    </span>
    <slot />
  </ADropdownMenuCheckboxItem>
</template>
```

```vue
<!-- ADropdownMenuRadioItem.vue -->
<script setup lang="ts">
import type { ADropdownMenuRadioItemEmits, ADropdownMenuRadioItemProps } from 'akar';
import { DotFilledIcon } from '@radix-icons/vue';
import { ADropdownMenuItemIndicator, ADropdownMenuRadioItem, useForwardPropsEmits } from 'akar';

const props = defineProps<ADropdownMenuRadioItemProps>();
const emits = defineEmits<ADropdownMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ADropdownMenuRadioItem v-bind="forwarded">
    <span>
      <ADropdownMenuItemIndicator>
        <DotFilledIcon />
      </ADropdownMenuItemIndicator>
    </span>
    <slot />
  </ADropdownMenuRadioItem>
</template>
```
