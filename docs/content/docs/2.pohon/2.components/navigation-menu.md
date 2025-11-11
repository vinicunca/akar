---
title: NavigationMenu
description: A list of links that can be displayed horizontally or vertically.
category: navigation
links:
  - label: Akar
    to: /docs/akar/components/navigation-menu
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/navigation-menu.vue
---

## Usage

Use the NavigationMenu component to display a list of links horizontally or vertically.

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
    - label: Guide
      icon: i-lucide:book-open
      to: /docs/getting-started
      children:
        - label: Introduction
          description: Fully styled and customizable components for Nuxt.
          icon: i-lucide:house
        - label: Installation
          description: Learn how to install and configure Nuxt UI in your application.
          icon: i-lucide:cloud-download
        - label: 'Icons'
          icon: 'i-lucide:smile'
          description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
        - label: 'Colors'
          icon: 'i-lucide:swatch-book'
          description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
        - label: 'Theme'
          icon: 'i-lucide:cog'
          description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
    - label: Composables
      icon: i-lucide:database
      to: /docs/composables
      children:
        - label: defineShortcuts
          icon: i-lucide:file-text
          description: Define shortcuts for your application.
          to: /docs/composables/define-shortcuts
        - label: useOverlay
          icon: i-lucide:file-text
          description: Display a modal/slideover within your application.
          to: /docs/composables/use-overlay
        - label: useToast
          icon: i-lucide:file-text
          description: Display a toast within your application.
          to: /docs/composables/use-toast
    - label: Components
      icon: i-lucide:box
      to: /docs/pohon/components
      active: true
      children:
        - label: Link
          icon: i-lucide:file-text
          description: Use NuxtLink with superpowers.
          to: /docs/pohon/components/link
        - label: Modal
          icon: i-lucide:file-text
          description: Display a modal within your application.
          to: /docs/pohon/components/dialog
        - label: NavigationMenu
          icon: i-lucide:file-text
          description: Display a list of links.
          to: /docs/pohon/components/navigation-menu
        - label: Pagination
          icon: i-lucide:file-text
          description: Display a list of pages.
          to: /docs/pohon/components/pagination
        - label: Popover
          icon: i-lucide:file-text
          description: Display a non-modal dialog that floats around a trigger element.
          to: /docs/pohon/components/popover
        - label: Progress
          icon: i-lucide:file-text
          description: Show a horizontal bar to indicate task progression.
          to: /docs/pohon/components/progress
    - label: GitHub
      icon: i-simple-icons:github
      badge: 3.8k
      to: https://github.com/nuxt/ui
      target: _blank
    - label: Help
      icon: i-lucide:circle-help
      disabled: true
  class: 'w-full akar:justify-center bg-background'
