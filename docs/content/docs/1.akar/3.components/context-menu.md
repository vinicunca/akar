---
description: Displays a menu located at the pointer, triggered by a right-click or a long-press.
category: overlay
links:
  - label: Pohon
    to: /docs/pohon/components/context-menu
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/context-menu/index.ts
---

:docs-component-example{name="a-context-menu"}

## Features

::docs-highlights
---
features:
  - Supports submenus with configurable reading direction.
  - Supports items, labels, groups of items.
  - Supports checkable items (single or multiple) with optional indeterminate state.
  - Supports modal and non-modal modes.
  - Customize side, alignment, offsets, collision handling.
  - Focus is fully managed.
  - Full keyboard navigation.
  - Typeahead support.
  - Dismissing and layering behavior is highly customizable.
  - Triggers with a long-press on touch devices
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup lang="ts">
import {
  AContextMenuCheckboxItem,
  AContextMenuContent,
  AContextMenuGroup,
  AContextMenuItem,
  AContextMenuItemIndicator,
  AContextMenuLabel,
  AContextMenuPortal,
  AContextMenuRadioGroup,
  AContextMenuRadioItem,
  AContextMenuRoot,
  AContextMenuSeparator,
  AContextMenuSub,
  AContextMenuSubContent,
  AContextMenuSubTrigger,
  AContextMenuTrigger,
} from 'akar';
</script>

<template>
  <AContextMenuRoot>
    <AContextMenuTrigger />

    <AContextMenuPortal>
      <AContextMenuContent>
        <AContextMenuLabel />
        <AContextMenuItem />

        <AContextMenuGroup>
          <AContextMenuItem />
        </AContextMenuGroup>

        <AContextMenuCheckboxItem>
          <AContextMenuItemIndicator />
        </AContextMenuCheckboxItem>

        <AContextMenuRadioGroup>
          <AContextMenuRadioItem>
            <AContextMenuItemIndicator />
          </AContextMenuRadioItem>
        </AContextMenuRadioGroup>

        <AContextMenuSub>
          <AContextMenuSubTrigger />
          <AContextMenuPortal>
            <AContextMenuSubContent />
          </AContextMenuPortal>
        </AContextMenuSub>

        <AContextMenuSeparator />
      </AContextMenuContent>
    </AContextMenuPortal>
  </AContextMenuRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/context-menu"}

## API Reference

Adheres to the [Menu WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu) and uses [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.2/examples/menu-button/menu-button-actions.html) to manage focus movement among menu items.

### Root

Contains all the parts of a context menu.

:docs-component-meta{name="a-context-menu-root"}

### Trigger

The area that opens the context menu. Wrap it around the target you want the context menu to open from when right-clicking (or using the relevant keyboard shortcuts).

