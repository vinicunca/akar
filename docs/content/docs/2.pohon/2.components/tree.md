---
description: A tree view component to display and interact with hierarchical data structures.
category: data
links:
  - label: Tree
    to: /docs/akar/components/tree
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/tree.vue
---

## Usage

Use the Tree component to display a hierarchical structure of items.

::docs-pohon-preview
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
props:
  items:
    - label: 'app/'
      defaultExpanded: true
      children:
        - label: 'composables/'
          children:
            - label: 'useAuth.ts'
              icon: 'i-vscode-icons:file-type-typescript'
            - label: 'useUser.ts'
              icon: 'i-vscode-icons:file-type-typescript'
        - label: 'components/'
          defaultExpanded: true
          children:
            - label: 'Card.vue'
              icon: 'i-vscode-icons:file-type-vue'
            - label: 'Button.vue'
              icon: 'i-vscode-icons:file-type-vue'
    - label: 'app.vue'
      icon: 'i-vscode-icons:file-type-vue'
    - label: 'nuxt.config.ts'
      icon: 'i-vscode-icons:file-type-nuxt'
  class: 'w-60'
---
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `icon?: string`
- `label?: string`
- `trailingIcon?: string`
- `defaultExpanded?: boolean`
- `disabled?: boolean`
- `slot?: string`
- `children?: TreeItem[]`
- `onToggle?: (e: TreeItemToggleEvent<TreeItem>) => void`
- `onSelect?: (e: TreeItemSelectEvent<TreeItem>) => void`
- `class?: any`
- `pohon?: { item?: ClassNameValue, itemWithChildren?: ClassNameValue, link?: ClassNameValue, linkLeadingIcon?: ClassNameValue, linkLabel?: ClassNameValue, linkTrailing?: ClassNameValue, linkTrailingIcon?: ClassNameValue, listWithChildren?: ClassNameValue }`

::note
A unique identifier is required for each item. The component will use the `label` prop as identifier if no `get-key` is provided. Ideally you should provide a `get-key` function prop to return a unique identifier. Alternatively, you can use the `labelKey` prop to specify which property to use as the unique identifier.
::

::docs-pohon-preview
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - TreeItem[]
props:
  items:
    - label: 'app/'
      defaultExpanded: true
      children:
        - label: 'composables/'
          children:
            - label: 'useAuth.ts'
              icon: 'i-vscode-icons:file-type-typescript'
            - label: 'useUser.ts'
              icon: 'i-vscode-icons:file-type-typescript'
        - label: 'components/'
          defaultExpanded: true
          children:
            - label: 'Card.vue'
              icon: 'i-vscode-icons:file-type-vue'
            - label: 'Button.vue'
              icon: 'i-vscode-icons:file-type-vue'
    - label: 'app.vue'
      icon: 'i-vscode-icons:file-type-vue'
    - label: 'nuxt.config.ts'
      icon: 'i-vscode-icons:file-type-nuxt'
  class: 'w-60'
---
::

### Multiple

Use the `multiple` prop to allow multiple item selections.

::docs-pohon-preview
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - TreeItem[]
props:
  multiple: true
  items:
    - label: 'app/'
      defaultExpanded: true
      children:
        - label: 'composables/'
          children:
            - label: 'useAuth.ts'
              icon: 'i-vscode-icons:file-type-typescript'
            - label: 'useUser.ts'
              icon: 'i-vscode-icons:file-type-typescript'
        - label: 'components/'
          defaultExpanded: true
          children:
            - label: 'Card.vue'
              icon: 'i-vscode-icons:file-type-vue'
            - label: 'Button.vue'
              icon: 'i-vscode-icons:file-type-vue'
    - label: 'app.vue'
      icon: 'i-vscode-icons:file-type-vue'
    - label: 'nuxt.config.ts'
      icon: 'i-vscode-icons:file-type-nuxt'
  class: 'w-60'
---
::

### Nested

Use the `nested` prop to control whether the Tree is rendered with nested structure or as a flat list. Defaults to `true`.

::docs-pohon-preview
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - TreeItem[]
props:
  nested: false
  items:
    - label: 'app/'
      defaultExpanded: true
      children:
        - label: 'composables/'
          children:
            - label: 'useAuth.ts'
              icon: 'i-vscode-icons:file-type-typescript'
            - label: 'useUser.ts'
              icon: 'i-vscode-icons:file-type-typescript'
        - label: 'components/'
          defaultExpanded: true
          children:
            - label: 'Card.vue'
              icon: 'i-vscode-icons:file-type-vue'
            - label: 'Button.vue'
              icon: 'i-vscode-icons:file-type-vue'
    - label: 'app.vue'
      icon: 'i-vscode-icons:file-type-vue'
    - label: 'nuxt.config.ts'
      icon: 'i-vscode-icons:file-type-nuxt'
  class: 'w-60'
