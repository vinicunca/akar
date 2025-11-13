---
category: form
description: Choose from a list of suggested values with full keyboard support.
links:
  - label: Pohon
    to: /docs/pohon/components/input-menu
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/combobox/index.ts
---

:docs-component-example{name="a-combobox"}

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
  - Supports Right to Left direction.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup lang="ts">
import {
  AComboboxAnchor,
  AComboboxArrow,
  AComboboxCancel,
  AComboboxContent,
  AComboboxGroup,
  AComboboxInput,
  AComboboxItem,
  AComboboxItemIndicator,
  AComboboxLabel,
  AComboboxPortal,
  AComboboxRoot,
  AComboboxSeparator,
  AComboboxTrigger,
  AComboboxViewport,
} from 'akar';
</script>

<template>
  <AComboboxRoot>
    <AComboboxAnchor>
      <AComboboxInput />
      <AComboboxTrigger />
      <AComboboxCancel />
    </AComboboxAnchor>

    <AComboboxPortal>
      <AComboboxContent>
        <AComboboxViewport>
          <AComboboxItem>
            <AComboboxItemIndicator />
          </AComboboxItem>

          <AComboboxGroup>
            <AComboboxLabel />
            <AComboboxItem>
              <AComboboxItemIndicator />
            </AComboboxItem>
          </AComboboxGroup>
          <AComboboxSeparator />
        </AComboboxViewport>

        <AComboboxArrow />
      </AComboboxContent>
    </AComboboxPortal>
  </AComboboxRoot>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/combobox"}

## API Reference

### Root

Contains all the parts of a Combobox

:docs-component-meta{name="a-combobox-root"}

### Anchor

Used as an anchor if you set `AComboboxContent`'s position to `popper`.

:docs-component-meta{name="a-combobox-anchor"}

### Input

The input component to search through the combobox items.

:docs-component-meta{name="a-combobox-input"}

### Trigger

The button that toggles the Combobox Content.

:docs-component-meta{name="a-combobox-trigger"}

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

### Cancel

The button that clears the search term.

:docs-component-meta{name="a-combobox-cancel"}

### Empty

Shown when none of the items match the query.

:docs-component-meta{name="a-combobox-empty"}

### Portal

When used, portals the content part into the `body`.

You need to set `position="popper"` for `AComboboxContent` to make sure the position was automatically computed similar to `Popover` or `DropdownMenu`.

:docs-component-meta{name="a-combobox-portal"}

### Content

The component that pops out when the combobox is open.

:docs-presence-tip

:docs-component-meta{name="a-combobox-content"}

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
  - cssVariable: --akar-combobox-content-transform-origin
    description: The `transform-origin` computed from the content and arrow positions/offsets. Only present when `position="popper"`
  - cssVariable: --akar-combobox-content-available-width
    description: The remaining width between the trigger and the boundary edge. Only present when `position="popper"`
  - cssVariable: --akar-combobox-content-available-height
    description: The remaining height between the trigger and the boundary edge. Only present when `position="popper"`
  - cssVariable: --akar-combobox-trigger-width
    description: The width of the trigger. Only present when `position="popper"`
  - cssVariable: --akar-combobox-trigger-height
    description: The height of the trigger. Only present when `position="popper"`
---
::

### Viewport

The scrolling viewport that contains all of the items.

:docs-component-meta{name="a-combobox-viewport"}

### Item

The component that contains the combobox items.

