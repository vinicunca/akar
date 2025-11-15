---
title: CommandPalette
description: A command palette with full-text search powered by Fuse.js for efficient fuzzy matching.
category: navigation
links:
  - label: Fuse.js
    icon: custom-fuse-js
    to: https://fusejs.io/
    target: _blank
  - label: Akar
    to: /docs/akar/components/listbox
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/command-palette.vue
---

## Usage

Use the `v-model` directive to control the value of the CommandPalette or the `default-value` prop to set the initial value when you do not need to control its state.

::docs-pohon-preview
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - modelValue
  - class
external:
  - groups
  - modelValue
class: 'akar:p-0'
props:
  modelValue: {}
  autofocus: false
  groups:
    - id: 'users'
      label: 'Users'
      items:
        - label: 'praburangki'
          suffix: 'praburangki'
          avatar:
            src: 'https://github.com/praburangki.png'
        - label: 'Wahyu Ivan'
          suffix: 'wahyu-ivan'
          avatar:
            src: 'https://github.com/wahyu-ivan.png'
        - label: 'Sébastien Chopin'
          suffix: 'atinux'
          avatar:
            src: 'https://github.com/atinux.png'
        - label: 'Hugo Richard'
          suffix: 'HugoRCD'
          avatar:
            src: 'https://github.com/HugoRCD.png'
        - label: 'Sandro Circi'
          suffix: 'sandros94'
          avatar:
            src: 'https://github.com/sandros94.png'
        - label: 'Daniel Roe'
          suffix: 'danielroe'
          avatar:
            src: 'https://github.com/danielroe.png'
        - label: 'Jakub Michálek'
          suffix: 'J-Michalek'
          avatar:
            src: 'https://github.com/J-Michalek.png'
        - label: 'Eugen Istoc'
          suffix: 'genu'
          avatar:
            src: 'https://github.com/genu.png'
  class: 'flex-1 h-80'
---
::

::tip{to="#control-selected-items"}
You can also use the `@update:model-value` event to listen to the selected item(s).
::

### Groups

The CommandPalette component filters groups and ranks matching commands by relevance as users type. It provides dynamic, instant search results for efficient command discovery. Use the `groups` prop as an array of objects with the following properties:

