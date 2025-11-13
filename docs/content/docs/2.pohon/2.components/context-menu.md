---
title: ContextMenu
description: Displays a menu located at the pointer, triggered by a right-click or a long-press.
category: overlay
links:
  - label: Akar
    to: /docs/akar/components/context-menu
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/context-menu.vue
---

## Usage

Use anything you like in the default slot of the ContextMenu, and right-click on it to display the menu.

::docs-pohon-preview
---
prettier: true
collapse: true
ignore:
  - items
  - pohon.content
external:
  - items
props:
  items:
    - - label: Appearance
        children:
          - label: System
            icon: i-lucide:monitor
          - label: Light
            icon: i-lucide:sun
          - label: Dark
            icon: i-lucide:moon
    - - label: Show Sidebar
        kbds:
          - meta
          - s
      - label: Show Toolbar
        kbds:
          - shift
          - meta
          - d
      - label: Collapse Pinned Tabs
        disabled: true
    - - label: Refresh the Page
      - label: Clear Cookies and Refresh
      - label: Clear Cache and Refresh
      - type: separator
      - label: Developer
        children:
          - - label: View Source
              kbds:
                - meta
                - shift
                - u
            - label: Developer Tools
              kbds:
                - option
                - meta
                - i
            - label: Inspect Elements
              kbds:
                - option
                - meta
                - c
          - - label: JavaScript Console
              kbds:
                - option
                - meta
                - j
slots:
  default: |

    <div class="flex items-center justify-center rounded-md border border-dashed border-border-accented text-sm aspect-video w-72">
      Right click here
    </div>
---

