---
title: Error
description: 'A pre-built error component with NuxtError support.'
category: layout
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/error.vue
---

## Usage

The Error component works together with the [Header](/docs/pohon/components/header) component to create a full-height layout that extends to the viewport's available height.

### Error

Use the `error` prop to display an error message.

::note{to="https://nuxt.com/docs/guide/directory-structure/error" target="_blank"}
In most cases, you will receive the `error` prop in your `error.vue` file.
::

::docs-pohon-preview
---
hide:
  - class
prettier: true
props:
  error:
    statusCode: 404
    statusMessage: 'Page not found'
    message: 'The page you are looking for does not exist.'
  class: 'akar:min-h-96'
---
::

### Clear

Use the `clear` prop to customize or hide the clear button (with `false` value).

You can pass any property from the [Button](/docs/pohon/components/button) component to customize it.

::docs-pohon-preview
---
prettier: true
hide:
  - class
ignore:
  - error.statusCode
  - error.statusMessage
  - error.message
  - clear.color
  - clear.size
  - clear.icon
  - clear.class
props:
  clear:
    color: neutral
    size: xl
    icon: i-lucide:arrow-left
    class: 'akar:rounded-full'
  error:
    statusCode: 404
    statusMessage: 'Page not found'
    message: 'The page you are looking for does not exist.'
  class: 'akar:min-h-96'
---
::

### Redirect

Use the `redirect` prop to redirect the user to a different page when the clear button is clicked. Defaults to `/`.

::docs-pohon-preview
---
prettier: true
hide:
  - class
ignore:
  - error.statusCode
  - error.statusMessage
  - error.message
props:
  redirect: '/docs/pohon/getting-started'
  error:
    statusCode: 404
    statusMessage: 'Page not found'
    message: 'The page you are looking for does not exist.'
  class: 'akar:min-h-96'
---
::

## Examples

### Within `error.vue`

Use the Error component in your `error.vue`:

```vue [error.vue]{13}
<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <PApp>
    <PHeader />

    <PError :error="error" />

    <PFooter />
  </PApp>
</template>
```

::tip
You might want to replicate the code of your `app.vue` inside your `error.vue` file to have the same layout and features, here is an example: <https://github.com/vinicunca/akar/blob/main/docs/app/error.vue>
::

::note
You can read more about how to handle errors in the [Nuxt documentation](https://nuxt.com/docs/getting-started/error-handling#error-page), but when using `nuxt generate` it is recommended to add `fatal: true` inside your `createError` call to make sure the error page is displayed:

```vue [pages/\[...slug\\].vue]
<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first();
});
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}
</script>
```

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