- `id: string`
- `label?: string`
- `slot?: string`
- `items?: PCommandPaletteItem[]`
- [`ignoreFilter?: boolean`](#with-ignore-filter)
- [`postFilter?: (searchTerm: string, items: T[]) => T[]`](#with-post-filtered-items)
- `highlightedIcon?: string`

::caution
You must provide an `id` for each group otherwise the group will be ignored.
::

Each group contains an `items` array of objects that define the commands. Each item can have the following properties:

- `prefix?: string`
- `label?: string`
- `suffix?: string`
- `icon?: string`
- `avatar?: AvatarProps`
- `chip?: ChipProps`
- `kbds?: string[] | KbdProps[]`
- `active?: boolean`
- `loading?: boolean`
- `disabled?: boolean`
- [`slot?: string`](#with-custom-slot)
- `placeholder?: string`
- `children?: PCommandPaletteItem[]`
- `onSelect?: (e: Event) => void`
- `class?: any`
- `pohon?: { item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLabel?: ClassNameValue, itemLabelPrefix?: ClassNameValue, itemLabelBase?: ClassNameValue, itemLabelSuffix?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingKbds?: ClassNameValue, itemTrailingKbdsSize?: ClassNameValue, itemTrailingHighlightedIcon?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`

You can pass any property from the [Link](/docs/pohon/components/link#props) component such as `to`, `target`, etc.

::docs-pohon-preview
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - modelValue
  - class
external:
  - groups
  - modelValue
class: 'akar:p-0'
props:
  modelValue: {}
  autofocus: false
  groups:
    - id: 'users'
      label: 'Users'
      items:
        - label: 'praburangki'
          suffix: 'praburangki'
          avatar:
            src: 'https://github.com/praburangki.png'
        - label: 'Wahyu Ivan'
          suffix: 'wahyu-ivan'
          avatar:
            src: 'https://github.com/wahyu-ivan.png'
        - label: 'Sébastien Chopin'
          suffix: 'atinux'
          avatar:
            src: 'https://github.com/atinux.png'
        - label: 'Hugo Richard'
          suffix: 'HugoRCD'
          avatar:
            src: 'https://github.com/HugoRCD.png'
        - label: 'Sandro Circi'
          suffix: 'sandros94'
          avatar:
            src: 'https://github.com/sandros94.png'
        - label: 'Daniel Roe'
          suffix: 'danielroe'
          avatar:
            src: 'https://github.com/danielroe.png'
        - label: 'Jakub Michálek'
          suffix: 'J-Michalek'
          avatar:
            src: 'https://github.com/J-Michalek.png'
        - label: 'Eugen Istoc'
          suffix: 'genu'
          avatar:
            src: 'https://github.com/genu.png'
  class: 'flex-1'
---
::

::tip{to="#with-children-in-items"}
Each item can take a `children` array of objects with the following properties to create submenus:
::

### Multiple

Use the `multiple` prop to allow multiple selections.

::docs-pohon-preview
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - modelValue
  - multiple
  - class
external:
  - groups
  - modelValue
class: 'akar:p-0'
props:
  multiple: true
  autofocus: false
  modelValue: []
  groups:
    - id: 'users'
      label: 'Users'
      items:
        - label: 'praburangki'
          suffix: 'praburangki'
          avatar:
            src: 'https://github.com/praburangki.png'
        - label: 'Wahyu Ivan'
          suffix: 'wahyu-ivan'
          avatar:
            src: 'https://github.com/wahyu-ivan.png'
        - label: 'Sébastien Chopin'
          suffix: 'atinux'
          avatar:
            src: 'https://github.com/atinux.png'
        - label: 'Hugo Richard'
          suffix: 'HugoRCD'
          avatar:
            src: 'https://github.com/HugoRCD.png'
        - label: 'Sandro Circi'
          suffix: 'sandros94'
          avatar:
            src: 'https://github.com/sandros94.png'
        - label: 'Daniel Roe'
          suffix: 'danielroe'
          avatar:
            src: 'https://github.com/danielroe.png'
        - label: 'Jakub Michálek'
          suffix: 'J-Michalek'
          avatar:
            src: 'https://github.com/J-Michalek.png'
        - label: 'Eugen Istoc'
          suffix: 'genu'
          avatar:
            src: 'https://github.com/genu.png'
  class: 'flex-1'
---
::

::caution
Ensure to pass an array to the `default-value` prop or the `v-model` directive.
::

### Placeholder

Use the `placeholder` prop to change the placeholder text.

::docs-pohon-preview
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
external:
  - groups
class: 'akar:p-0'
props:
  autofocus: false
  placeholder: 'Search an app...'
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
          icon: 'i-lucide:calendar'
        - label: 'Music'
          icon: 'i-lucide:music'
        - label: 'Maps'
          icon: 'i-lucide:map'
  class: 'flex-1'
---
::

### Icon

Use the `icon` prop to customize the input [Icon](/docs/pohon/components/icon). Defaults to `i-lucide:search`.

::docs-pohon-preview
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
external:
  - groups
class: 'akar:p-0'
props:
  autofocus: false
  icon: 'i-lucide:box'
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
          icon: 'i-lucide:calendar'
        - label: 'Music'
          icon: 'i-lucide:music'
        - label: 'Maps'
          icon: 'i-lucide:map'
  class: 'flex-1'
---
::

::docs-framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `pohon.icons.search` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `pohon.icons.search` key.
:::
::

### Selected Icon

Use the `selected-icon` prop to customize the selected item [Icon](/docs/pohon/components/icon). Defaults to `i-lucide:check`.

::docs-pohon-preview
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - modelValue
  - multiple
  - class
external:
  - groups
  - modelValue
class: 'akar:p-0'
props:
  multiple: true
  autofocus: false
  modelValue:
    - label: 'praburangki'
      suffix: 'praburangki'
      avatar:
        src: 'https://github.com/praburangki.png'
  selectedIcon: 'i-lucide:circle-check'
  groups:
    - id: 'users'
      label: 'Users'
      items:
        - label: 'praburangki'
          suffix: 'praburangki'
          avatar:
            src: 'https://github.com/praburangki.png'
        - label: 'Wahyu Ivan'
          suffix: 'wahyu-ivan'
          avatar:
            src: 'https://github.com/wahyu-ivan.png'
        - label: 'Sébastien Chopin'
          suffix: 'atinux'
          avatar:
            src: 'https://github.com/atinux.png'
        - label: 'Hugo Richard'
          suffix: 'HugoRCD'
          avatar:
            src: 'https://github.com/HugoRCD.png'
        - label: 'Sandro Circi'
          suffix: 'sandros94'
          avatar:
            src: 'https://github.com/sandros94.png'
        - label: 'Daniel Roe'
          suffix: 'danielroe'
          avatar:
            src: 'https://github.com/danielroe.png'
        - label: 'Jakub Michálek'
          suffix: 'J-Michalek'
          avatar:
            src: 'https://github.com/J-Michalek.png'
        - label: 'Eugen Istoc'
          suffix: 'genu'
          avatar:
            src: 'https://github.com/genu.png'
  class: 'flex-1'
---
::

::docs-framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `pohon.icons.check` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `pohon.icons.check` key.
:::
::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [Icon](/docs/pohon/components/icon) when an item has children. Defaults to `i-lucide:chevron-right`.

::docs-pohon-preview
---
collapse: true
prettier: true
hide:
  - autofocus
ignore:
  - groups
  - class
external:
  - groups
class: 'akar:p-0'
props:
  autofocus: false
  trailingIcon: 'i-lucide:arrow-right'
  groups:
    - id: 'actions'
      items:
        - label: 'Share'
          icon: 'i-lucide:share'
          children:
            - label: 'Email'
              icon: 'i-lucide:mail'
            - label: 'Copy'
              icon: 'i-lucide:copy'
            - label: 'Link'
              icon: 'i-lucide:link'
  class: 'flex-1'
---
::

::docs-framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `pohon.icons.chevronRight` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `pohon.icons.chevronRight` key.
:::
::

### Loading

Use the `loading` prop to show a loading icon on the CommandPalette.

::docs-pohon-preview
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
external:
  - groups
class: 'akar:p-0'
props:
  autofocus: false
  loading: true
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
          icon: 'i-lucide:calendar'
        - label: 'Music'
          icon: 'i-lucide:music'
        - label: 'Maps'
          icon: 'i-lucide:map'
  class: 'flex-1'
---
::

### Loading Icon

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide:loader-circle`.

::docs-pohon-preview
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
external:
  - groups
class: 'akar:p-0'
props:
  autofocus: false
  loading: true
  loadingIcon: 'i-lucide:loader'
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
          icon: 'i-lucide:calendar'
        - label: 'Music'
          icon: 'i-lucide:music'
        - label: 'Maps'
          icon: 'i-lucide:map'
  class: 'flex-1'
---
::

::docs-framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `pohon.icons.loading` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `pohon.icons.loading` key.
:::
::

### Close

Use the `close` prop to display a [Button](/docs/pohon/components/button) to dismiss the CommandPalette.

::tip
An `update:open` event will be emitted when the close button is clicked.
::

::docs-pohon-preview
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
  - close
external:
  - groups
class: 'akar:p-0'
props:
  autofocus: false
  close: true
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
          icon: 'i-lucide:calendar'
        - label: 'Music'
          icon: 'i-lucide:music'
        - label: 'Maps'
          icon: 'i-lucide:map'
  class: 'flex-1'
---
::

You can pass any property from the [Button](/docs/pohon/components/button) component to customize it.

::docs-pohon-preview
---
collapse: true
prettier: true
hide:
  - autofocus
ignore:
  - close.color
  - close.variant
  - groups
  - class
external:
  - groups
class: 'akar:p-0'
props:
  autofocus: false
  close:
    color: primary
    variant: outline
    class: 'rounded-full'
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
          icon: 'i-lucide:calendar'
        - label: 'Music'
          icon: 'i-lucide:music'
        - label: 'Maps'
          icon: 'i-lucide:map'
  class: 'flex-1'
---
::

### Close Icon

Use the `close-icon` prop to customize the close button [Icon](/docs/pohon/components/icon). Defaults to `i-lucide:x`.

::docs-pohon-preview
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
  - close
external:
  - groups
class: 'akar:p-0'
props:
  autofocus: false
  close: true
  closeIcon: 'i-lucide:arrow-right'
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
          icon: 'i-lucide:calendar'
        - label: 'Music'
          icon: 'i-lucide:music'
        - label: 'Maps'
          icon: 'i-lucide:map'
  class: 'flex-1'
---
::

::docs-framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `pohon.icons.close` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `pohon.icons.close` key.
:::
::

### Back

Use the `back` prop to customize or hide the back button (with `false` value) displayed when navigating into a submenu.

You can pass any property from the [Button](/docs/pohon/components/button) component to customize it.

::docs-pohon-preview
---
collapse: true
prettier: true
hide:
  - autofocus
ignore:
  - back.color
  - groups
  - class
external:
  - groups
class: 'akar:p-0'
props:
  autofocus: false
  back:
    color: primary
  groups:
    - id: 'actions'
      items:
        - label: 'Share'
          icon: 'i-lucide:share'
          children:
            - label: 'Email'
              icon: 'i-lucide:mail'
            - label: 'Copy'
              icon: 'i-lucide:copy'
            - label: 'Link'
              icon: 'i-lucide:link'
  class: 'flex-1'
---
::

### Back Icon

Use the `back-icon` prop to customize the back button [Icon](/docs/pohon/components/icon). Defaults to `i-lucide:arrow-left`.

::docs-pohon-preview
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
  - back
external:
  - groups
class: 'akar:p-0'
props:
  autofocus: false
  back: true
  backIcon: 'i-lucide:house'
  groups:
    - id: 'actions'
      items:
        - label: 'Share'
          icon: 'i-lucide:share'
          children:
            - label: 'Email'
              icon: 'i-lucide:mail'
            - label: 'Copy'
              icon: 'i-lucide:copy'
            - label: 'Link'
              icon: 'i-lucide:link'
  class: 'flex-1'
---
::

::docs-framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `pohon.icons.arrowLeft` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `pohon.icons.arrowLeft` key.
:::
::

### Disabled

Use the `disabled` prop to disable the CommandPalette.

::docs-pohon-preview
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - class
external:
  - groups
class: 'akar:p-0'
props:
  autofocus: false
  disabled: true
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
          icon: 'i-lucide:calendar'
        - label: 'Music'
          icon: 'i-lucide:music'
        - label: 'Maps'
          icon: 'i-lucide:map'
  class: 'flex-1'
---
::

## Examples

### Control selected item(s)

You can control the selected item(s) by using the `default-value` prop or the `v-model` directive, by using the `onSelect` field on each item or by using the `@update:model-value` event.

::docs-component-example
---
collapse: true
name: 'command-palette-select-example'
class: 'akar:p-0'
props:
  autofocus: false
---
::

### Control search term

Use the `v-model:search-term` directive to control the search term.

::docs-component-example
---
collapse: true
name: 'command-palette-search-term-example'
class: 'akar:p-0'
props:
  autofocus: false
---
::

::note
This example uses the `@update:model-value` event to reset the search term when an item is selected.
::

### With children in items

You can create hierarchical menus by using the `children` property in items. When an item has children, it will automatically display a chevron icon and enable navigation into a submenu.

::docs-component-example
---
collapse: true
prettier: true
name: 'command-palette-items-children-example'
class: 'akar:p-0'
props:
  autofocus: false
---
::

::note
When navigating into a submenu:
- The search term is reset
- A back button appears in the input
- You can go back to the previous group by pressing the :kbd{value="backspace"} key
::

### With fetched items

You can fetch items from an API and use them in the CommandPalette.

::docs-component-example
---
collapse: true
name: 'command-palette-fetch-example'
class: 'akar:p-0'
props:
  autofocus: false
---
::

### With ignore filter

You can set the `ignoreFilter` field to `true` on a group to disable the internal search and use your own search logic.

::docs-component-example
---
collapse: true
name: 'command-palette-ignore-filter-example'
class: 'akar:p-0'
props:
  autofocus: false
---
::

::note
This example uses [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced) to debounce the API calls.
::

### With post-filtered items

You can use the `postFilter` field on a group to filter items after the search happened.

::docs-component-example
---
collapse: true
name: 'command-palette-post-filter-example'
class: 'akar:p-0'
props:
  autofocus: false
---
::

::note
Start typing to see items with higher level appear.
::

### With custom fuse search

You can use the `fuse` prop to override the options of [useFuse](https://vueuse.org/integrations/useFuse) which defaults to:

```ts
{
  fuseOptions: {
    ignoreLocation: true,
    threshold: 0.1,
    keys: ['label', 'suffix']
  },
  resultLimit: 12,
  matchAllWhenSearchEmpty: true
}
```

::tip
The `fuseOptions` are the options of [Fuse.js](https://www.fusejs.io/api/options.html), the `resultLimit` is the maximum number of results to return and the `matchAllWhenSearchEmpty` is a boolean to match all items when the search term is empty.
::

You can for example set `{ fuseOptions: { includeMatches: true } }` to highlight the search term in the items.

::docs-component-example
---
collapse: true
name: 'command-palette-fuse-example'
class: 'akar:p-0'
props:
  autofocus: false
---
::

### With virtualization

Use the `virtualize` prop to enable virtualization for large lists as a boolean or an object with options like `{ estimateSize: 32, overscan: 12 }`.
When enabled, all groups are flattened into a single list due to a limitation of Akar.

::docs-component-example
---
collapse: true
name: 'command-palette-virtualize-example'
class: 'akar:p-0'
props:
  autofocus: false
---
::

### Within a Popover

You can use the CommandPalette component inside a [Popover](/docs/pohon/components/popover)'s content.

::docs-component-example
---
collapse: true
name: 'popover-command-palette-example'
props:
  autofocus: false
---
::

### Within a Modal

You can use the CommandPalette component inside a [Modal](/docs/pohon/components/dialog)'s content.

::docs-component-example
---
collapse: true
name: 'modal-command-palette-example'
props:
  autofocus: false
---
::

### Within a Drawer

You can use the CommandPalette component inside a [Drawer](/docs/pohon/components/drawer)'s content.

::docs-component-example
---
collapse: true
name: 'drawer-command-palette-example'
props:
  autofocus: false
---
::

### Listen open state

When using the `close` prop, you can listen to the `update:open` event when the button is clicked.

::docs-component-example
---
collapse: true
name: 'command-palette-open-example'
props:
  autofocus: false
---
::

::note
This can be useful when using the CommandPalette inside a [`Modal`](/docs/pohon/components/dialog) for example.
::

### With footer slot

Use the `#footer` slot to add custom content at the bottom of the CommandPalette, such as keyboard shortcuts help or additional actions.

::docs-component-example
---
collapse: true
name: 'command-palette-footer-slot-example'
class: 'akar:p-0'
props:
  autofocus: false
---
::

### With custom slot

Use the `slot` property to customize a specific item or group.

You will have access to the following slots:

- `#{{ item.slot }}`
- `#{{ item.slot }}-leading`
- `#{{ item.slot }}-label`
- `#{{ item.slot }}-trailing`

- `#{{ group.slot }}`
- `#{{ group.slot }}-leading`
- `#{{ group.slot }}-label`
- `#{{ group.slot }}-trailing`

::docs-component-example
---
collapse: true
name: 'command-palette-custom-slot-example'
class: 'akar:p-0'
props:
  autofocus: false
---
::

::tip{to="#slots"}
You can also use the `#item`, `#item-leading`, `#item-label` and `#item-trailing` slots to customize all items.
::

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

### Emits

:docs-pohon-emits

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
