---
description: A vertically stacked set of interactive headings that each reveal an associated section of content.
category: data
links:
  - label: Akar
    to: /docs/akar/components/accordion
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/accordion.vue
---

## Usage

Use the Accordion component to display a list of collapsible items.

::docs-pohon-preview
---
ignore:
  - items
  - pohon.content
external:
  - items
hide:
  - class
  - pohon
  - defaultValue
props:
  defaultValue: '0'
  class: 'max-w-lg'
  pohon:
    content: 'color-text-muted'
  items:
    - label: 'Is it accessible?'
      content: 'Yes. It adheres to the WAI-ARIA design pattern.'
    - label: 'Is it unstyled?'
      content: Yes. It's unstyled by default, giving you freedom over the look and feel.
    - label: 'Can it be animated?'
      content: 'Yes! You can use the transition prop to configure the animation.'
---
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`
- `icon?: string`
- `trailingIcon?: string`
- `content?: string`
- `value?: string`
- `disabled?: boolean`
- [`slot?: string`](#with-custom-slot)
- `class?: any`
- `pohon?: { item?: ClassNameValue; header?: ClassNameValue; trigger?: ClassNameValue; leadingIcon?: ClassNameValue; label?: ClassNameValue; trailingIcon?: ClassNameValue; content?: ClassNameValue; body?: ClassNameValue }`

::docs-pohon-preview
---
ignore:
  - items
external:
  - items
externalTypes:
  - PAccordionItem[]
props:
  items:
    - label: 'Is it accessible?'
      icon: 'i-lucide:smile'
      content: 'Yes. It adheres to the WAI-ARIA design pattern.'
    - label: 'Is it unstyled?'
      icon: 'i-lucide:swatch-book'
      content: Yes. It's unstyled by default, giving you freedom over the look and feel.
    - label: 'Can it be animated?'
      icon: 'i-lucide:box'
      content: 'Yes! You can use the transition prop to configure the animation.'
---
::

### Multiple

Set the `type` prop to `multiple` to allow multiple items to be active at the same time. Defaults to `single`.

::docs-pohon-preview
---
ignore:
  - type
  - items
external:
  - items
externalTypes:
  - PAccordionItem[]
props:
  type: 'multiple'
  items:
    - label: 'Is it accessible?'
      icon: 'i-lucide:smile'
      content: 'Yes. It adheres to the WAI-ARIA design pattern.'
    - label: 'Is it unstyled?'
      icon: 'i-lucide:swatch-book'
      content: Yes. It's unstyled by default, giving you freedom over the look and feel.
    - label: 'Can it be animated?'
      icon: 'i-lucide:box'
      content: 'Yes! You can use the transition prop to configure the animation.'
---
::

### Collapsible

When `type` is `single`, you can set the `collapsible` prop to `false` to prevent the **active** item from collapsing.

::docs-pohon-preview
---
ignore:
  - collapsible
  - items
external:
  - items
externalTypes:
  - PAccordionItem[]
props:
  collapsible: false
  items:
    - label: 'Is it accessible?'
      icon: 'i-lucide:smile'
      content: 'Yes. It adheres to the WAI-ARIA design pattern.'
    - label: 'Is it unstyled?'
      icon: 'i-lucide:swatch-book'
      content: Yes. It's unstyled by default, giving you freedom over the look and feel.
    - label: 'Can it be animated?'
      icon: 'i-lucide:box'
      content: 'Yes! You can use the transition prop to configure the animation.'
---
::

### Unmount

Use the `unmount-on-hide` prop to prevent the content from being unmounted when the accordion is collapsed. Defaults to `true`.

::docs-pohon-preview
---
ignore:
  - items
external:
  - items
externalTypes:
  - PAccordionItem[]
props:
  unmountOnHide: false
  items:
    - label: 'Is it accessible?'
      icon: 'i-lucide:smile'
      content: 'Yes. It adheres to the WAI-ARIA design pattern.'
    - label: 'Is it unstyled?'
      icon: 'i-lucide:swatch-book'
      content: Yes. It's unstyled by default, giving you freedom over the look and feel.
    - label: 'Can it be animated?'
      icon: 'i-lucide:box'
      content: 'Yes! You can use the transition prop to configure the animation.'
---
::

::note
You can inspect the DOM to see each item's content being rendered.
::

### Disabled

Use the `disabled` property to disable the Accordion.

You can also disable a specific item by using the `disabled` property in the item object.

::docs-pohon-preview
---
ignore:
  - items
external:
  - items
externalTypes:
  - PAccordionItem[]
props:
  disabled: true
  items:
    - label: 'Is it accessible?'
      icon: 'i-lucide:smile'
      content: 'Yes. It adheres to the WAI-ARIA design pattern.'
    - label: 'Is it unstyled?'
      icon: 'i-lucide:swatch-book'
      content: Yes. It's unstyled by default, giving you freedom over the look and feel.
    - label: 'Can it be animated?'
      icon: 'i-lucide:box'
      content: 'Yes! You can use the transition prop to configure the animation.'
---
::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [Icon](/docs/pohon/components/icon) of each item. Defaults to `i-lucide:chevron-down`.

::tip
You can also set an icon for a specific item by using the `trailingIcon` property in the item object.
::

::docs-pohon-preview
---
ignore:
  - items
external:
  - items
externalTypes:
  - PAccordionItem[]
props:
  trailingIcon: 'i-lucide:arrow-down'
  items:
    - label: 'Is it accessible?'
      icon: 'i-lucide:smile'
      content: 'Yes. It adheres to the WAI-ARIA design pattern.'
    - label: 'Is it unstyled?'
      icon: 'i-lucide:swatch-book'
      content: Yes. It's unstyled by default, giving you freedom over the look and feel.
    - label: 'Can it be animated?'
      icon: 'i-lucide:box'
      content: 'Yes! You can use the transition prop to configure the animation.'
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

## Examples

### Control active item(s)

You can control the active item(s) by using the `default-value` prop or the `v-model` directive with the index of the item.

::docs-component-example
---
name: 'accordion-model-value-example'
---
::

::tip
You can also pass the `value` of one of the items if provided.
::

::caution
When `type="multiple"`, ensure to pass an array to the `default-value` prop or the `v-model` directive.
::

### With drag and drop

Use the [`useSortable`](https://vueuse.org/integrations/useSortable/) composable from [`@vueuse/integrations`](https://vueuse.org/integrations/README.html) to enable drag and drop functionality on the Accordion. This integration wraps [Sortable.js](https://sortablejs.github.io/Sortable/) to provide a seamless drag and drop experience.

::docs-component-example
---
name: 'accordion-drag-and-drop-example'
---
::

### With body slot

Use the `#body` slot to customize the body of each item.

::docs-component-example
---
name: 'accordion-body-slot-example'
---
::

::tip
The `#body` slot includes some pre-defined styles, use the [`#content` slot](#with-content-slot) if you want to start from scratch.
::

### With content slot

Use the `#content` slot to customize the content of each item.

::docs-component-example
---
name: 'accordion-content-slot-example'
---
::

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`
- `#{{ item.slot }}-body`

::docs-component-example
---
name: 'accordion-custom-slot-example'
---
::

### With markdown content

You can use the [MDC](https://github.com/nuxt-modules/mdc?tab=readme-ov-file#mdc) component from `@nuxtjs/mdc` to render markdown in the accordion items.

::docs-component-example
---
name: 'accordion-markdown-example'
---
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
Here is the anatomy of themeable parts of the Accordion component:

Coming soon...

## Akar

:docs-akar-to-pohon{to="/docs/akar/components/accordion" mode="pohon"}

## Changelog

:docs-component-changelog
