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
    icon: i-simple-icons-github
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