---
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`
- `icon?: string`
- `avatar?: AvatarProps`
- `badge?: string | number | BadgeProps`
- `tooltip?: TooltipProps`
- `trailingIcon?: string`
- `type?: 'label' | 'trigger' | 'link'`
- `defaultOpen?: boolean`
- `open?: boolean`
- `value?: string`
- `disabled?: boolean`
- [`slot?: string`](#with-custom-slot)
- `onSelect?: (e: Event) => void`
- `children?: NavigationMenuChildItem[]`
- `class?: any`
- `pohon?: { linkLeadingAvatarSize?: ClassNameValue, linkLeadingAvatar?: ClassNameValue, linkLeadingIcon?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkTrailing?: ClassNameValue, linkTrailingBadgeSize?: ClassNameValue, linkTrailingBadge?: ClassNameValue, linkTrailingIcon?: ClassNameValue, label?: ClassNameValue, link?: ClassNameValue, content?: ClassNameValue, childList?: ClassNameValue, childLabel?: ClassNameValue, childItem?: ClassNameValue, childLink?: ClassNameValue, childLinkIcon?: ClassNameValue, childLinkWrapper?: ClassNameValue, childLinkLabel?: ClassNameValue, childLinkLabelExternalIcon?: ClassNameValue, childLinkDescription?: ClassNameValue }`

You can pass any property from the [Link](/docs/pohon/components/link#props) component such as `to`, `target`, etc.

::docs-pohon-preview
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[]
props:
  items:
    - label: Guide
      icon: i-lucide:book-open
      to: /docs/getting-started
      children:
        - label: Introduction
          description: Fully styled and customizable components for Nuxt.
          icon: i-lucide:house
        - label: Installation
          description: Learn how to install and configure Nuxt UI in your application.
          icon: i-lucide:cloud-download
        - label: 'Icons'
          icon: 'i-lucide:smile'
          description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
        - label: 'Colors'
          icon: 'i-lucide:swatch-book'
          description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
        - label: 'Theme'
          icon: 'i-lucide:cog'
          description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
    - label: Composables
      icon: i-lucide:database
      to: /docs/composables
      children:
        - label: defineShortcuts
          icon: i-lucide:file-text
          description: Define shortcuts for your application.
          to: /docs/composables/define-shortcuts
        - label: useOverlay
          icon: i-lucide:file-text
          description: Display a modal/slideover within your application.
          to: /docs/composables/use-overlay
        - label: useToast
          icon: i-lucide:file-text
          description: Display a toast within your application.
          to: /docs/composables/use-toast
    - label: Components
      icon: i-lucide:box
      to: /docs/pohon/components
      active: true
      children:
        - label: Link
          icon: i-lucide:file-text
          description: Use NuxtLink with superpowers.
          to: /docs/pohon/components/link
        - label: Modal
          icon: i-lucide:file-text
          description: Display a modal within your application.
          to: /docs/pohon/components/dialog
        - label: NavigationMenu
          icon: i-lucide:file-text
          description: Display a list of links.
          to: /docs/pohon/components/navigation-menu
        - label: Pagination
          icon: i-lucide:file-text
          description: Display a list of pages.
          to: /docs/pohon/components/pagination
        - label: Popover
          icon: i-lucide:file-text
          description: Display a non-modal dialog that floats around a trigger element.
          to: /docs/pohon/components/popover
        - label: Progress
          icon: i-lucide:file-text
          description: Show a horizontal bar to indicate task progression.
          to: /docs/pohon/components/progress
    - label: GitHub
      icon: i-simple-icons:github
      badge: 3.8k
      to: https://github.com/nuxt/ui
      target: _blank
    - label: Help
      icon: i-lucide:circle-help
      disabled: true
  class: 'w-full akar:justify-center'
---
::

::note
You can also pass an array of arrays to the `items` prop to display groups of items.
::

::tip
Each item can take a `children` array of objects with the following properties to create submenus:

- `label: string`
- `description?: string`
- `icon?: string`
- `onSelect?: (e: Event) => void`
- `class?: any`

::

### Orientation

Use the `orientation` prop to change the orientation of the NavigationMenu.

::note
When orientation is `vertical`, an [Accordion](/docs/pohon/components/accordion) component is used to display each group. You can control the open state of each item using the `open` and `defaultOpen` properties and change the behavior using the [`collapsible`](/docs/pohon/components/accordion#collapsible) and [`type`](/docs/pohon/components/accordion#multiple) props.
::

::docs-pohon-preview
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[][]
props:
  orientation: 'vertical'
  items:
    - - label: Links
        type: 'label'
      - label: Guide
        icon: i-lucide:book-open
        children:
          - label: Introduction
            description: Fully styled and customizable components for Nuxt.
            icon: i-lucide:house
          - label: Installation
            description: Learn how to install and configure Nuxt UI in your application.
            icon: i-lucide:cloud-download
          - label: 'Icons'
            icon: 'i-lucide:smile'
            description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
          - label: 'Colors'
            icon: 'i-lucide:swatch-book'
            description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
          - label: 'Theme'
            icon: 'i-lucide:cog'
            description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
      - label: Composables
        icon: i-lucide:database
        children:
          - label: defineShortcuts
            icon: i-lucide:file-text
            description: Define shortcuts for your application.
            to: /docs/composables/define-shortcuts
          - label: useOverlay
            icon: i-lucide:file-text
            description: Display a modal/slideover within your application.
            to: /docs/composables/use-overlay
          - label: useToast
            icon: i-lucide:file-text
            description: Display a toast within your application.
            to: /docs/composables/use-toast
      - label: Components
        icon: i-lucide:box
        to: /docs/pohon/components
        active: true
        defaultOpen: true
        children:
          - label: Link
            icon: i-lucide:file-text
            description: Use NuxtLink with superpowers.
            to: /docs/pohon/components/link
          - label: Modal
            icon: i-lucide:file-text
            description: Display a modal within your application.
            to: /docs/pohon/components/dialog
          - label: NavigationMenu
            icon: i-lucide:file-text
            description: Display a list of links.
            to: /docs/pohon/components/navigation-menu
          - label: Pagination
            icon: i-lucide:file-text
            description: Display a list of pages.
            to: /docs/pohon/components/pagination
          - label: Popover
            icon: i-lucide:file-text
            description: Display a non-modal dialog that floats around a trigger element.
            to: /docs/pohon/components/popover
          - label: Progress
            icon: i-lucide:file-text
            description: Show a horizontal bar to indicate task progression.
            to: /docs/pohon/components/progress
    - - label: GitHub
        icon: i-simple-icons:github
        badge: 3.8k
        to: https://github.com/nuxt/ui
        target: _blank
      - label: Help
        icon: i-lucide:circle-help
        disabled: true
  class: 'data-[orientation=vertical]:w-48'
---
::

::note
Groups will be spaced when orientation is `horizontal` and separated when orientation is `vertical`.
::

### Collapsed

In `vertical` orientation, use the `collapsed` prop to collapse the NavigationMenu, this can be useful in a sidebar for example.

::note
You can use the [`tooltip`](#with-tooltip-in-items) and [`popover`](#with-popover-in-items) props to display more information on the collapsed items.
::

::docs-pohon-preview
---
collapse: true
ignore:
  - items
  - orientation
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[][]
items:
  tooltip:
    - true
    - false
  popover:
    - true
    - false
props:
  collapsed: true
  tooltip: false
  popover: false
  orientation: 'vertical'
  items:
    - - label: Links
        type: 'label'
      - label: Guide
        icon: i-lucide:book-open
        children:
          - label: Introduction
            description: Fully styled and customizable components for Nuxt.
            icon: i-lucide:house
          - label: Installation
            description: Learn how to install and configure Nuxt UI in your application.
            icon: i-lucide:cloud-download
          - label: 'Icons'
            icon: 'i-lucide:smile'
            description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
          - label: 'Colors'
            icon: 'i-lucide:swatch-book'
            description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
          - label: 'Theme'
            icon: 'i-lucide:cog'
            description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
      - label: Composables
        icon: i-lucide:database
        children:
          - label: defineShortcuts
            icon: i-lucide:file-text
            description: Define shortcuts for your application.
            to: /docs/composables/define-shortcuts
          - label: useOverlay
            icon: i-lucide:file-text
            description: Display a modal/slideover within your application.
            to: /docs/composables/use-overlay
          - label: useToast
            icon: i-lucide:file-text
            description: Display a toast within your application.
            to: /docs/composables/use-toast
      - label: Components
        icon: i-lucide:box
        to: /docs/pohon/components
        active: true
        children:
          - label: Link
            icon: i-lucide:file-text
            description: Use NuxtLink with superpowers.
            to: /docs/pohon/components/link
          - label: Modal
            icon: i-lucide:file-text
            description: Display a modal within your application.
            to: /docs/pohon/components/dialog
          - label: NavigationMenu
            icon: i-lucide:file-text
            description: Display a list of links.
            to: /docs/pohon/components/navigation-menu
          - label: Pagination
            icon: i-lucide:file-text
            description: Display a list of pages.
            to: /docs/pohon/components/pagination
          - label: Popover
            icon: i-lucide:file-text
            description: Display a non-modal dialog that floats around a trigger element.
            to: /docs/pohon/components/popover
          - label: Progress
            icon: i-lucide:file-text
            description: Show a horizontal bar to indicate task progression.
            to: /docs/pohon/components/progress
    - - label: GitHub
        icon: i-simple-icons:github
        badge: 3.8k
        to: https://github.com/nuxt/ui
        target: _blank
      - label: Help
        icon: i-lucide:circle-help
        disabled: true
---
::

### Highlight

Use the `highlight` prop to display a highlighted border for the active item.

Use the `highlight-color` prop to change the color of the border. It defaults to the `color` prop.

::docs-pohon-preview
---
collapse: true
prettier: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[][]
props:
  highlight: true
  highlightColor: 'primary'
  orientation: 'horizontal'
  items:
    - - label: Guide
        icon: i-lucide:book-open
        children:
          - label: Introduction
            description: Fully styled and customizable components for Nuxt.
            icon: i-lucide:house
          - label: Installation
            description: Learn how to install and configure Nuxt UI in your application.
            icon: i-lucide:cloud-download
          - label: 'Icons'
            icon: 'i-lucide:smile'
            description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
          - label: 'Colors'
            icon: 'i-lucide:swatch-book'
            description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
          - label: 'Theme'
            icon: 'i-lucide:cog'
            description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
      - label: Composables
        icon: i-lucide:database
        children:
          - label: defineShortcuts
            icon: i-lucide:file-text
            description: Define shortcuts for your application.
            to: /docs/composables/define-shortcuts
          - label: useOverlay
            icon: i-lucide:file-text
            description: Display a modal/slideover within your application.
            to: /docs/composables/use-overlay
          - label: useToast
            icon: i-lucide:file-text
            description: Display a toast within your application.
            to: /docs/composables/use-toast
      - label: Components
        icon: i-lucide:box
        to: /docs/pohon/components
        active: true
        defaultOpen: true
        children:
          - label: Link
            icon: i-lucide:file-text
            description: Use NuxtLink with superpowers.
            to: /docs/pohon/components/link
          - label: Modal
            icon: i-lucide:file-text
            description: Display a modal within your application.
            to: /docs/pohon/components/dialog
          - label: NavigationMenu
            icon: i-lucide:file-text
            description: Display a list of links.
            to: /docs/pohon/components/navigation-menu
          - label: Pagination
            icon: i-lucide:file-text
            description: Display a list of pages.
            to: /docs/pohon/components/pagination
          - label: Popover
            icon: i-lucide:file-text
            description: Display a non-modal dialog that floats around a trigger element.
            to: /docs/pohon/components/popover
          - label: Progress
            icon: i-lucide:file-text
            description: Show a horizontal bar to indicate task progression.
            to: /docs/pohon/components/progress
    - - label: GitHub
        icon: i-simple-icons:github
        badge: 3.8k
        to: https://github.com/nuxt/ui
        target: _blank
      - label: Help
        icon: i-lucide:circle-help
        disabled: true
  class: 'data-[orientation=horizontal]:border-b border-border data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48'
---
::

::note
In this example, the `border-b` class is applied to display a border in `horizontal` orientation, this is not done by default to let you have a clean slate to work with.
::

::caution
In `vertical` orientation, the `highlight` prop only highlights the border of active children.
::

### Color

Use the `color` prop to change the color of the NavigationMenu.

::docs-pohon-preview
---
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[][]
props:
  color: neutral
  items:
    - - label: Guide
        icon: i-lucide:book-open
        to: /docs/getting-started
      - label: Composables
        icon: i-lucide:database
        to: /docs/composables
      - label: Components
        icon: i-lucide:box
        to: /docs/pohon/components
        active: true
    - - label: GitHub
        icon: i-simple-icons:github
        badge: 3.8k
        to: https://github.com/nuxt/ui
        target: _blank
  class: 'w-full'
---
::

### Variant

Use the `variant` prop to change the variant of the NavigationMenu.

::docs-pohon-preview
---
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[][]
props:
  color: neutral
  variant: link
  highlight: false
  items:
    - - label: Guide
        icon: i-lucide:book-open
        to: /docs/getting-started
      - label: Composables
        icon: i-lucide:database
        to: /docs/composables
      - label: Components
        icon: i-lucide:box
        to: /docs/pohon/components
        active: true
    - - label: GitHub
        icon: i-simple-icons:github
        badge: 3.8k
        to: https://github.com/nuxt/ui
        target: _blank
  class: 'w-full'
---
::

::note
The `highlight` prop changes the `pill` variant active item style. Try it out to see the difference.
::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [Icon](/docs/pohon/components/icon) of each item. Defaults to `i-lucide:chevron-down`. This icon is only displayed when an item has children.

::tip
You can also set an icon for a specific item by using the `trailingIcon` property in the item object.
::

::docs-pohon-preview
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[]
props:
  trailingIcon: 'i-lucide:arrow-down'
  items:
    - label: Guide
      icon: i-lucide:book-open
      to: /docs/getting-started
      children:
        - label: Introduction
          description: Fully styled and customizable components for Nuxt.
          icon: i-lucide:house
        - label: Installation
          description: Learn how to install and configure Nuxt UI in your application.
          icon: i-lucide:cloud-download
        - label: 'Icons'
          icon: 'i-lucide:smile'
          description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
        - label: 'Colors'
          icon: 'i-lucide:swatch-book'
          description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
        - label: 'Theme'
          icon: 'i-lucide:cog'
          description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
    - label: Composables
      icon: i-lucide:database
      to: /docs/composables
      children:
        - label: defineShortcuts
          icon: i-lucide:file-text
          description: Define shortcuts for your application.
          to: /docs/composables/define-shortcuts
        - label: useOverlay
          icon: i-lucide:file-text
          description: Display a modal/slideover within your application.
          to: /docs/composables/use-overlay
        - label: useToast
          icon: i-lucide:file-text
          description: Display a toast within your application.
          to: /docs/composables/use-toast
    - label: Components
      icon: i-lucide:box
      to: /docs/pohon/components
      active: true
      children:
        - label: Link
          icon: i-lucide:file-text
          description: Use NuxtLink with superpowers.
          to: /docs/pohon/components/link
        - label: Modal
          icon: i-lucide:file-text
          description: Display a modal within your application.
          to: /docs/pohon/components/dialog
        - label: NavigationMenu
          icon: i-lucide:file-text
          description: Display a list of links.
          to: /docs/pohon/components/navigation-menu
        - label: Pagination
          icon: i-lucide:file-text
          description: Display a list of pages.
          to: /docs/pohon/components/pagination
        - label: Popover
          icon: i-lucide:file-text
          description: Display a non-modal dialog that floats around a trigger element.
          to: /docs/pohon/components/popover
        - label: Progress
          icon: i-lucide:file-text
          description: Show a horizontal bar to indicate task progression.
          to: /docs/pohon/components/progress
  class: 'w-full akar:justify-center'
---
::

::docs-framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `pohon.icons.chevronDown` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `pohon.icons.chevronDown` key.
:::
::

### Arrow

Use the `arrow` prop to display an arrow on the NavigationMenu content when items have children.

::docs-pohon-preview
---
collapse: true
ignore:
  - items
  - arrow
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[]
props:
  arrow: true
  items:
    - label: Guide
      icon: i-lucide:book-open
      to: /docs/getting-started
      children:
        - label: Introduction
          description: Fully styled and customizable components for Nuxt.
          icon: i-lucide:house
        - label: Installation
          description: Learn how to install and configure Nuxt UI in your application.
          icon: i-lucide:cloud-download
        - label: 'Icons'
          icon: 'i-lucide:smile'
          description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
        - label: 'Colors'
          icon: 'i-lucide:swatch-book'
          description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
        - label: 'Theme'
          icon: 'i-lucide:cog'
          description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
    - label: Composables
      icon: i-lucide:database
      to: /docs/composables
      children:
        - label: defineShortcuts
          icon: i-lucide:file-text
          description: Define shortcuts for your application.
          to: /docs/composables/define-shortcuts
        - label: useOverlay
          icon: i-lucide:file-text
          description: Display a modal/slideover within your application.
          to: /docs/composables/use-overlay
        - label: useToast
          icon: i-lucide:file-text
          description: Display a toast within your application.
          to: /docs/composables/use-toast
    - label: Components
      icon: i-lucide:box
      to: /docs/pohon/components
      active: true
      children:
        - label: Link
          icon: i-lucide:file-text
          description: Use NuxtLink with superpowers.
          to: /docs/pohon/components/link
        - label: Modal
          icon: i-lucide:file-text
          description: Display a modal within your application.
          to: /docs/pohon/components/dialog
        - label: NavigationMenu
          icon: i-lucide:file-text
          description: Display a list of links.
          to: /docs/pohon/components/navigation-menu
        - label: Pagination
          icon: i-lucide:file-text
          description: Display a list of pages.
          to: /docs/pohon/components/pagination
        - label: Popover
          icon: i-lucide:file-text
          description: Display a non-modal dialog that floats around a trigger element.
          to: /docs/pohon/components/popover
        - label: Progress
          icon: i-lucide:file-text
          description: Show a horizontal bar to indicate task progression.
          to: /docs/pohon/components/progress
  class: 'w-full akar:justify-center'
---
::

::note
The arrow is animated to follow the active item.
::

### Content Orientation

Use the `content-orientation` prop to change the orientation of the content.

::warning
This prop only works when `orientation` is `horizontal`.
::

::docs-pohon-preview
---
collapse: true
ignore:
  - items
  - arrow
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[]
props:
  arrow: true
  contentOrientation: 'vertical'
  items:
    - label: Guide
      icon: i-lucide:book-open
      to: /docs/getting-started
      children:
        - label: Introduction
          description: Fully styled and customizable components for Nuxt.
          icon: i-lucide:house
        - label: Installation
          description: Learn how to install and configure Nuxt UI in your application.
          icon: i-lucide:cloud-download
        - label: 'Icons'
          icon: 'i-lucide:smile'
          description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
    - label: Composables
      icon: i-lucide:database
      to: /docs/composables
      children:
        - label: defineShortcuts
          icon: i-lucide:file-text
          description: Define shortcuts for your application.
          to: /docs/composables/define-shortcuts
        - label: useOverlay
          icon: i-lucide:file-text
          description: Display a modal/slideover within your application.
          to: /docs/composables/use-overlay
        - label: useToast
          icon: i-lucide:file-text
          description: Display a toast within your application.
          to: /docs/composables/use-toast
    - label: Components
      icon: i-lucide:box
      to: /docs/pohon/components
      active: true
      children:
        - label: Link
          icon: i-lucide:file-text
          description: Use NuxtLink with superpowers.
          to: /docs/pohon/components/link
        - label: Modal
          icon: i-lucide:file-text
          description: Display a modal within your application.
          to: /docs/pohon/components/dialog
        - label: NavigationMenu
          icon: i-lucide:file-text
          description: Display a list of links.
          to: /docs/pohon/components/navigation-menu
        - label: Pagination
          icon: i-lucide:file-text
          description: Display a list of pages.
          to: /docs/pohon/components/pagination
  class: 'w-full akar:justify-center'
---
::

### Unmount

Use the `unmount-on-hide` prop to control the content unmounting behavior. Defaults to `true`.

::docs-pohon-preview
---
collapse: true
ignore:
  - items
  - arrow
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[]
props:
  unmountOnHide: false
  items:
    - label: Guide
      icon: i-lucide:book-open
      to: /docs/getting-started
      children:
        - label: Introduction
          description: Fully styled and customizable components for Nuxt.
          icon: i-lucide:house
        - label: Installation
          description: Learn how to install and configure Nuxt UI in your application.
          icon: i-lucide:cloud-download
        - label: 'Icons'
          icon: 'i-lucide:smile'
          description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
        - label: 'Colors'
          icon: 'i-lucide:swatch-book'
          description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
        - label: 'Theme'
          icon: 'i-lucide:cog'
          description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
    - label: Composables
      icon: i-lucide:database
      to: /docs/composables
      children:
        - label: defineShortcuts
          icon: i-lucide:file-text
          description: Define shortcuts for your application.
          to: /docs/composables/define-shortcuts
        - label: useOverlay
          icon: i-lucide:file-text
          description: Display a modal/slideover within your application.
          to: /docs/composables/use-overlay
        - label: useToast
          icon: i-lucide:file-text
          description: Display a toast within your application.
          to: /docs/composables/use-toast
    - label: Components
      icon: i-lucide:box
      to: /docs/pohon/components
      active: true
      children:
        - label: Link
          icon: i-lucide:file-text
          description: Use NuxtLink with superpowers.
          to: /docs/pohon/components/link
        - label: Modal
          icon: i-lucide:file-text
          description: Display a modal within your application.
          to: /docs/pohon/components/dialog
        - label: NavigationMenu
          icon: i-lucide:file-text
          description: Display a list of links.
          to: /docs/pohon/components/navigation-menu
        - label: Pagination
          icon: i-lucide:file-text
          description: Display a list of pages.
          to: /docs/pohon/components/pagination
        - label: Popover
          icon: i-lucide:file-text
          description: Display a non-modal dialog that floats around a trigger element.
          to: /docs/pohon/components/popover
        - label: Progress
          icon: i-lucide:file-text
          description: Show a horizontal bar to indicate task progression.
          to: /docs/pohon/components/progress
  class: 'w-full akar:justify-center'
---
::

::note
You can inspect the DOM to see each item's content being rendered.
::

## Examples

### With tooltip in items

When orientation is `vertical` and the menu is `collapsed`, you can set the `tooltip` prop to `true` to display a [Tooltip](/docs/pohon/components/tooltip) around items with their label but you can also use the `tooltip` property on each item to override the default tooltip.

You can pass any property from the [Tooltip](/docs/pohon/components/tooltip) component globally or on each item.

::docs-pohon-preview
---
collapse: true
ignore:
  - items
  - orientation
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[][]
items:
  tooltip:
    - true
    - false
props:
  tooltip: true
  collapsed: true
  orientation: 'vertical'
  items:
    - - label: Links
        type: 'label'
      - label: Guide
        icon: i-lucide:book-open
        children:
          - label: Introduction
            description: Fully styled and customizable components for Nuxt.
            icon: i-lucide:house
          - label: Installation
            description: Learn how to install and configure Nuxt UI in your application.
            icon: i-lucide:cloud-download
          - label: 'Icons'
            icon: 'i-lucide:smile'
            description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
          - label: 'Colors'
            icon: 'i-lucide:swatch-book'
            description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
          - label: 'Theme'
            icon: 'i-lucide:cog'
            description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
      - label: Composables
        icon: i-lucide:database
        children:
          - label: defineShortcuts
            icon: i-lucide:file-text
            description: Define shortcuts for your application.
            to: /docs/composables/define-shortcuts
          - label: useOverlay
            icon: i-lucide:file-text
            description: Display a modal/slideover within your application.
            to: /docs/composables/use-overlay
          - label: useToast
            icon: i-lucide:file-text
            description: Display a toast within your application.
            to: /docs/composables/use-toast
      - label: Components
        icon: i-lucide:box
        to: /docs/pohon/components
        active: true
        children:
          - label: Link
            icon: i-lucide:file-text
            description: Use NuxtLink with superpowers.
            to: /docs/pohon/components/link
          - label: Modal
            icon: i-lucide:file-text
            description: Display a modal within your application.
            to: /docs/pohon/components/dialog
          - label: NavigationMenu
            icon: i-lucide:file-text
            description: Display a list of links.
            to: /docs/pohon/components/navigation-menu
          - label: Pagination
            icon: i-lucide:file-text
            description: Display a list of pages.
            to: /docs/pohon/components/pagination
          - label: Popover
            icon: i-lucide:file-text
            description: Display a non-modal dialog that floats around a trigger element.
            to: /docs/pohon/components/popover
          - label: Progress
            icon: i-lucide:file-text
            description: Show a horizontal bar to indicate task progression.
            to: /docs/pohon/components/progress
    - - label: GitHub
        icon: i-simple-icons:github
        badge: 3.8k
        to: https://github.com/nuxt/ui
        target: _blank
        tooltip:
          text: 'Open on GitHub'
          kbds:
            - 3.8k
      - label: Help
        icon: i-lucide:circle-help
        disabled: true
---
::

### With popover in items

When orientation is `vertical` and the menu is `collapsed`, you can set the `popover` prop to `true` to display a [Popover](/docs/pohon/components/popover) around items with their children but you can also use the `popover` property on each item to override the default popover.

You can pass any property from the [Popover](/docs/pohon/components/popover) component globally or on each item.

::docs-pohon-preview
---
collapse: true
ignore:
  - items
  - orientation
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[][]
items:
  popover:
    - true
    - false
props:
  popover: true
  collapsed: true
  orientation: 'vertical'
  items:
    - - label: Links
        type: 'label'
      - label: Guide
        icon: i-lucide:book-open
        children:
          - label: Introduction
            description: Fully styled and customizable components for Nuxt.
            icon: i-lucide:house
          - label: Installation
            description: Learn how to install and configure Nuxt UI in your application.
            icon: i-lucide:cloud-download
          - label: 'Icons'
            icon: 'i-lucide:smile'
            description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
          - label: 'Colors'
            icon: 'i-lucide:swatch-book'
            description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
          - label: 'Theme'
            icon: 'i-lucide:cog'
            description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
      - label: Composables
        icon: i-lucide:database
        popover:
          mode: 'click'
        children:
          - label: defineShortcuts
            icon: i-lucide:file-text
            description: Define shortcuts for your application.
            to: /docs/composables/define-shortcuts
          - label: useOverlay
            icon: i-lucide:file-text
            description: Display a modal/slideover within your application.
            to: /docs/composables/use-overlay
          - label: useToast
            icon: i-lucide:file-text
            description: Display a toast within your application.
            to: /docs/composables/use-toast
      - label: Components
        icon: i-lucide:box
        to: /docs/pohon/components
        active: true
        children:
          - label: Link
            icon: i-lucide:file-text
            description: Use NuxtLink with superpowers.
            to: /docs/pohon/components/link
          - label: Modal
            icon: i-lucide:file-text
            description: Display a modal within your application.
            to: /docs/pohon/components/dialog
          - label: NavigationMenu
            icon: i-lucide:file-text
            description: Display a list of links.
            to: /docs/pohon/components/navigation-menu
          - label: Pagination
            icon: i-lucide:file-text
            description: Display a list of pages.
            to: /docs/pohon/components/pagination
          - label: Popover
            icon: i-lucide:file-text
            description: Display a non-modal dialog that floats around a trigger element.
            to: /docs/pohon/components/popover
          - label: Progress
            icon: i-lucide:file-text
            description: Show a horizontal bar to indicate task progression.
            to: /docs/pohon/components/progress
    - - label: GitHub
        icon: i-simple-icons:github
        badge: 3.8k
        to: https://github.com/nuxt/ui
        target: _blank
        tooltip:
          text: 'Open on GitHub'
          kbds:
            - 3.8k
      - label: Help
        icon: i-lucide:circle-help
        disabled: true
---
::

::tip{to="#with-content-slot"}
You can use the `#content` slot to customize the content of the popover in the `vertical` orientation.
::

