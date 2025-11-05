---
description: A set of tab panels that are displayed one at a time.
category: navigation
links:
  - label: Tabs
    icon: custom-akar
    to: /docs/akar/components/tabs
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/Tabs.vue
---

## Usage

Use the Tabs component to display a list of items in a tabs.

::docs-component-example
---
collapse: true
prettier: true
name: 'tabs-example'
props:
  class: 'w-full'
---
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`
- `icon?: string`
- `avatar?: AvatarProps`
- `badge?: string | number | BadgeProps`
- `content?: string`
- `value?: string | number`
- `disabled?: boolean`
- [`slot?: string`](#with-custom-slot)
- `class?: any`
- `pohon?: { trigger?: ClassNameValue, leadingIcon?: ClassNameValue, leadingAvatar?: ClassNameValue, leadingAvatarSize?: ClassNameValue, label?: ClassNameValue, trailingBadge?: ClassNameValue, trailingBadgeSize?: ClassNameValue, content?: ClassNameValue }`

::docs-pohon-preview
---
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - PTabsItem[]
props:
  items:
    - label: Account
      icon: 'i-lucide-user'
      content: 'This is the account content.'
    - label: Password
      icon: 'i-lucide-lock'
      content: 'This is the password content.'
  class: 'w-full'
---
::

### Content

Set the `content` prop to `false` to turn the Tabs into a toggle-only control without displaying any content. Defaults to `true`.

::docs-pohon-preview
---
ignore:
  - content
  - items
  - class
external:
  - items
externalTypes:
  - PTabsItem[]
props:
  content: false
  items:
    - label: Account
      icon: 'i-lucide-user'
      content: 'This is the account content.'
    - label: Password
      icon: 'i-lucide-lock'
      content: 'This is the password content.'
  class: 'w-full'
---
::

### Unmount

Use the `unmount-on-hide` prop to prevent the content from being unmounted when the Tabs is collapsed. Defaults to `true`.

::docs-pohon-preview
---
ignore:
  - content
  - items
  - class
external:
  - items
externalTypes:
  - PTabsItem[]
props:
  unmountOnHide: false
  items:
    - label: Account
      icon: 'i-lucide-user'
      content: 'This is the account content.'
    - label: Password
      icon: 'i-lucide-lock'
      content: 'This is the password content.'
  class: 'w-full'
---
::

::note
You can inspect the DOM to see each item's content being rendered.
::

### Color

Use the `color` prop to change the color of the Tabs.

::docs-pohon-preview
---
ignore:
  - content
  - items
  - class
external:
  - items
externalTypes:
  - PTabsItem[]
props:
  color: neutral
  content: false
  items:
    - label: Account
    - label: Password
  class: 'w-full'
---
::

### Variant

Use the `variant` prop to change the variant of the Tabs.

::docs-pohon-preview
---
ignore:
  - content
  - items
  - class
external:
  - items
externalTypes:
  - PTabsItem[]
props:
  color: neutral
  variant: link
  content: false
  items:
    - label: Account
    - label: Password
  class: 'w-full'
---
::

### Size

Use the `size` prop to change the size of the Tabs.

::docs-pohon-preview
---
ignore:
  - content
  - items
  - class
external:
  - items
externalTypes:
  - PTabsItem[]
props:
  size: md
  variant: pill
  content: false
  items:
    - label: Account
    - label: Password
  class: 'w-full'
---
::

### Orientation

Use the `orientation` prop to change the orientation of the Tabs. Defaults to `horizontal`.

::docs-pohon-preview
---
ignore:
  - content
  - items
  - class
external:
  - items
externalTypes:
  - PTabsItem[]
props:
  orientation: vertical
  variant: pill
  content: false
  items:
    - label: Account
    - label: Password
  class: 'w-full'
---
::

## Examples

### Control active item

You can control the active item by using the `default-value` prop or the `v-model` directive with the index of the item.

:docs-component-example{name="tabs-model-value-example"}

### With content slot

Use the `#content` slot to customize the content of each item.

:docs-component-example{name="tabs-content-slot-example"}

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`

:docs-component-example{name="tabs-custom-slot-example"}

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

### Emits

:docs-pohon-emits

### Expose

When accessing the component via a template ref, you can use the following:

| Name | Type |
| ---- | ---- |
| `triggersRef` | `Ref<ComponentPublicInstance[]>` |

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
