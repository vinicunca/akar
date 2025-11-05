---
title: Collapsible
description: 'Toggle content visibility with smooth expand and collapse animations.'
framework: nuxt
category: components
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/prose/Collapsible.vue
---

## Usage

Wrap your content with the `collapsible` component to display a [Collapsible](/docs/pohon/components/collapsible) in your content.

::code-preview{class="[&>div]:*:w-full [&>div]:*:my-0"}

::collapsible

| Prop    | Default   | Type                     |
|---------|-----------|--------------------------|
| `name`  |           | `string` |
| `size`  | `md`      | `string` |
| `color` | `neutral` | `string` |

::

#code

```mdc
::collapsible

| Prop    | Default   | Type                     |
|---------|-----------|--------------------------|
| `name`  |           | `string` |
| `size`  | `md`      | `string` |
| `color` | `neutral` | `string` |

::
```

::

## API

### Props

:docs-pohon-props{prose}

### Slots

:docs-pohon-slots{prose}

## Theme

:docs-pohon-theme{prose}

## Changelog

:docs-component-changelog{prefix="prose"}