### Control active item

You can control the active item by using the `default-value` prop or the `v-model` directive with the index of the item.

::docs-component-example
---
collapse: true
name: 'navigation-menu-model-value-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/pohon/composables/define-shortcuts), you can switch the active item by pressing :kbd{value="1"}, :kbd{value="2"}, or :kbd{value="3"}.
::

::tip
You can also pass the `value` of one of the items if provided.
::

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`
- `#{{ item.slot }}-leading`
- `#{{ item.slot }}-label`
- `#{{ item.slot }}-trailing`
- `#{{ item.slot }}-content`

::docs-component-example
---
name: 'navigation-menu-custom-slot-example'
---
::

::tip{to="#slots"}
You can also use the `#item`, `#item-leading`, `#item-label`, `#item-trailing` and `#item-content` slots to customize all items.
::

### With content slot

Use the `#item-content` slot or the `slot` property (`#{{ item.slot }}-content`) to customize the content of a specific item.

::docs-component-example
---
collapse: true
name: 'navigation-menu-content-slot-example'
---
::

::note
In this example, we add the `sm:w-(--akar-navigation-menu-viewport-width)` class on the `viewport` to have a dynamic width. This requires to set a width on the content's first child.
::

## API

### Props

:docs-pohon-props

### Emits

:docs-pohon-emits

### Slots

:docs-pohon-slots

## Theme

:docs-pohon-theme

### Anatomy

<!-- TODO: Create anatomy images for this component -->
Here is the anatomy of themeable parts of the Navigation Menu component:

Coming soon...

## Akar

:docs-akar-to-pohon{to="/docs/akar/components/navigation-menu" mode="pohon"}

## Changelog

::docs-component-changelog