---
::

::note{to="#with-virtualization"}
When `nested` is `false`, all items are rendered at the same level with indentation to indicate hierarchy. This is useful for virtualization or drag and drop functionality.
::

### Color

Use the `color` prop to change the color of the Tree.

::docs-pohon-preview
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - TreeItem[]
props:
  color: neutral
  items:
    - label: 'app/'
      defaultExpanded: true
      children:
        - label: 'composables/'
          children:
            - label: 'useAuth.ts'
              icon: 'i-vscode-icons:file-type-typescript'
            - label: 'useUser.ts'
              icon: 'i-vscode-icons:file-type-typescript'
        - label: 'components/'
          defaultExpanded: true
          children:
            - label: 'Card.vue'
              icon: 'i-vscode-icons:file-type-vue'
            - label: 'Button.vue'
              icon: 'i-vscode-icons:file-type-vue'
    - label: 'app.vue'
      icon: 'i-vscode-icons:file-type-vue'
    - label: 'nuxt.config.ts'
      icon: 'i-vscode-icons:file-type-nuxt'
  class: 'w-60'
---
::

### Size

Use the `size` prop to change the size of the Tree.

::docs-pohon-preview
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - TreeItem[]
props:
  size: xl
  items:
    - label: 'app/'
      defaultExpanded: true
      children:
        - label: 'composables/'
          children:
            - label: 'useAuth.ts'
              icon: 'i-vscode-icons:file-type-typescript'
            - label: 'useUser.ts'
              icon: 'i-vscode-icons:file-type-typescript'
        - label: 'components/'
          defaultExpanded: true
          children:
            - label: 'Card.vue'
              icon: 'i-vscode-icons:file-type-vue'
            - label: 'Button.vue'
              icon: 'i-vscode-icons:file-type-vue'
    - label: 'app.vue'
      icon: 'i-vscode-icons:file-type-vue'
    - label: 'nuxt.config.ts'
      icon: 'i-vscode-icons:file-type-nuxt'
  class: 'w-60'
---
::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [Icon](/docs/pohon/components/icon) of a parent node. Defaults to `i-lucide:chevron-down`.

::note
If an icon is specified for an item, it will always take precedence over these props.
::

::docs-pohon-preview
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - TreeItem[]
props:
  trailingIcon: 'i-lucide:arrow-down'
  items:
    - label: 'app/'
      defaultExpanded: true
      children:
        - label: 'composables/'
          trailingIcon: 'i-lucide:chevron-down'
          children:
            - label: 'useAuth.ts'
              icon: 'i-vscode-icons:file-type-typescript'
            - label: 'useUser.ts'
              icon: 'i-vscode-icons:file-type-typescript'
        - label: 'components/'
          defaultExpanded: true
          children:
            - label: 'Card.vue'
              icon: 'i-vscode-icons:file-type-vue'
            - label: 'Button.vue'
              icon: 'i-vscode-icons:file-type-vue'
    - label: 'app.vue'
      icon: 'i-vscode-icons:file-type-vue'
    - label: 'nuxt.config.ts'
      icon: 'i-vscode-icons:file-type-nuxt'
  class: 'w-60'
---
::