:div{class="flex items-center justify-center rounded-md border border-dashed border-border-accented text-sm aspect-video w-72"}[Right click here]
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`
- `icon?: string`
- `avatar?: AvatarProps`
- `kbds?: string[] | KbdProps[]`
- [`type?: "link" | "label" | "separator" | "checkbox"`](#with-checkbox-items)
- [`color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral"`](#with-color-items)
- [`checked?: boolean`](#with-checkbox-items)
- `disabled?: boolean`
- [`slot?: string`](#with-custom-slot)
- `onSelect?: (e: Event) => void`
- [`onUpdateChecked?: (checked: boolean) => void`](#with-checkbox-items)
- `children?: PContextMenuItem[] | PContextMenuItem[][]`
- `class?: any`
- `pohon?: { item?: ClassNameValue, label?: ClassNameValue, separator?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLabel?: ClassNameValue, itemLabelExternalIcon?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue, itemTrailingKbds?: ClassNameValue, itemTrailingKbdsSize?: ClassNameValue }`

You can pass any property from the [Link](/docs/pohon/components/link#props) component such as `to`, `target`, etc.

::docs-pohon-preview
---
prettier: true
collapse: true
ignore:
  - items
  - pohon.content
external:
  - items
externalTypes:
  - PContextMenuItem[][]
props:
  items:
    - - label: Appearance
        children:
          - label: System
            icon: i-lucide:monitor
          - label: Light
            icon: i-lucide:sun
          - label: Dark
            icon: i-lucide:moon
    - - label: Show Sidebar
        kbds:
          - meta
          - s
      - label: Show Toolbar
        kbds:
          - shift
          - meta
          - d
      - label: Collapse Pinned Tabs
        disabled: true
    - - label: Refresh the Page
      - label: Clear Cookies and Refresh
      - label: Clear Cache and Refresh
      - type: separator
      - label: Developer
        children:
          - - label: View Source
              kbds:
                - meta
                - shift
                - u
            - label: Developer Tools
              kbds:
                - option
                - meta
                - i
            - label: Inspect Elements
              kbds:
                - option
                - meta
                - c
          - - label: JavaScript Console
              kbds:
                - option
                - meta
                - j
  pohon:
    content: 'w-48'
slots:
  default: |

    <div class="flex items-center justify-center rounded-md border border-dashed border-border-accented text-sm aspect-video w-72">
      Right click here
    </div>
---

:div{class="flex items-center justify-center rounded-md border border-dashed border-border-accented text-sm aspect-video w-72"}[Right click here]
::

::note
You can also pass an array of arrays to the `items` prop to create separated groups of items.
::

::tip
Each item can take a `children` array of objects with the same properties as the `items` prop to create a nested menu which can be controlled using the `open`, `defaultOpen` and `content` properties.
::

### Size

Use the `size` prop to change the size of the ContextMenu.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - pohon.content
external:
  - items
externalTypes:
  - PContextMenuItem[]
props:
  size: xl
  items:
    - label: System
      icon: i-lucide:monitor
    - label: Light
      icon: i-lucide:sun
    - label: Dark
      icon: i-lucide:moon
  pohon:
    content: 'w-48'
slots:
  default: |

    <div class="flex items-center justify-center rounded-md border border-dashed border-border-accented text-sm aspect-video w-72">
      Right click here
    </div>
---

:div{class="flex items-center justify-center rounded-md border border-dashed border-border-accented text-sm aspect-video w-72"}[Right click here]
::

### Modal

Use the `modal` prop to control whether the ContextMenu blocks interaction with outside content. Defaults to `true`.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - poihon.content
external:
  - items
externalTypes:
  - PContextMenuItem[]
props:
  modal: false
  items:
    - label: System
      icon: i-lucide:monitor
    - label: Light
      icon: i-lucide:sun
    - label: Dark
      icon: i-lucide:moon
  pohon:
    content: 'w-48'
slots:
  default: |

    <div class="flex items-center justify-center rounded-md border border-dashed border-accented text-sm aspect-video w-72">
      Right click here
    </div>
---

:div{class="flex items-center justify-center rounded-md border border-dashed border-accented text-sm aspect-video w-72"}[Right click here]
::

### Disabled

Use the `disabled` prop to disable the ContextMenu.

::docs-pohon-preview
---
prettier: true
ignore:
  - items
  - pohon.content
external:
  - items
externalTypes:
  - PContextMenuItem[]
props:
  disabled: true
  items:
    - label: System
      icon: i-lucide:monitor
    - label: Light
      icon: i-lucide:sun
    - label: Dark
      icon: i-lucide:moon
  pohon:
    content: 'w-48'
slots:
  default: |

    <div class="flex items-center justify-center rounded-md border border-dashed border-border-accented text-sm aspect-video w-72">
      Right click here
    </div>
---

:div{class="flex items-center justify-center rounded-md border border-dashed border-border-accented text-sm aspect-video w-72"}[Right click here]
::

## Examples

### With checkbox items

You can use the `type` property with `checkbox` and use the `checked` / `onUpdateChecked` properties to control the checked state of the item.

::docs-component-example
---
collapse: true
name: 'context-menu-checkbox-items-example'
---
::

::note
To ensure reactivity for the `checked` state of items, it's recommended to wrap your `items` array inside a `computed`.
::

### With color items

You can use the `color` property to highlight certain items with a color.

::docs-component-example
---
name: 'context-menu-color-items-example'
---
::

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`
- `#{{ item.slot }}-leading`
- `#{{ item.slot }}-label`
- `#{{ item.slot }}-trailing`

::docs-component-example
---
name: 'context-menu-custom-slot-example'
---
::

::tip{to="#slots"}
You can also use the `#item`, `#item-leading`, `#item-label` and `#item-trailing` slots to customize all items.
::

### Extract shortcuts

When you have some items with `kbds` property (displaying some [Kbd](/docs/pohon/components/kbd)), you can easily make them work with the [defineShortcuts](/docs/composables/define-shortcuts) composable.

Inside the `defineShortcuts` composable, there is an `extractShortcuts` utility that will extract the shortcuts recursively from the items and return an object that you can pass to `defineShortcuts`. It will automatically call the `select` function of the item when the shortcut is pressed.

```vue
<script setup lang="ts">
const items = [
  [{
    label: 'Show Sidebar',
    kbds: ['meta', 'S'],
    onSelect() {
      console.log('Show Sidebar clicked');
    }
  }, {
    label: 'Show Toolbar',
    kbds: ['shift', 'meta', 'D'],
    onSelect() {
      console.log('Show Toolbar clicked');
    }
  }, {
    label: 'Collapse Pinned Tabs',
    disabled: true
  }],
  [{
    label: 'Refresh the Page'
  }, {
    label: 'Clear Cookies and Refresh'
  }, {
    label: 'Clear Cache and Refresh'
  }, {
    type: 'separator' as const
  }, {
    label: 'Developer',
    children: [[{
      label: 'View Source',
      kbds: ['option', 'meta', 'U'],
      onSelect() {
        console.log('View Source clicked');
      }
    }, {
      label: 'Developer Tools',
      kbds: ['option', 'meta', 'I'],
      onSelect() {
        console.log('Developer Tools clicked');
      }
    }], [{
      label: 'Inspect Elements',
      kbds: ['option', 'meta', 'C'],
      onSelect() {
        console.log('Inspect Elements clicked');
      }
    }], [{
      label: 'JavaScript Console',
      kbds: ['option', 'meta', 'J'],
      onSelect() {
        console.log('JavaScript Console clicked');
      }
    }]]
  }]
];

defineShortcuts(extractShortcuts(items));
</script>
```

::note
In this example, :kbd{value="meta"} :kbd{value="S"}, :kbd{value="shift"} :kbd{value="meta"} :kbd{value="D"}, :kbd{value="option"} :kbd{value="meta"} :kbd{value="U"}, :kbd{value="option"} :kbd{value="meta"} :kbd{value="I"}, :kbd{value="option"} :kbd{value="meta"} :kbd{value="C"} and :kbd{value="option"} :kbd{value="meta"} :kbd{value="J"} would trigger the `select` function of the corresponding item.
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

:docs-akar-to-pohon{to="/docs/akar/components/context-menu" mode="pohon"}

## Changelog

:docs-component-changelog
