---
title: Card
description: 'Create highlighted content blocks with optional links and navigation.'
framework: nuxt
category: components
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/prose/Card.vue
---

## Usage

Use markdown in the default slot of the `card` component to highlight your content.

Use the `title`, `icon` and `color` props to customize it. You can also pass any property from the [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link) component.

::docs-pohon-preview{slug="card" prose}
---
hide:
  - class
ignore:
  - target
props:
  class: 'akar:my-0 w-96'
  title: Startup
  icon: i-lucide:users
  color: primary
  to: 'https://nuxt.lemonsqueezy.com'
  target: '_blank'
slots:
  default: Best suited for small teams, startups and agencies with up to 5 developers.
---

Best suited for small teams, startups and agencies with up to 5 developers.
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
