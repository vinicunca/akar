---
title: PageSection
description: 'A responsive section for your pages.'
category: page
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/PageSection.vue
---

## Usage

The PageSection component wraps your content in a [Container](/docs/pohon/components/container) while maintaining full-width flexibility making it easy to add background colors, images or patterns. It provides a flexible way to display content with an illustration in the default slot.

::code-preview

::u-page-section
---
title: 'Beautiful Vue UI components'
description: 'Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt.'
headline: 'Features'
features:
  - title: 'Icons'
    description: 'Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.'
    icon: 'i-lucide-smile'
    to: '/docs/getting-started/integrations/icons'
  - title: 'Fonts'
    description: 'Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.'
    icon: 'i-lucide-a-large-small'
    to: '/docs/getting-started/integrations/fonts'
  - title: 'Color Mode'
    description: 'Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.'
    icon: 'i-lucide-sun-moon'
    to: '/docs/getting-started/integrations/color-mode'
---
::

::

Use it after a [PageHero](/docs/pohon/components/page-hero) component:

```vue {4}
<template>
  <UPageHero />

  <UPageSection />
</template>
```

### Title

Use the `title` prop to set the title of the section.

::docs-pohon-preview
---
props:
  title: 'Beautiful Vue UI components'
---
::

### Description

Use the `description` prop to set the description of the section.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
props:
  title: 'Beautiful Vue UI components'
  description: 'Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt.'
---
::

### Headline

Use the `headline` prop to set the headline of the section.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - description
props:
  title: 'Beautiful Vue UI components'
  description: 'Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt.'
  headline: 'Features'
---
::

### Icon

Use the `icon` prop to set the icon of the section.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - description
props:
  title: 'Beautiful Vue UI components'
  description: 'Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt.'
  icon: 'i-lucide-rocket'
---
::

### Features

Use the `features` prop to display a list of [PageFeature](/docs/pohon/components/page-feature) under the description as an array of objects with the following properties:

- `title?: string`{lang="ts-type"}
- `description?: string`{lang="ts-type"}
- `icon?: string`{lang="ts-type"}
- `orientation?: 'horizontal' | 'vertical'`{lang="ts-type"}

You can pass any property from the [Link](/docs/pohon/components/link#props) component such as `to`, `target`, etc.

::docs-pohon-preview
---
prettier: true
external:
  - features
ignore:
  - title
  - description
  - features
props:
  title: 'Beautiful Vue UI components'
  description: 'Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt.'
  features:
    - title: 'Icons'
      description: 'Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.'
      icon: 'i-lucide-smile'
      to: '/docs/getting-started/integrations/icons'
    - title: 'Fonts'
      description: 'Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.'
      icon: 'i-lucide-a-large-small'
      to: '/docs/getting-started/integrations/fonts'
    - title: 'Color Mode'
      description: 'Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.'
      icon: 'i-lucide-sun-moon'
      to: '/docs/getting-started/integrations/color-mode'
---
::

### Links

Use the `links` prop to display a list of [Button](/docs/pohon/components/button) under the description.

::docs-pohon-preview
---
prettier: true
external:
  - links
ignore:
  - title
  - description
  - links
props:
  title: 'Beautiful Vue UI components'
  description: 'Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt.'
  links:
    - label: 'Get started'
      to: '/docs/getting-started'
      icon: 'i-lucide-square-play'
      color: 'neutral'
    - label: 'Explore components'
      to: '/docs/pohon/components/app'
      color: 'neutral'
      variant: 'subtle'
      trailingIcon: 'i-lucide-arrow-right'
---
::

### Orientation

Use the `orientation` prop to change the orientation with the default slot. Defaults to `vertical`.

::docs-pohon-preview
---
prettier: true
external:
  - features
  - links
ignore:
  - title
  - description
  - icon
  - features
  - links
props:
  title: 'Beautiful Vue UI components'
  description: 'Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt.'
  icon: 'i-lucide-rocket'
  orientation: horizontal
  features:
    - title: 'Icons'
      description: 'Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.'
      icon: 'i-lucide-smile'
      to: '/docs/getting-started/integrations/icons'
    - title: 'Fonts'
      description: 'Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.'
      icon: 'i-lucide-a-large-small'
      to: '/docs/getting-started/integrations/fonts'
    - title: 'Color Mode'
      description: 'Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.'
      icon: 'i-lucide-sun-moon'
      to: '/docs/getting-started/integrations/color-mode'
  links:
    - label: 'Explore components'
      to: '/docs/pohon/components/app'
      color: 'neutral'
      variant: 'subtle'
      trailingIcon: 'i-lucide-arrow-right'
slots:
  default: |

    <img src="https://picsum.photos/704/1294" width="352" height="647" alt="Illustration" class="w-full rounded-lg" />
---

:img{src="https://picsum.photos/704/1294" width="352" height="647" alt="Illustration" class="w-full rounded-lg"}
::

### Reverse

Use the `reverse` prop to reverse the orientation of the default slot.

::docs-pohon-preview
---
prettier: true
external:
  - features
  - links
ignore:
  - title
  - description
  - icon
  - features
  - links
props:
  title: 'Beautiful Vue UI components'
  description: 'Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt.'
  icon: 'i-lucide-rocket'
  orientation: horizontal
  reverse: true
  features:
    - title: 'Icons'
      description: 'Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.'
      icon: 'i-lucide-smile'
      to: '/docs/getting-started/integrations/icons'
    - title: 'Fonts'
      description: 'Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.'
      icon: 'i-lucide-a-large-small'
      to: '/docs/getting-started/integrations/fonts'
    - title: 'Color Mode'
      description: 'Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.'
      icon: 'i-lucide-sun-moon'
      to: '/docs/getting-started/integrations/color-mode'
  links:
    - label: 'Explore components'
      to: '/docs/pohon/components/app'
      color: 'neutral'
      variant: 'subtle'
      trailingIcon: 'i-lucide-arrow-right'
slots:
  default: |

    <img src="https://picsum.photos/704/1294" width="352" height="647" alt="Illustration" class="w-full rounded-lg" />
---

:img{src="https://picsum.photos/704/1294" width="352" height="647" alt="Illustration" class="w-full rounded-lg"}
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
