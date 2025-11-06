---
description: A carousel with motion and swipe built using Embla.
category: data
links:
  - label: Embla
    to: https://www.embla-carousel.com/api/
    icon: custom-embla-carousel
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/carousel.vue
---

## Usage

Use the Carousel component to display a list of items in a carousel.

::docs-component-example
---
collapse: true
name: 'carousel-items-example'
class: 'p-8'
---
::

::note
Use your mouse to drag the carousel horizontally on desktop.
::

### Items

Use the `items` prop as an array and render each item using the default slot:

::docs-component-example
---
name: 'carousel-items-example'
class: 'p-8'
---
::

You can also pass an array of objects with the following properties:

- `class?: any`{lang="ts-type"}
- `pohon?: { item?: ClassNameValue }`{lang="ts-type"}

You can control how many items are visible by using the [`basis`](https://tailwindcss.com/docs/flex-basis) / [`width`](https://tailwindcss.com/docs/width) utility classes on the `item`:

::docs-component-example
---
name: 'carousel-items-multiple-example'
class: 'p-8 px-16'
---
::

### Orientation

Use the `orientation` prop to change the orientation of the Progress. Defaults to `horizontal`.

::note
Use your mouse to drag the carousel vertically on desktop.
::

::docs-component-example
---
name: 'carousel-orientation-example'
class: 'p-8'
---
::

::caution
You need to specify a `height` on the container in vertical orientation.
::

### Arrows

Use the `arrows` prop to display prev and next buttons.

::docs-component-example
---
name: 'carousel-arrows-example'
class: 'p-8'
---
::

### Prev / Next

Use the `prev` and `next` props to customize the prev and next buttons with any [Button](/docs/pohon/components/button) props.

::docs-component-example
---
name: 'carousel-prev-next-example'
class: 'p-8'
---
::

### Prev / Next Icons

Use the `prev-icon` and `next-icon` props to customize the buttons [Icon](/docs/pohon/components/icon). Defaults to `i-lucide-arrow-left` / `i-lucide-arrow-right`.

::docs-component-example
---
name: 'carousel-prev-next-icon-example'
class: 'p-8'
options:
  - name: 'prevIcon'
    label: 'prevIcon'
    default: 'i-lucide-chevron-left'
  - name: 'nextIcon'
    label: 'nextIcon'
    default: 'i-lucide-chevron-right'
---
::

::docs-framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize these icons globally in your `app.config.ts` under `pohon.icons.arrowLeft` / `pohon.icons.arrowRight` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize these icons globally in your `vite.config.ts` under `pohon.icons.arrowLeft` / `pohon.icons.arrowRight` key.
:::
::

### Dots

Use the `dots` prop to display a list of dots to scroll to a specific slide.

::docs-component-example
---
name: 'carousel-dots-example'
class: 'p-8 pb-12'
---
::

The number of dots is based on the number of slides displayed in the view:

::docs-component-example
---
name: 'carousel-dots-multiple-example'
class: 'p-8 px-16 pb-12'
---
::

## Plugins

The Carousel component implements the official [Embla Carousel plugins](https://www.embla-carousel.com/plugins/).

### Autoplay

This plugin is used to extend Embla Carousel with **autoplay** functionality.

Use the `autoplay` prop as a boolean or an object to configure the [Autoplay plugin](https://www.embla-carousel.com/plugins/autoplay/).

::docs-component-example
---
name: 'carousel-autoplay-example'
class: 'p-8 px-16 pb-12'
---
::

::note
In this example, we're using the `loop` prop for an infinite carousel.
::

### Auto Scroll

This plugin is used to extend Embla Carousel with **auto scroll** functionality.

Use the `auto-scroll` prop as a boolean or an object to configure the [Auto Scroll plugin](https://www.embla-carousel.com/plugins/auto-scroll/).

::docs-component-example
---
name: 'carousel-auto-scroll-example'
class: 'p-8 px-16 pb-12'
---
::

::note
In this example, we're using the `loop` prop for an infinite carousel.
::

### Auto Height

This plugin is used to extend Embla Carousel with **auto height** functionality. It changes the height of the carousel container to fit the height of the highest slide in view.

Use the `auto-height` prop as a boolean or an object to configure the [Auto Height plugin](https://www.embla-carousel.com/plugins/auto-height/).

::docs-component-example
---
name: 'carousel-auto-height-example'
class: 'p-8 pt-16'
---
::

::note
In this example, we add the `transition-[height]` class on the container to animate the height change.
::

### Class Names

Class Names is a **class name toggle** utility plugin for Embla Carousel that enables you to automate the toggling of class names on your carousel.

Use the `class-names` prop as a boolean or an object to configure the [Class Names plugin](https://www.embla-carousel.com/plugins/class-names/).

::docs-component-example
---
name: 'carousel-class-names-example'
class: 'p-8'
---
::

::note
In this example, we add the `transition-opacity [&:not(.is-snapped)]:opacity-10` classes on the `item` to animate the opacity change.
::

### Fade

This plugin is used to replace the Embla Carousel scroll functionality with **fade transitions**.

Use the `fade` prop as a boolean or an object to configure the [Fade plugin](https://www.embla-carousel.com/plugins/fade/).

::docs-component-example
---
name: 'carousel-fade-example'
class: 'p-8 pb-12'
---
::

### Wheel Gestures

This plugin is used to extend Embla Carousel with the ability to **use the mouse/trackpad wheel** to navigate the carousel.

Use the `wheel-gestures` prop as a boolean or an object to configure the [Wheel Gestures plugin](https://www.embla-carousel.com/plugins/wheel-gestures/).

::note
Use your mouse wheel to scroll the carousel.
::

::docs-component-example
---
name: 'carousel-wheel-gestures-example'
class: 'p-8 px-16'
---
::

## Examples

### With thumbnails

You can use the [`emblaApi`](#expose) function [scrollTo](https://www.embla-carousel.com/api/methods/#scrollto) to display thumbnails under the carousel that allows you to navigate to a specific slide.

::docs-component-example
---
name: 'carousel-thumbnails-example'
class: 'p-8 px-16'
---
::

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

### Emits

:docs-pohon-emits

### Expose

You can access the typed component instance using [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref).

```vue
<script setup lang="ts">
const carousel = useTemplateRef('carousel')
</script>

<template>
  <PCarousel ref="carousel" />
</template>
```

This will give you access to the following:

| Name | Type |
| ---- | ---- |
| `emblaRef`{lang="ts-type"} | `Ref<HTMLElement \| null>`{lang="ts-type"} |
| `emblaApi`{lang="ts-type"} | [`Ref<EmblaCarouselType \| null>`{lang="ts-type"}](https://www.embla-carousel.com/api/methods/#typescript) |

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
