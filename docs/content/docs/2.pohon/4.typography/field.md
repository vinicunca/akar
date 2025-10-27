---
title: Field
description: 'Document API parameters, props, and configuration options clearly.'
framework: nuxt
category: components
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/prose/Field.vue
---

## Usage

A field, prop or parameter to display in your content.

::code-preview
::field{name="name" type="string" required class="w-full"}
The `description` can be set as prop or in the default slot with full **markdown** support.
::

#code

```mdc
::field{name="name" type="string" required}
The `description` can be set as prop or in the default slot with full **markdown** support.
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
