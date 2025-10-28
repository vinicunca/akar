---
description: A container lets you center and constrain the width of your content.
category: layout
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/container.vue
---

## Usage

Use the default slot to center and constrain the width of your content.

::docs-component-example
---
name: 'container-example'
props:
  class: 'w-full'
---
::

::tip{to="/docs/getting-started/theme/css-variables#container"}
In this example, its max width is controlled by the `max-w-$container-8xl` class,
which `8xl` is defined in the UnoCSS theme.
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
