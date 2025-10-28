---
title: Footer
description: 'A responsive footer component.'
category: layout
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/Footer.vue
---

## Usage

The Footer component renders a `<footer>` element.

Use the `left`, `default` and `right` slots to customize the footer.

::docs-component-example
---
prettier: true
collapse: true
name: 'footer-example'
class: '!p-0'
props:
  class: 'w-full'
---
::

::note
In this example, we use the [NavigationMenu](/docs/pohon/components/navigation-menu) component to render the footer links in the center.
::

::tip{to="/docs/pohon/components/footer-columns"}
You can use the [FooterColumns](/docs/pohon/components/footer-columns) component to display a list of links inside the `top` slot.
::

## Examples

### Within `app.vue`

Use the Footer component in your `app.vue` or in a layout:

```vue [app.vue]{32-67}
<script setup lang="ts">
import type { PNavigationMenuItem } from 'pohon-ui'

const items: PNavigationMenuItem[] = [{
  label: 'Figma Kit',
  to: 'https://go.vinicunca.dev/figma-ui',
  target: '_blank'
}, {
  label: 'Playground',
  to: 'https://stackblitz.com/edit/pohon-ui',
  target: '_blank'
}, {
  label: 'Releases',
  to: 'https://github.com/vinicunca/akar/releases',
  target: '_blank'
}]
</script>

<template>
  <PApp>
    <PHeader />

    <PMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </PMain>

    <PSeparator icon="i-simple-icons-nuxtdotjs" type="dashed" class="h-px" />

    <PFooter>
      <template #left>
        <p class="text-muted text-sm">
          Copyright © {{ new Date().getFullYear() }}
        </p>
      </template>

      <PNavigationMenu :items="items" variant="link" />

      <template #right>
        <PButton
          icon="i-simple-icons-discord"
          color="neutral"
          variant="ghost"
          to="https://akar.vinicunca.dev/discord"
          target="_blank"
          aria-label="Discord"
        />
        <PButton
          icon="i-simple-icons-x"
          color="neutral"
          variant="ghost"
          to="https://akar.vinicunca.dev/x"
          target="_blank"
          aria-label="X"
        />
        <PButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/nuxt"
          target="_blank"
          aria-label="GitHub"
        />
      </template>
    </PFooter>
  </PApp>
</template>
```

::note
In this example, we use the [Separator](/docs/pohon/components/separator) component to add a border above the footer.
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
