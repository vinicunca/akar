---
description: An image element with a fallback for representing the user.
category: element
links:
  - label: Pohon
    to: /docs/pohon/components/avatar
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/avatar/index.ts
---

:docs-component-example{name="a-avatar"}

## Features

::docs-highlights
---
features:
  - Automatic and manual control over when the image renders.
  - Fallback part accepts any children.
  - Optionally delay fallback rendering to avoid content flashing.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { AAvatarImage, AAvatarRoot, AAvatarFallback } from 'akar';
</script>

<template>
  <AAvatarRoot>
    <AAvatarImage />
    <AAvatarFallback />
  </AAvatarRoot>
</template>
```

## API Reference

### Root

Contains all the parts of an avatar

:docs-component-meta{name="a-avatar-root"}

### Image

The image to render. By default it will only render when it has loaded. You can use the `@loadingStatusChange` handler if you need more control.

:docs-component-meta{name="a-avatar-image"}

### Fallback

An element that renders when the image hasn't loaded. This means whilst it's loading, or if there was an error. If you notice a flash during loading, you can provide a `delayMs` prop to delay its rendering so it only renders for those with slower connections. For more control, use the `@loadingStatusChange` emit on `AAvatarImage`.

:docs-component-meta{name="a-avatar-fallback"}

## Examples

### Clickable Avatar with tooltip

You can compose the Avatar with a [Tooltip](/docs/akar/components/tooltip) to display extra information.

```vue {6-7,9,11-15}
<script setup>
import { AAvatarImage, AAvatarRoot, ATooltipArrow, ATooltipRoot, ATooltipTrigger } from 'akar';
</script>

<template>
  <ATooltipRoot>
    <ATooltipTrigger>
      <AAvatarRoot>…</AAvatarRoot>
    </ATooltipTrigger>

    <ATooltipContent side="top">
      ATooltip content
      <ATooltipArrow />
    </ATooltipContent>
  </ATooltipRoot>
</template>
```
