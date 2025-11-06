---
title: PageLinks
description: 'A list of links to be displayed in the page.'
category: page
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/PageLinks.vue
---

## Usage

Use the PageLinks component to display a list of links.

::docs-pohon-preview
---
collapse: true
prettier: true
ignore:
  - links
external:
  - links
props:
  links:
    - label: 'Edit this page'
      icon: i-lucide-file-pen
      to: https://github.com/vinicunca/akar/blob/main/packages/pohon/docs/content/3.components/page-links.md
    - label: 'Star on GitHub'
      icon: i-lucide-star
      to: https://github.com/nuxt/ui
    - label: 'Releases'
      icon: i-lucide-rocket
      to: https://github.com/nuxt/ui/releases
---
::

### Links

Use the `links` prop as an array of objects with the following properties:

- `label: string`
- `icon?: string`
- `class?: any`
- `pohon?: { item?: ClassNameValue, link?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkLeadingIcon?: ClassNameValue }`

You can pass any property from the [Link](/docs/pohon/components/link#props) component such as `to`, `target`, etc.

::docs-pohon-preview
---
prettier: true
ignore:
  - links
external:
  - links
externalTypes:
  - PageLink[]
props:
  links:
    - label: 'Edit this page'
      icon: i-lucide-file-pen
      to: https://github.com/vinicunca/akar/blob/main/packages/pohon/docs/content/3.components/page-links.md
    - label: 'Star on GitHub'
      icon: i-lucide-star
      to: https://github.com/nuxt/ui
    - label: 'Releases'
      icon: i-lucide-rocket
      to: https://github.com/nuxt/ui/releases
---
::

### Title

Use the `title` prop to display a title above the links.

::docs-pohon-preview
---
prettier: true
ignore:
  - links
external:
  - links
externalTypes:
  - PageLink[]
props:
  title: 'Community'
  links:
    - label: 'Edit this page'
      icon: i-lucide-file-pen
      to: https://github.com/vinicunca/akar/blob/main/packages/pohon/docs/content/3.components/page-links.md
    - label: 'Star on GitHub'
      icon: i-lucide-star
      to: https://github.com/nuxt/ui
    - label: 'Releases'
      icon: i-lucide-rocket
      to: https://github.com/nuxt/ui/releases
---
::

## Examples

::note
While these examples use [Nuxt Content](https://content.nuxt.com), the components can be integrated with any content management system.
::

### Within a page

Use the PageLinks component in the `bottom` slot of the ContentToc component to display a list of links below the table of contents.

```vue [pages/\[...slug\\].vue]{48-52}
<script setup lang="ts">
import type { PageLink } from 'pohon-ui'

const route = useRoute()

definePageMeta({
  layout: 'docs'
})

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('content', route.path)
})

const links = computed<PageLink[]>(() => [{
  icon: 'i-lucide-file-pen',
  label: 'Edit this page',
  to: `https://github.com/nuxt/ui/edit/v4/docs/content/${page?.value?.stem}.md`,
  target: '_blank'
}, {
  icon: 'i-lucide-star',
  label: 'Star on GitHub',
  to: 'https://github.com/nuxt/ui',
  target: '_blank'
}, {
  label: 'Releases',
  icon: 'i-lucide-rocket',
  to: 'https://github.com/nuxt/ui/releases'
}])
</script>

<template>
  <UPage>
    <UPageHeader :title="page.title" :description="page.description" />

    <UPageBody>
      <ContentRenderer :value="page" />

      <PSeparator />

      <PContentSurround :surround="surround" />
    </UPageBody>

    <template #right>
      <PContentToc :links="page.body.toc.links">
        <template #bottom>
          <PSeparator type="dashed" />

          <UPageLinks title="Community" :links="links" />
        </template>
      </PContentToc>
    </template>
  </UPage>
</template>
```

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
