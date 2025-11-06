---
title: FooterColumns
description: 'A list of links as columns to display in your Footer.'
category: navigation
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/FooterColumns.vue
---

## Usage

The FooterColumns component renders a list of columns to display in your Footer.

Use it in the `top` slot of the [Footer](/docs/pohon/components/footer) component:

```vue {3-7}
<template>
  <PFooter>
    <template #top>
      <PContainer>
        <PFooterColumns />
      </PContainer>
    </template>
  </PFooter>
</template>
```

### Columns

Use the `columns` prop as an array of objects with the following properties:

- `label: string`
- `children?: FooterColumnLink[]`

Each column contains a `children` array of objects that define the links. Each link can have the following properties:

- `label?: string`
- `icon?: string`
- `class?: any`
- `pohon?: { item?: ClassNameValue, link?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkLeadingIcon?: ClassNameValue }`

You can pass any property from the [Link](/docs/pohon/components/link#props) component such as `to`, `target`, etc.

::docs-component-example
---
prettier: true
name: 'footer-columns-example'
class: 'p-8'
props:
  class: 'w-full'
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
