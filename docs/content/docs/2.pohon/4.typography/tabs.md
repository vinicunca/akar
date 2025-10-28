---
title: Tabs
description: 'Organize related content in interactive tabbed interfaces.'
framework: nuxt
category: components
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/prose/Tabs.vue
---

## Usage

Use the `tabs` and `tabs-item` components to display [Tabs](/docs/pohon/components/tabs) in your content.

::code-preview{class="[&>div]:*:my-0"}

:::tabs{class="w-full"}

:::tabs-item{label="Code" icon="i-lucide-code"}

```mdc
::callout
Lorem velit voluptate ex reprehenderit ullamco et culpa.
::
```

:::

:::tabs-item{label="Preview" icon="i-lucide-eye"}

::callout
Lorem velit voluptate ex reprehenderit ullamco et culpa.
::

:::

:::

#code

````mdc
::tabs

:::tabs-item{label="Code" icon="i-lucide-code"}

```mdc
::callout
Lorem velit voluptate ex reprehenderit ullamco et culpa.
::
```

:::

:::tabs-item{label="Preview" icon="i-lucide-eye"}

::callout
Lorem velit voluptate ex reprehenderit ullamco et culpa.
::

:::

::
````

::

## API

### Props

:docs-pohon-props{prose}

### Slots

:docs-pohon-slots{prose}

## Theme

::docs-pohon-theme{prose}
---
extra:
  - tabsItem
---
::

## Changelog

:docs-component-changelog{prefix="prose"}
