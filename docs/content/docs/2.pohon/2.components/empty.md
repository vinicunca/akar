---
title: Empty
description: 'A component to display an empty state.'
category: data
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/empty.vue
---

## Usage

::code-preview

:::p-empty
---
icon: i-lucide:file
title: No projects found
description: It looks like you haven't added any projects. Create one to get started.
actions:
  - icon: i-lucide:plus
    label: Create new
  - icon: i-lucide:refresh-cw
    label: Refresh
    color: neutral
    variant: subtle
---
:::

::

### Title

Use the `title` prop to set the title of the empty state.

::docs-pohon-preview
---
props:
  title: No projects found
---
::

### Description

Use the `description` prop to set the description of the empty state.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
props:
  title: No projects found
  description: It looks like you haven't added any projects. Create one to get started.
---
::

### Icon

Use the `icon` prop to set the icon of the empty state.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - description
props:
  icon: i-lucide:file
  title: No projects found
  description: It looks like you haven't added any projects. Create one to get started.
---
::

### Avatar

Use the `avatar` prop to set the avatar of the empty state.

::docs-pohon-preview
---
prettier: true
ignore:
  - icon
  - title
  - description
props:
  avatar.src: 'https://github.com/nuxt.png'
  title: No projects found
  description: It looks like you haven't added any projects. Create one to get started.
---
::

### Actions

Use the `actions` prop to add some [Button](/docs/pohon/components/button) actions to the empty state.

::docs-pohon-preview
---
prettier: true
ignore:
  - icon
  - title
  - description
  - actions
props:
  icon: i-lucide:file
  title: No projects found
  description: It looks like you haven't added any projects. Create one to get started.
  actions:
    - icon: i-lucide:plus
      label: Create new
    - icon: i-lucide:refresh-cw
      label: Refresh
      color: neutral
      variant: subtle
---
::

### Variant

Use the `variant` prop to change the variant of the empty state.

::docs-pohon-preview
---
prettier: true
ignore:
  - icon
  - title
  - description
  - actions
props:
  variant: naked
  icon: i-lucide:bell
  title: No notifications
  description: You're all caught up. New notifications will appear here.
  actions:
    - icon: i-lucide:refresh-cw
      label: Refresh
      color: neutral
      variant: subtle
---
::

### Size

Use the `size` prop to change the size of the empty state.

::docs-pohon-preview
---
prettier: true
ignore:
  - icon
  - title
  - description
  - actions
props:
  size: xl
  icon: i-lucide:bell
  title: No notifications
  description: You're all caught up. New notifications will appear here.
  actions:
    - icon: i-lucide:refresh-cw
      label: Refresh
      color: neutral
      variant: subtle
---
::

## Examples

### With slots

Use the available slots to create a more complex empty state.

::docs-component-example
---
collapse: true
name: 'empty-slots-example'
---
::

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