:docs-component-meta{name="a-context-menu-trigger"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - 'open'
      - 'closed'
---
::

### Portal

When used, portals the content part into the `body`.

:docs-component-meta{name="a-context-menu-portal"}

### Content

The component that pops out in an open context menu.

:docs-component-meta{name="a-context-menu-content"}

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
---
::

::docs-css-variables-table
---
data:
  - cssVariable: --akar-context-menu-content-transform-origin
    description: The `transform-origin` computed from the content and arrow positions/offsets
  - cssVariable: --akar-context-menu-content-available-width
    description: The remaining width between the trigger and the boundary edge
  - cssVariable: --akar-context-menu-content-available-height
    description: The remaining height between the trigger and the boundary edge
  - cssVariable: --akar-context-menu-trigger-width
    description: The width of the trigger
  - cssVariable: --akar-context-menu-trigger-height
    description: The height of the trigger
---
::

### Arrow

An optional arrow element to render alongside a submenu. This can be used to help visually link the trigger item with the `AContextMenu.Content`. Must be rendered inside `AContextMenu.Content`.

:docs-component-meta{name="a-context-menu-arrow"}

### Item

The component that contains the context menu items.

:docs-component-meta{name="a-context-menu-item"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-highlighted]'
    values: 'Present when highlighted'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### Group

Used to group multiple `AContextMenu.Item`s.

:docs-component-meta{name="a-context-menu-group"}

### Label

Used to render a label. It won't be focusable using arrow keys.

:docs-component-meta{name="a-context-menu-label"}

### CheckboxItem

An item that can be controlled and rendered like a checkbox.

:docs-component-meta{name="a-context-menu-checkbox-item"}

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

### RadioGroup

Used to group multiple `AContextMenu.RadioItem`s.

:docs-component-meta{name="a-context-menu-radio-group"}

### RadioItem

An item that can be controlled and rendered like a radio.

:docs-component-meta{name="a-context-menu-radio-item"}

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

Renders when the parent `AContextMenu.CheckboxItem` or `AContextMenu.RadioItem` is checked. You can style this element directly, or you can use it as a wrapper to put an icon into, or both.

:docs-component-meta{name="a-context-menu-item-indicator"}

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

Used to visually separate items in the context menu.

:docs-component-meta{name="a-context-menu-separator"}

### Sub

Contains all the parts of a submenu.

:docs-component-meta{name="a-context-menu-sub"}

### SubTrigger

An item that opens a submenu. Must be rendered inside `AContextMenu.Sub`.

:docs-component-meta{name="a-context-menu-sub-trigger"}

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

### SubContent

The component that pops out when a submenu is open. Must be rendered inside `AContextMenu.Sub`.

:docs-component-meta{name="a-context-menu-sub-content"}

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
---
::

::docs-css-variables-table
---
data:
  - cssVariable: --akar-context-menu-content-transform-origin
    description: The `transform-origin` computed from the content and arrow positions/offsets
  - cssVariable: --akar-context-menu-content-available-width
    description: The remaining width between the trigger and the boundary edge
  - cssVariable: --akar-context-menu-content-available-height
    description: The remaining height between the trigger and the boundary edge
  - cssVariable: --akar-context-menu-trigger-width
    description: The width of the trigger
  - cssVariable: --akar-context-menu-trigger-height
    description: The height of the trigger
---
::

## Examples

### With submenus

You can create submenus by using `AContextMenuSub` in combination with its parts.

```vue{24-33}
<script setup lang="ts">
import {
  AContextMenuContent,
  AContextMenuItem,
  AContextMenuPortal,
  AContextMenuRoot,
  AContextMenuSeparator,
  AContextMenuSub,
  AContextMenuSubContent,
  AContextMenuSubTrigger,
  AContextMenuTrigger,
} from 'akar';
</script>

<template>
  <AContextMenuRoot>
    <AContextMenuTrigger>…</AContextMenuTrigger>
    <AContextMenuPortal>
      <AContextMenuContent>
        <AContextMenuItem>…</AContextMenuItem>
        <AContextMenuItem>…</AContextMenuItem>
        <AContextMenuSeparator />
        <AContextMenuSub>
          <AContextMenuSubTrigger>Sub menu →</AContextMenuSubTrigger>
          <AContextMenuPortal>
            <AContextMenuSubContent>
              <AContextMenuItem>Sub menu item</AContextMenuItem>
              <AContextMenuItem>Sub menu item</AContextMenuItem>
              <AContextMenuArrow />
            </AContextMenuSubContent>
          </AContextMenuPortal>
        </AContextMenuSub>
        <AContextMenuSeparator />
        <AContextMenuItem>…</AContextMenuItem>
      </AContextMenuContent>
    </AContextMenuPortal>
  </AContextMenuRoot>
</template>
```

### With disabled items

You can add special styles to disabled items via the `data-disabled` attribute.

```vue{12}
<script setup lang="ts">
import { AContextMenuContent, AContextMenuItem, AContextMenuPortal, AContextMenuRoot, AContextMenuTrigger } from 'akar';
</script>

<template>
  <AContextMenuRoot>
    <AContextMenuTrigger>…</AContextMenuTrigger>
    <AContextMenuPortal>
      <AContextMenuContent>
        <AContextMenuItem
          class="AContextMenuItem"
          disabled
        >
          …
        </AContextMenuItem>
        <AContextMenuItem class="AContextMenuItem">
          …
        </AContextMenuItem>
      </AContextMenuContent>
    </AContextMenuPortal>
  </AContextMenuRoot>
</template>
```

```css{2}
/* styles.css */
.AContextMenuItem[data-disabled] {
  color: gainsboro;
}
```

### With separators

Use the `Separator` part to add a separator between items.

```vue{7,18,20}
<script setup lang="ts">
import {
  AContextMenuContent,
  AContextMenuItem,
  AContextMenuPortal,
  AContextMenuRoot,
  AContextMenuSeparator,
  AContextMenuTrigger,
} from 'akar';
</script>

<template>
  <AContextMenuRoot>
    <AContextMenuTrigger>…</AContextMenuTrigger>
    <AContextMenuPortal>
      <AContextMenuContent>
        <AContextMenuItem>…</AContextMenuItem>
        <AContextMenuSeparator />
        <AContextMenuItem>…</AContextMenuItem>
        <AContextMenuSeparator />
        <AContextMenuItem>…</AContextMenuItem>
      </AContextMenuContent>
    </AContextMenuPortal>
  </AContextMenuRoot>
</template>
```

### With labels

Use the `Label` part to help label a section.

```vue{5,17}
<script setup lang="ts">
import {
  AContextMenuContent,
  AContextMenuItem,
  AContextMenuLabel,
  AContextMenuPortal,
  AContextMenuRoot,
  AContextMenuTrigger,
} from 'akar';
</script>

<template>
  <AContextMenuRoot>
    <AContextMenuTrigger>…</AContextMenuTrigger>
    <AContextMenuPortal>
      <AContextMenuContent>
        <AContextMenuLabel>Label</AContextMenuLabel>
        <AContextMenuItem>…</AContextMenuItem>
        <AContextMenuItem>…</AContextMenuItem>
        <AContextMenuItem>…</AContextMenuItem>
      </AContextMenuContent>
    </AContextMenuPortal>
  </AContextMenuRoot>
</template>
```

### With checkbox items

Use the `CheckboxItem` part to add an item that can be checked.

```vue{3,25-30}
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  AContextMenuCheckboxItem,
  AContextMenuContent,
  AContextMenuItem,
  AContextMenuItemIndicator,
  AContextMenuPortal,
  AContextMenuRoot,
  AContextMenuSeparator,
  AContextMenuTrigger,
} from 'akar';

const checked = ref(true);
</script>

<template>
  <AContextMenuRoot>
    <AContextMenuTrigger>…</AContextMenuTrigger>
    <AContextMenuPortal>
      <AContextMenuContent>
        <AContextMenuItem>…</AContextMenuItem>
        <AContextMenuItem>…</AContextMenuItem>
        <AContextMenuSeparator />
        <AContextMenuCheckboxItem v-model="checked">
          <AContextMenuItemIndicator>
            <Icon icon="radix-icons:check" />
          </AContextMenuItemIndicator>
          Checkbox item
        </AContextMenuCheckboxItem>
      </AContextMenuContent>
    </AContextMenuPortal>
  </AContextMenuRoot>
</template>
```

### With radio items

Use the `RadioGroup` and `RadioItem` parts to add an item that can be checked amongst others.

```vue{8,9,24-43}
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  AContextMenuCheckboxItem,
  AContextMenuContent,
  AContextMenuItem,
  AContextMenuItemIndicator,
  AContextMenuPortal,
  AContextMenuRadioGroup,
  AContextMenuRadioItem,
  AContextMenuRoot,
  AContextMenuSeparator,
  AContextMenuTrigger,
} from 'akar';

const color = ref('blue');
</script>

<template>
  <AContextMenuRoot>
    <AContextMenuTrigger>…</AContextMenuTrigger>
    <AContextMenuPortal>
      <AContextMenuContent>
        <AContextMenuRadioGroup v-model="color">
          <AContextMenuRadioItem value="red">
            <AContextMenuItemIndicator>
              <Icon icon="radix-icons:check" />
            </AContextMenuItemIndicator>
            Red
          </AContextMenuRadioItem>
          <AContextMenuRadioItem value="blue">
            <AContextMenuItemIndicator>
              <Icon icon="radix-icons:check" />
            </AContextMenuItemIndicator>
            Blue
          </AContextMenuRadioItem>
          <AContextMenuRadioItem value="green">
            <AContextMenuItemIndicator>
              <Icon icon="radix-icons:check" />
            </AContextMenuItemIndicator>
            Green
          </AContextMenuRadioItem>
        </AContextMenuRadioGroup>
      </AContextMenuContent>
    </AContextMenuPortal>
  </AContextMenuRoot>
</template>
```

### With complex items

You can add extra decorative elements in the `Item` parts, such as images.

```vue{11,15}
<script setup lang="ts">
import { AContextMenuContent, AContextMenuItem, AContextMenuPortal, AContextMenuRoot, AContextMenuTrigger } from 'akar';
</script>

<template>
  <AContextMenuRoot>
    <AContextMenuTrigger>…</AContextMenuTrigger>
    <AContextMenuPortal>
      <AContextMenuContent>
        <AContextMenuItem>
          <img src="…">
          Adolfo Hess
        </AContextMenuItem>
        <AContextMenuItem>
          <img src="…">
          Miyah Myles
        </AContextMenuItem>
      </AContextMenuContent>
    </AContextMenuPortal>
  </AContextMenuRoot>
</template>
```

### Constrain the content/sub-content size

You may want to constrain the width of the content (or sub-content) so that it matches the trigger (or sub-trigger) width. You may also want to constrain its height to not exceed the viewport.

We expose several CSS custom properties such as `--akar-context-menu-trigger-width` and `--akar-context-menu-content-available-height` to support this. Use them to constrain the content dimensions.

```vue{9}
<script setup lang="ts">
import { AContextMenuContent, AContextMenuItem, AContextMenuPortal, AContextMenuRoot, AContextMenuTrigger } from 'akar';
</script>

<template>
  <AContextMenuRoot>
    <AContextMenuTrigger>…</AContextMenuTrigger>
    <AContextMenuPortal>
      <AContextMenuContent class="AContextMenuContent">
        …
      </AContextMenuContent>
    </AContextMenuPortal>
  </AContextMenuRoot>
</template>
```

```css{3-4}
/* styles.css */
.AContextMenuContent {
  width: var(--akar-context-menu-trigger-width);
  max-height: var(--akar-context-menu-content-available-height);
}
```

### Origin-aware animations

We expose a CSS custom property `--akar-context-menu-content-transform-origin`. Use it to animate the content from its computed origin based on `side`, `sideOffset`, `align`, `alignOffset` and any collisions.

```vue{9}
<script setup lang="ts">
import { AContextMenuContent, AContextMenuPortal, AContextMenuRoot, AContextMenuTrigger } from 'akar';
</script>

<template>
  <AContextMenuRoot>
    <AContextMenuTrigger>…</AContextMenuTrigger>
    <AContextMenuPortal>
      <AContextMenuContent class="AContextMenuContent">
        …
      </AContextMenuContent>
    </AContextMenuPortal>
  </AContextMenuRoot>
</template>
```

```css{3}
/* styles.css */
.AContextMenuContent {
  transform-origin: var(--akar-context-menu-content-transform-origin);
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
import { AContextMenuContent, AContextMenuPortal, AContextMenuRoot, AContextMenuTrigger } from 'akar';
</script>

<template>
  <AContextMenuRoot>
    <AContextMenuTrigger>…</AContextMenuTrigger>
    <AContextMenuPortal>
      <AContextMenuContent class="AContextMenuContent">
        …
      </AContextMenuContent>
    </AContextMenuPortal>
  </AContextMenuRoot>
</template>
```

```css{6-11}
/* styles.css */
.AContextMenuContent {
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
.AContextMenuContent[data-side='top'] {
  animation-name: slideUp;
}
.AContextMenuContent[data-side='bottom'] {
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

Uses [roving tabindex](https://www.w3.org/WAI/ARIA/apg/patterns/kbd_roving_tabindex) to manage focus movement among menu items.

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-context-menu
data:
  - keys: ['Space']
    description: Activates the focused item.
  - keys: ['Enter']
    description: Activates the focused item.
  - keys: ['ArrowDown']
    description: Moves focus to the next item.
  - keys: ['ArrowUp']
    description: Moves focus to the previous item.
  - keys: ['ArrowRight', 'ArrowLeft']
    description: When focus is on `AContextMenu.SubTrigger`, opens or closes the submenu depending on reading direction.
  - keys: ['Esc']
    description: Closes the context menu
---
::
