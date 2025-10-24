---
title: InputMenu
description: An autocomplete input with real-time suggestions.
category: form
links:
  - label: Combobox
    icon: i-custom-akar
    to: https://akar.com/docs/components/combobox
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/nuxt/ui/blob/v4/src/runtime/components/InputMenu.vue
---

## Usage

Use the `v-model` directive to control the value of the InputMenu or the `default-value` prop to set the initial value when you do not need to control its state.

::docs-pohon-preview
---
prettier: true
ignore:
  - modelValue
  - items
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

::tip
Use this over an [`Input`](/docs/components/input) to take advantage of Reka UI's [`Combobox`](https://akar.com/docs/components/combobox) component that offers autocomplete capabilities.
::

::note
This component is similar to the [`SelectMenu`](/docs/components/select-menu) but it's using an Input instead of a Select.
::

### Items

Use the `items` prop as an array of strings, numbers or booleans:

::docs-pohon-preview
---
prettier: true
ignore:
  - modelValue
  - items
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

You can also pass an array of objects with the following properties:

- `label?: string`{lang="ts-type"}
- [`type?: "label" | "separator" | "item"`{lang="ts-type"}](#with-items-type)
- [`icon?: string`{lang="ts-type"}](#with-icons-in-items)
- [`avatar?: AvatarProps`{lang="ts-type"}](#with-avatar-in-items)
- [`chip?: ChipProps`{lang="ts-type"}](#with-chip-in-items)
- `disabled?: boolean`{lang="ts-type"}
- `onSelect?: (e: Event) => void`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `ui?: { tagsItem?: ClassNameValue, tagsItemText?: ClassNameValue, tagsItemDelete?: ClassNameValue, tagsItemDeleteIcon?: ClassNameValue, label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{lang="ts-type"}

::docs-pohon-preview
---
ignore:
  - modelValue.label
  - items
external:
  - items
  - modelValue
externalTypes:
  - InputMenuItem[]
props:
  modelValue:
    label: 'Todo'
  items:
    - label: 'Backlog'
    - label: 'Todo'
    - label: 'In Progress'
    - label: 'Done'
---
::

You can also pass an array of arrays to the `items` prop to display separated groups of items.

::docs-pohon-preview
---
prettier: true
ignore:
  - modelValue
  - items
external:
  - items
  - modelValue
props:
  modelValue: 'Apple'
  items:
    - - Apple
      - Banana
      - Blueberry
      - Grapes
      - Pineapple
    - - Aubergine
      - Broccoli
      - Carrot
      - Courgette
      - Leek
---
::

### Value Key

You can choose to bind a single property of the object rather than the whole object by using the `value-key` prop. Defaults to `undefined`.

::docs-pohon-preview
---
collapse: true
ignore:
  - modelValue
  - valueKey
  - items
external:
  - items
  - modelValue
externalTypes:
  - InputMenuItem[]
props:
  modelValue: 'todo'
  valueKey: 'id'
  items:
    - label: 'Backlog'
      id: 'backlog'
    - label: 'Todo'
      id: 'todo'
    - label: 'In Progress'
      id: 'in_progress'
    - label: 'Done'
      id: 'done'
---
::

### Multiple

Use the `multiple` prop to allow multiple selections, the selected items will be displayed as tags.

::docs-pohon-preview
---
prettier: true
ignore:
  - modelValue
  - items
  - multiple
external:
  - items
  - modelValue
props:
  modelValue:
    - Backlog
    - Todo
  multiple: true
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

::caution
Ensure to pass an array to the `default-value` prop or the `v-model` directive.
::

### Delete Icon

With `multiple`, use the `delete-icon` prop to customize the delete [Icon](/docs/components/icon) in the tags. Defaults to `i-lucide-x`.

::docs-pohon-preview
---
prettier: true
ignore:
  - modelValue
  - items
  - multiple
external:
  - items
  - modelValue
props:
  modelValue:
    - Backlog
    - Todo
  multiple: true
  deleteIcon: 'i-lucide-trash'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

::framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `ui.icons.close` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `ui.icons.close` key.
:::
::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
external:
  - items
props:
  placeholder: 'Select status'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

### Content

Use the `content` prop to control how the InputMenu content is rendered, like its `align` or `side` for example.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - modelValue
external:
  - items
  - modelValue
items:
  content.align:
    - start
    - center
    - end
  content.side:
    - right
    - left
    - top
    - bottom
props:
  modelValue: 'Backlog'
  content:
    align: center
    side: bottom
    sideOffset: 8
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

### Arrow

Use the `arrow` prop to display an arrow on the InputMenu.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - modelValue
  - arrow
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  arrow: true
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

### Color

Use the `color` prop to change the ring color when the InputMenu is focused.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - modelValue
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  color: neutral
  highlight: true
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Variant

Use the `variant` prop to change the variant of the InputMenu.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - modelValue
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  color: neutral
  variant: subtle
  highlight: false
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

### Size

Use the `size` prop to change the size of the InputMenu.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - modelValue
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  size: xl
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

### Icon

Use the `icon` prop to show an [Icon](/docs/components/icon) inside the InputMenu.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - modelValue
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  icon: 'i-lucide-search'
  size: md
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [Icon](/docs/components/icon). Defaults to `i-lucide-chevron-down`.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - modelValue
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  trailingIcon: 'i-lucide-arrow-down'
  size: md
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

::framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `ui.icons.chevronDown` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `ui.icons.chevronDown` key.
:::
::

### Selected Icon

Use the `selected-icon` prop to customize the icon when an item is selected. Defaults to `i-lucide-check`.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - modelValue
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  selectedIcon: 'i-lucide-flame'
  size: md
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

::framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `ui.icons.check` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `ui.icons.check` key.
:::
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/components/avatar) inside the InputMenu.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - modelValue
external:
  - items
  - modelValue
props:
  modelValue: 'Nuxt'
  avatar:
    src: 'https://github.com/nuxt.png'
  items:
    - Nuxt
    - NuxtHub
    - NuxtLabs
    - Nuxt Modules
    - Nuxt Community
---
::

### Loading

Use the `loading` prop to show a loading icon on the InputMenu.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - modelValue
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  loading: true
  trailing: false
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

### Loading Icon

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide-loader-circle`.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - modelValue
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  loading: true
  loadingIcon: 'i-lucide-loader'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

::framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `ui.icons.loading` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `ui.icons.loading` key.
:::
::

### Disabled

Use the `disabled` prop to disable the InputMenu.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - placeholder
external:
  - items
props:
  disabled: true
  placeholder: 'Select status'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

## Examples

### With items type

You can use the `type` property with `separator` to display a separator between items or `label` to display a label.

::docs-pohon-preview
---
collapse: true
ignore:
  - modelValue
  - items
external:
  - items
  - modelValue
externalTypes:
  - InputMenuItem[]
props:
  modelValue: 'Apple'
  items:
    - type: 'label'
      label: 'Fruits'
    - Apple
    - Banana
    - Blueberry
    - Grapes
    - Pineapple
    - type: 'separator'
    - type: 'label'
      label: 'Vegetables'
    - Aubergine
    - Broccoli
    - Carrot
    - Courgette
    - Leek
---
::

### With icon in items

You can use the `icon` property to display an [Icon](/docs/components/icon) inside the items.

::component-example
---
collapse: true
name: 'input-menu-items-icon-example'
---
::

::tip
You can also use the `#leading` slot to display the selected icon.
::

### With avatar in items

You can use the `avatar` property to display an [Avatar](/docs/components/avatar) inside the items.

::component-example
---
collapse: true
name: 'input-menu-items-avatar-example'
---
::

::tip
You can also use the `#leading` slot to display the selected avatar.
::

### With chip in items

You can use the `chip` property to display a [Chip](/docs/components/chip) inside the items.

::component-example
---
collapse: true
name: 'input-menu-items-chip-example'
---
::

::note
In this example, the `#leading` slot is used to display the selected chip.
::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::component-example
---
name: 'input-menu-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts), you can toggle the InputMenu by pressing :kbd{value="O"}.
::

### Control open state on focus

You can use the `open-on-focus` or `open-on-click` props to open the menu when the input is focused or clicked.

::component-example
---
name: 'input-menu-open-focus-example'
---
::

### Control search term

Use the `v-model:search-term` directive to control the search term.

::component-example
---
name: 'input-menu-search-term-example'
---
::

### With rotating icon

Here is an example with a rotating icon that indicates the open state of the InputMenu.

::component-example
---
name: 'input-menu-icon-example'
---
::

### With create item

Use the `create-item` prop to enable users to add custom values that aren't in the predefined options.

::component-example
---
collapse: true
name: 'input-menu-create-item-example'
---
::

::note
The create option shows when no match is found by default. Set it to `always` to show it even when similar values exist.
::

::tip{to="#emits"}
Use the `@create` event to handle the creation of the item. You will receive the event and the item as arguments.
::

### With fetched items

You can fetch items from an API and use them in the InputMenu.

::component-example
---
collapse: true
name: 'input-menu-fetch-example'
---
::

### With ignore filter

Set the `ignore-filter` prop to `true` to disable the internal search and use your own search logic.

::component-example
---
collapse: true
name: 'input-menu-ignore-filter-example'
---
::

::note
This example uses [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced) to debounce the API calls.
::

### With filter fields

Use the `filter-fields` prop with an array of fields to filter on. Defaults to `[labelKey]`.

::component-example
---
collapse: true
name: 'input-menu-filter-fields-example'
---
::

### With virtualization :badge{label="Soon"}

Use the `virtualize` prop to enable virtualization for large lists as a boolean or an object with options like `{ estimateSize: 32, overscan: 12 }`.

::warning{to="https://github.com/unovue/akar/issues/1885" target="_blank"}
When enabled, all groups are flattened into a single list due to a limitation of Reka UI.
::

::component-example
---
prettier: true
name: 'input-menu-virtualize-example'
---
::

### With full content width

You can expand the content to the full width of its items by adding the `min-w-fit` class on the `ui.content` slot.

::component-example
---
name: 'input-menu-content-width-example'
collapse: true
---
::

::tip
You can also change the content width globally in your `app.config.ts`:

```
export default defineAppConfig({
  ui: {
    inputMenu: {
      slots: {
        content: 'min-w-fit'
      }
    }
  }
})
```
::

### As a CountryPicker

This example demonstrates using the InputMenu as a country picker with lazy loading - countries are only fetched when the menu is opened.

::component-example
---
collapse: true
name: 'input-menu-countries-example'
---
::

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

### Expose

When accessing the component via a template ref, you can use the following:

| Name | Type |
| ---- | ---- |
| `inputRef`{lang="ts-type"} | `Ref<InstanceType<typeof ComboboxTrigger> \| null>`{lang="ts-type"} |

## Theme

:component-theme

## Changelog

:component-changelog