:docs-component-meta{name="a-combobox-item"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - checked
      - unchecked
  - attribute: '[data-highlighted]'
    values: 'Present when highlighted'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

### ItemIndicator

Renders when the item is selected. You can style this element directly, or you can use it as a wrapper to put an icon into, or both.

:docs-component-meta{name="aa-combobo-item-indicator"}

### Group

Used to group multiple items. use in conjunction with `AComboboxLabel` to ensure good accessibility via automatic labelling.

:docs-component-meta{name="a-combobox-group"}

### Label

Used to render the label of a group. It won't be focusable using arrow keys.

:docs-component-meta{name="a-combobox-label"}

### Separator

Used to visually separate items in the Combobox

:docs-component-meta{name="a-combobox-separator"}

### Arrow

An optional arrow element to render alongside the content. This can be used to help visually link the trigger with the `AComboboxContent`. Must be rendered inside `AComboboxContent`. Only available when `position` is set to `popper`.

:docs-component-meta{name="a-combobox-arrow"}

### Virtualizer

Virtual container to achieve list virtualization.

::warning
Combobox items **must** be filtered manually before passing them over to the virtualizer. See [example below](#virtualized-combobox-with-working-filtering).
::

See the [virtualization guide](../guides/virtualization.md) for more general info on virtualization.

:docs-component-meta{name="a-combobox-virtualizer"}

## Examples

### Binding objects as values

Unlike native HTML form controls which only allow you to provide strings as values, `akar` supports binding complex objects as well.

Make sure to set the `displayValue` prop to set the input value on item selection.

```vue {12,17,23}
<script setup lang="ts">
import { AComboboxContent, AComboboxInput, AComboboxItem, AComboboxPortal, AComboboxRoot } from 'akar';
import { ref } from 'vue';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];
const selectedPeople = ref(people[0]);
</script>

<template>
  <AComboboxRoot v-model="selectedPeople">
    <AComboboxInput :display-value="(v) => v.name" />
    <AComboboxPortal>
      <AComboboxContent>
        <AComboboxItem
          v-for="person in people"
          :key="person.id"
          :value="person"
          :disabled="person.unavailable"
        >
          {{ person.name }}
        </AComboboxItem>
      </AComboboxContent>
    </AComboboxPortal>
  </AComboboxRoot>
</template>
```

### Selecting multiple values

The `Combobox` component allows you to select multiple values. You can enable this by providing an array of values instead of a single value.

```vue {12,17-18}
<script setup lang="ts">
import { AComboboxRoot } from 'akar';
import { ref } from 'vue';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];
const selectedPeople = ref([people[0], people[1]]);
</script>

<template>
  <AComboboxRoot
    v-model="selectedPeople"
    multiple
  >
    …
  </AComboboxRoot>
</template>
```

### Custom filtering

Internally, `AComboboxRoot` will filter the item based on the rendered text.

However, you may also provide your own custom filtering logic together with setting `ignoreFilter="true"`.

```vue {15,16,22,28}
<script setup lang="ts">
import { AComboboxContent, AComboboxInput, AComboboxItem, AComboboxPortal, AComboboxRoot, useFilter } from 'akar';
import { ref } from 'vue';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];
const selectedPeople = ref(people[0]);
const searchTerm = ref('');

const { startsWith } = useFilter({ sensitivity: 'base' });
const filteredPeople = computed(() => people.filter((p) => startsWith(p.name, searchTerm.value)));
</script>

<template>
  <AComboboxRoot
    v-model="selectedPeople"
    :ignore-filter="true"
  >
    <AComboboxInput v-model="searchTerm" />
    <AComboboxPortal>
      <AComboboxContent>
        <AComboboxItem
          v-for="person in filteredPeople"
          :key="person.id"
          :value="person"
        >
          {{ person.name }}
        </AComboboxItem>
      </AComboboxContent>
    </AComboboxPortal>
  </AComboboxRoot>
</template>
```

### Custom label

By default the `Combobox` will use the input contents as the label for screenreaders. If you'd like more control over what is announced to assistive technologies, use the [Label](/docs/akar/components/label) component.

```vue {8,10}
<script setup lang="ts">
import { AComboboxInput, AComboboxRoot, Label } from 'akar';
</script>

<template>
  <AComboboxRoot v-model="selectedPeople">
    <Label for="person">Person: </Label>
    <AComboboxInput
      id="person"
      placeholder="Select a person"
    />
    …
  </AComboboxRoot>
</template>
```

### With disabled items

 You can add special styles to disabled items via the `data-disabled` attribute.

```vue {19}
<script setup lang="ts">
import {
  AComboboxContent,
  AComboboxInput,
  AComboboxItem,
  AComboboxPortal,
  AComboboxRoot,
} from 'akar';
</script>

<template>
  <AComboboxRoot>
    <AComboboxInput />
    <AComboboxPortal>
      <AComboboxContent>
        <AComboboxItem
          class="AComboboxItem"
          disabled
        >
          …
        </AComboboxItem>
      </AComboboxContent>
    </AComboboxPortal>
  </AComboboxRoot>
</template>
```

```css {2}
/* styles.css */
.AComboboxItem[data-disabled] {
  color: 'gainsboro';
}
```

### With separators

Use the `Separator` part to add a separator between items.

```vue {21}
<script setup lang="ts">
import {
  AComboboxContent,
  AComboboxInput,
  AComboboxItem,
  AComboboxPortal,
  AComboboxRoot,
  AComboboxSeparator
} from 'akar';
</script>

<template>
  <AComboboxRoot>
    <AComboboxInput />
    <AComboboxPortal>
      <AComboboxContent>
        <AComboboxItem>…</AComboboxItem>
        <AComboboxItem>…</AComboboxItem>
        <AComboboxItem>…</AComboboxItem>
        <AComboboxSeparator />
        <AComboboxItem>…</AComboboxItem>
        <AComboboxItem>…</AComboboxItem>
        <AComboboxItem>…</AComboboxItem>
      </AComboboxContent>
    </AComboboxPortal>
  </AComboboxRoot>
</template>
```

### With grouped items

Use the `Group` and `Label` parts to group items in a section.

```vue {19,20,24}
<script setup lang="ts">
import {
  AComboboxContent,
  AComboboxGroup,
  AComboboxInput,
  AComboboxItem,
  AComboboxLabel,
  AComboboxPortal,
  AComboboxRoot
} from 'akar';
</script>

<template>
  <AComboboxRoot>
    <AComboboxInput />
    <AComboboxPortal>
      <AComboboxContent>
        <AComboboxGroup>
          <AComboboxLabel>Label</AComboboxLabel>
          <AComboboxItem>…</AComboboxItem>
          <AComboboxItem>…</AComboboxItem>
          <AComboboxItem>…</AComboboxItem>
        </AComboboxGroup>
      </AComboboxContent>
    </AComboboxPortal>
  </AComboboxRoot>
</template>
```

### With complex items

You can use custom content in your items.

```vue {21}
<script setup lang="ts">
import {
  AComboboxContent,
  AComboboxInput,
  AComboboxItem,
  AComboboxItemIndicator,
  AComboboxPortal,
  AComboboxRoot
} from 'akar';
</script>

<template>
  <AComboboxRoot>
    <AComboboxInput />
    <AComboboxPortal>
      <AComboboxContent>
        <AComboboxItem>
          <img src="…">
          Adolfo Hess
          <AComboboxItemIndicator />
        </AComboboxItem>
        …
      </AComboboxContent>
    </AComboboxPortal>
  </AComboboxRoot>
</template>
```

### Prevent select behavior

By default, selecting `AComboboxItem` would close the content, and update the `modelValue` with the provided value.
You can prevent this behavior by preventing default `@select.prevent`.

```vue {11}
<script setup lang="ts">
import { AComboboxContent, AComboboxInput, AComboboxItem, AComboboxPortal, AComboboxRoot } from 'akar';
</script>

<template>
  <AComboboxRoot>
    <AComboboxInput />
    <AComboboxPortal>
      <AComboboxContent>
        <AComboboxItem @select.prevent>
          Item A
        </AComboboxItem>
        …
      </AComboboxContent>
    </AComboboxPortal>
  </AComboboxRoot>
</template>
```

### Virtualized combobox with working filtering

ACombobox items **must** be filtered manually before passing them over to the virtualizer.

See the [virtualization guide](../guides/virtualization.md) for more general info on virtualization.

```vue {9-10,17,19-28}
<script setup lang="ts">
import { AComboboxContent, AComboboxInput, AComboboxItem, AComboboxPortal, AComboboxRoot, AComboboxViewport, AComboboxVirtualizer, useFilter } from 'akar';
import { computed, ref } from 'vue';

const people = Array.from({ length: 100000 }).map((_, id) => ({ id, name: `Person #${id}` }));
const selectedPeople = ref(people[0]);
const searchTerm = ref('');

const { contains } = useFilter({ sensitivity: 'base' });
const filteredPeople = computed(() => people.filter((p) => contains(p.name, searchTerm.value)));
</script>

<template>
  <AComboboxRoot v-model="selectedPeople">
    <AComboboxInput v-model="searchTerm" />
    <AComboboxPortal>
      <AComboboxContent class="max-h-[40vh] overflow-hidden">
        <AComboboxViewport>
          <AComboboxVirtualizer
            v-slot="{ option }"
            :options="filteredPeople"
            :text-content="(x) => x.name"
            :estimate-size="24"
          >
            <AComboboxItem :value="option">
              {{ option.name }}
            </AComboboxItem>
          </AComboboxVirtualizer>
        </AComboboxViewport>
      </AComboboxContent>
    </AComboboxPortal>
  </AComboboxRoot>
</template>
```

## Accessibility

Adheres to the [ACombobox WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/Acombobox/).

See the W3C [ACombobox Autocomplete List](https://www.w3.org/WAI/ARIA/apg/patterns/Acombobox/examples/Acombobox-autocomplete-list/) example for more information.

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-combobox
data:
  - keys: ['Enter']
    description: 'When focus is on `AComboboxItem`, selects the focused item.',
  - keys: ['ArrowDown']
    description: ' When focus is on `AComboboxInput`, opens the ACombobox content. <br /> When focus is on an item, moves focus to the next item.'

  - keys: ['ArrowUp'],
    description: ' When focus is on `AComboboxInput`, opens the ACombobox content. <br /> When focus is on an item, moves focus to the previous item.',
  - keys: ['Esc'],
    description: ' Closes ACombobox and restores the selected item in the `AComboboxInput` field.'
---
::

## Custom APIs

Create your own API by abstracting the primitive parts into your own component.

### Command Menu

ACombobox can be use to build your own Command Menu.

#### Usage

```vue
<script setup lang="ts">
import { Command, CommandItem } from './your-command';
</script>

<template>
  <Command>
    <CommandItem value="1">
      Item 1
    </CommandItem>
    <CommandItem value="2">
      Item 2
    </CommandItem>
    <CommandItem value="3">
      Item 3
    </CommandItem>
  </Command>
</template>
```

#### Implementation

```ts
// your-command.ts
export { default as Command } from 'Command.vue';
export { default as CommandItem } from 'CommandItem.vue';
```

```vue
<!-- Command.vue -->
<script setup lang="ts">
import type { AComboboxRootEmits, AComboboxRootProps } from 'akar';
import { AComboboxContent, AComboboxInput, AComboboxPortal, AComboboxRoot, useForwardPropsEmits } from 'akar';

const props = defineProps<AComboboxRootProps>();
const emits = defineEmits<AComboboxRootEmits>();

const forward = useForwardPropsEmits(props, emits);
</script>

<template>
  <AComboboxRoot
    v-bind="forward"
    :open="true"
    model-value=""
  >
    <AComboboxInput placeholder="Type a command or search…" />

    <AComboboxPortal>
      <AComboboxContent
        @escape-key-down.prevent
        @focus-outside.prevent
        @interact-outside.prevent
        @pointer-down-outside.prevent
      >
        <AComboboxViewport>
          <slot />
        </AComboboxViewport>
      </AComboboxContent>
    </AComboboxPortal>
  </AComboboxRoot>
</template>
```

```vue
<!-- AComboboxItem.vue -->
<script setup lang="ts">
import type { AComboboxItemProps } from 'akar';
import { AComboboxItem } from 'akar';

const props = defineProps<AComboboxItemProps>();
</script>

<template>
  <AComboboxItem
    v-bind="props"
    @select.prevent
  >
    <slot />
  </AComboboxItem>
</template>
```