::docs-framework-only
#nuxt
:::tip{to="/docs/pohon/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `pohon.icons.chevronDown` key.
:::

#vue
:::tip{to="/docs/pohon/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `pohon.icons.chevronDown` key.
:::
::

### Expanded Icon

Use the `expanded-icon` and `collapsed-icon` props to customize the icons of a parent node when it is expanded or collapsed. Defaults to `i-lucide:folder-open` and `i-lucide:folder` respectively.

::docs-pohon-preview
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - TreeItem[]
props:
  expandedIcon: 'i-lucide:book-open'
  collapsedIcon: 'i-lucide:book'
  items:
    - label: 'app/'
      defaultExpanded: true
      children:
        - label: 'composables/'
          children:
            - label: 'useAuth.ts'
              icon: 'i-vscode-icons:file-type-typescript'
            - label: 'useUser.ts'
              icon: 'i-vscode-icons:file-type-typescript'
        - label: 'components/'
          defaultExpanded: true
          children:
            - label: 'Card.vue'
              icon: 'i-vscode-icons:file-type-vue'
            - label: 'Button.vue'
              icon: 'i-vscode-icons:file-type-vue'
    - label: 'app.vue'
      icon: 'i-vscode-icons:file-type-vue'
    - label: 'nuxt.config.ts'
      icon: 'i-vscode-icons:file-type-nuxt'
  class: 'w-60'
---
::

::docs-framework-only
#nuxt
:::tip{to="/docs/pohon/getting-started/integrations/icons/nuxt#theme"}
You can customize these icons globally in your `app.config.ts` under `pohon.icons.folder` and `pohon.icons.folderOpen` keys.
:::

#vue
:::tip{to="/docs/pohon/getting-started/integrations/icons/vue#theme"}
You can customize these icons globally in your `vite.config.ts` under `pohon.icons.folder` and `pohon.icons.folderOpen` keys.
:::
::

### Disabled

Use the `disabled` prop to prevent any user interaction with the Tree.

::docs-pohon-preview
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - TreeItem[]
props:
  disabled: true
  items:
    - label: 'app'
      icon: 'i-lucide:folder'
      defaultExpanded: true
      children:
        - label: 'composables'
          icon: 'i-lucide:folder'
          children:
            - label: 'useAuth.ts'
              icon: 'i-vscode-icons:file-type-typescript'
            - label: 'useUser.ts'
              icon: 'i-vscode-icons:file-type-typescript'
        - label: 'components'
          icon: 'i-lucide:folder'
          children:
            - label: 'Home'
              icon: 'i-lucide:folder'
              children:
                - label: 'Card.vue'
                  icon: 'i-vscode-icons:file-type-vue'
                - label: 'Button.vue'
                  icon: 'i-vscode-icons:file-type-vue'
    - label: 'app.vue'
      icon: 'i-vscode-icons:file-type-vue'
    - label: 'nuxt.config.ts'
      icon: 'i-vscode-icons:file-type-nuxt'
  class: 'w-60'
---
::

::note
You can also disable individual items using `item.disabled`.
::

## Examples

### Control selected item(s)

You can control the selected item(s) by using the `default-value` prop or the `v-model` directive.

::docs-component-example
---
name: 'tree-model-value-example'
collapse: true
props:
  class: 'w-60'
---
::

If you want to prevent an item from being selected, you can use the `item.onSelect()` property or the global `select` event:

::docs-component-example
---
name: 'tree-on-select-example'
collapse: true
props:
  class: 'w-60'
---
::

::note
This lets you expand or collapse a parent item without selecting it.
::

### Control expanded items

You can control the expanded items by using the `default-expanded` prop or the `v-model` directive.

::docs-component-example
---
name: 'tree-expanded-example'
collapse: true
props:
  class: 'w-60'
---
::

If you want to prevent an item from being expanded, you can use the `item.onToggle()` property or the global `toggle` event:

::docs-component-example
---
name: 'tree-on-toggle-example'
collapse: true
props:
  class: 'w-60'
---
::

::note
This lets you select a parent item without expanding or collapsing its children.
::

### With checkbox in items

You can use the `item-leading` slot to add a [Checkbox](/docs/pohon/components/checkbox) to the items. Use the `multiple`, `propagate-select` and `bubble-select` props to enable multi-selection with parent-child relationship and the `select` and `toggle` events to control the selected and expanded state of the items.

::docs-component-example
---
name: 'tree-checkbox-items-example'
collapse: true
props:
  class: 'w-60'
---
::

::note
This example uses the `as` prop to change the items from `button` to `div` as the [`Checkbox`](/docs/pohon/components/checkbox) is also rendered as a `button`.
::

### With drag and drop

Use the [`useSortable`](https://vueuse.org/integrations/useSortable/) composable from [`@vueuse/integrations`](https://vueuse.org/integrations/README.html) to enable drag and drop functionality on the Tree. This integration wraps [Sortable.js](https://sortablejs.github.io/Sortable/) to provide a seamless drag and drop experience.

::docs-component-example
---
prettier: true
collapse: true
name: 'tree-drag-and-drop-example'
---
::

::note
This example sets the `nested` prop to `false` to have a flat list of items so that the items can be dragged and dropped.
::

### With virtualization

Use the `virtualize` prop to enable virtualization for large lists as a boolean or an object with options like `{ estimateSize: 32, overscan: 12 }`.

::warning
When virtualization is enabled, the tree structure is flattened, similar to setting the `nested` prop to `false`.
::

::docs-component-example
---
prettier: true
name: 'tree-virtualize-example'
props:
  class: 'w-60'
---
::

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}-wrapper`
- `#{{ item.slot }}`
- `#{{ item.slot }}-leading`
- `#{{ item.slot }}-label`
- `#{{ item.slot }}-trailing`

::docs-component-example
---
name: 'tree-custom-slot-example'
collapse: true
props:
  class: 'w-60'
---
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

## Akar

:docs-akar-to-pohon{to="/docs/akar/components/tree" mode="pohon"}

## Changelog

:docs-component-changelog
