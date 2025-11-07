---
category: element
description: A collection of links for navigating websites.
links:
  - label: Pohon
    to: /docs/pohon/components/navigation-menu
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/navigation-menu/index.ts
---

:docs-akar-preview{name="a-navigation-menu"}

## Features

::docs-highlights
---
features:
  - Can be controlled or uncontrolled.
  - Flexible layout structure with managed tab focus.
  - Supports submenus.
  - Optional active item indicator.
  - Full keyboard navigation.
  - Exposes CSS variables for advanced animation.
  - Supports custom timings.
---
::

## Anatomy

Import all parts and piece them together.

```vue
<script setup lang="ts">
import {
  ANavigationMenuContent,
  ANavigationMenuIndicator,
  ANavigationMenuItem,
  ANavigationMenuLink,
  ANavigationMenuList,
  ANavigationMenuRoot,
  ANavigationMenuSub,
  ANavigationMenuTrigger,
  ANavigationMenuViewport,
} from 'akar';
</script>

<template>
  <ANavigationMenuRoot>
    <ANavigationMenuList>
      <ANavigationMenuItem>
        <ANavigationMenuTrigger />
        <ANavigationMenuContent>
          <ANavigationMenuLink />
        </ANavigationMenuContent>
      </ANavigationMenuItem>

      <ANavigationMenuItem>
        <ANavigationMenuLink />
      </ANavigationMenuItem>

      <ANavigationMenuItem>
        <ANavigationMenuTrigger />
        <ANavigationMenuContent>
          <ANavigationMenuSub>
            <ANavigationMenuList />
            <ANavigationMenuViewport />
          </ANavigationMenuSub>
        </ANavigationMenuContent>
      </ANavigationMenuItem>

      <ANavigationMenuIndicator />
    </ANavigationMenuList>

    <ANavigationMenuViewport />
  </ANavigationMenuRoot>
</template>
```

## API Reference

### Root

Contains all the parts of a navigation menu.

:docs-component-meta{name="a-navigation-menu-root"}

:docs-data-attributes-table{keys="orientation"}

### Sub

Signifies a submenu. Use it in place of the root part when nested to create a submenu.

:docs-component-meta{name="a-navigation-menu-sub"}

:docs-data-attributes-table{keys="orientation"}

### List

Contains the top level menu items.

:docs-component-meta{name="a-navigation-menu-list"}

:docs-data-attributes-table{keys="orientation"}

### Item

A top level menu item, contains a link or trigger with content combination.

:docs-component-meta{name="a-navigation-menu-item"}

### Trigger

The button that toggles the content.

:docs-component-meta{name="a-navigation-menu-trigger"}

:docs-data-attributes-table{keys="state, disabled"}

### Content

Contains the content associated with each trigger.

:docs-presence-tip

:docs-component-meta{name="a-navigation-menu-content"}

:docs-data-attributes-table{keys="state, motion, orientation"}

### Link

A navigational link.

:docs-component-meta{name="a-navigation-menu-link"}

:docs-data-attributes-table{keys="active"}

### Indicator

An optional indicator element that renders below the list, is used to highlight the currently active trigger.

:docs-presence-tip

:docs-component-meta{name="a-navigation-menu-indicator"}

:docs-data-attributes-table{keys="visible, orientation"}

::docs-css-variables-table
---
data:
  - cssVariable: --akar-navigation-menu-indicator-size
    description: The size of the indicator.
  - cssVariable: --akar-navigation-menu-indicator-position
    description: The position of the indicator
---
::

### Viewport

An optional viewport element that is used to render active content outside of the list.

:docs-presence-tip

:docs-component-meta{name="a-navigation-menu-viewport"}

:docs-data-attributes-table{keys="visible, orientation"}

::docs-css-variables-table
---
data:
  - cssVariable: --akar-navigation-menu-viewport-width
    description: The width of the viewport when visible/hidden, computed from the active content
  - cssVariable: --akar-navigation-menu-viewport-height
    description: The height of the viewport when visible/hidden, computed from the active content
---
::

## Examples

### Vertical

You can create a vertical menu by using the `orientation` prop.

```vue {16}
<script setup lang="ts">
import {
  ANavigationMenuContent,
  ANavigationMenuIndicator,
  ANavigationMenuItem,
  ANavigationMenuLink,
  ANavigationMenuList,
  ANavigationMenuRoot,
  ANavigationMenuSub,
  ANavigationMenuTrigger,
  ANavigationMenuViewport,
} from 'akar'
</script>

<template>
  <ANavigationMenuRoot orientation="vertical">
    <ANavigationMenuList>
      <ANavigationMenuItem>
        <ANavigationMenuTrigger>Item one</ANavigationMenuTrigger>
        <ANavigationMenuContent>Item one content</ANavigationMenuContent>
      </ANavigationMenuItem>
      <ANavigationMenuItem>
        <ANavigationMenuTrigger>Item two</ANavigationMenuTrigger>
        <ANavigationMenuContent>Item Two content</ANavigationMenuContent>
      </ANavigationMenuItem>
    </ANavigationMenuList>
  </ANavigationMenuRoot>
</template>
```

### Flexible layouts

Use the `Viewport` part when you need extra control over where `Content` is rendered. This can be helpful when your design
requires an adjusted DOM structure or if you need flexibility to achieve [advanced animation](/docs/components/navigation-menu#advanced-animation).
Tab focus will be maintained automatically.

```vue {26}
<script setup lang="ts">
import {
  ANavigationMenuContent,
  ANavigationMenuItem,
  ANavigationMenuList,
  ANavigationMenuRoot,
  ANavigationMenuTrigger,
  ANavigationMenuViewport,
} from 'akar'
</script>

<template>
  <ANavigationMenuRoot>
    <ANavigationMenuList>
      <ANavigationMenuItem>
        <ANavigationMenuTrigger>Item one</ANavigationMenuTrigger>
        <ANavigationMenuContent>Item one content</ANavigationMenuContent>
      </ANavigationMenuItem>
      <ANavigationMenuItem>
        <ANavigationMenuTrigger>Item two</ANavigationMenuTrigger>
        <ANavigationMenuContent>Item two content</ANavigationMenuContent>
      </ANavigationMenuItem>
    </ANavigationMenuList>

    <!-- ANavigationMenuContent will be rendered here when active  -->
    <ANavigationMenuViewport />
  </ANavigationMenuRoot>
</template>
```

### With indicator

You can use the optional `Indicator` part to highlight the currently active `Trigger`, this is useful when you want to provide
an animated visual cue such as an arrow or highlight to accompany the `Viewport`.

```vue {24}
<script setup lang="ts">
import {
  ANavigationMenuContent,
  ANavigationMenuItem,
  ANavigationMenuList,
  ANavigationMenuRoot,
  ANavigationMenuTrigger,
  ANavigationMenuViewport,
} from 'akar'
</script>

<template>
  <ANavigationMenuRoot>
    <ANavigationMenuList>
      <ANavigationMenuItem>
        <ANavigationMenuTrigger>Item one</ANavigationMenuTrigger>
        <ANavigationMenuContent>Item one content</ANavigationMenuContent>
      </ANavigationMenuItem>
      <ANavigationMenuItem>
        <ANavigationMenuTrigger>Item two</ANavigationMenuTrigger>
        <ANavigationMenuContent>Item two content</ANavigationMenuContent>
      </ANavigationMenuItem>

      <ANavigationMenuIndicator class="ANavigationMenuIndicator" />
    </ANavigationMenuList>

    <ANavigationMenuViewport />
  </ANavigationMenuRoot>
</template>
```

```css
/* styles.css */
.ANavigationMenuIndicator {
  background-color: grey;
  position: absolute;
  transition: width, transform, 250ms ease;
}

.ANavigationMenuIndicator[data-orientation="horizontal"] {
  left: 0;
  height: 3px;
  transform: translateX(var(--akar-navigation-menu-indicator-position));
  width: var(--akar-navigation-menu-indicator-size);
}
```

### With submenus

Create a submenu by nesting your `ANavigationMenu` and using the `Sub` part in place of its `Root`.
Submenus work differently to `Root` navigation menus and are similar to [`Tabs`](/docs/components/tabs) in that one item should always be active, so be
sure to assign and set a `defaultValue`.

```vue {7,23-34}
<script setup lang="ts">
import {
  ANavigationMenuContent,
  ANavigationMenuItem,
  ANavigationMenuList,
  ANavigationMenuRoot,
  ANavigationMenuSub,
  ANavigationMenuTrigger,
  ANavigationMenuViewport,
} from 'akar'
</script>

<template>
  <ANavigationMenuRoot>
    <ANavigationMenuList>
      <ANavigationMenuItem>
        <ANavigationMenuTrigger>Item one</ANavigationMenuTrigger>
        <ANavigationMenuContent>Item one content</ANavigationMenuContent>
      </ANavigationMenuItem>
      <ANavigationMenuItem>
        <ANavigationMenuTrigger>Item two</ANavigationMenuTrigger>
        <ANavigationMenuContent>
          <ANavigationMenuSub default-value="sub1">
            <ANavigationMenuList>
              <ANavigationMenuItem value="sub1">
                <ANavigationMenuTrigger>Sub item one</ANavigationMenuTrigger>
                <ANavigationMenuContent> Sub item one content </ANavigationMenuContent>
              </ANavigationMenuItem>
              <ANavigationMenuItem value="sub2">
                <ANavigationMenuTrigger>Sub item two</ANavigationMenuTrigger>
                <ANavigationMenuContent> Sub item two content </ANavigationMenuContent>
              </ANavigationMenuItem>
            </ANavigationMenuList>
          </ANavigationMenuSub>
        </ANavigationMenuContent>
      </ANavigationMenuItem>
    </ANavigationMenuList>
  </ANavigationMenuRoot>
</template>
```

### With client side routing

If you need to use the `RouterLink` component provided by your routing package then we recommend adding `asChild="true"` to `ANavigationMenuLink`, or setting `as="RouterLink"`.
This will ensure accessibility and consistent keyboard control is maintained:

```vue {12-14,19-21}
<script setup lang="ts">
import { ANavigationMenuItem, ANavigationMenuList, ANavigationMenuRoot } from 'akar'

// RouterLink should be injected by default if using `vue-router`
</script>

<template>
  <ANavigationMenuRoot>
    <ANavigationMenuList>
      <ANavigationMenuItem>
        <ANavigationMenuLink as-child>
          <RouterLink to="/">
            Home
          </RouterLink>
          <ANavigationMenuLink />
        </ANavigationMenuLink>
      </ANavigationMenuItem>
      <ANavigationMenuItem>
        <ANavigationMenuLink
          :as="RouterLink"
          to="/about"
        >
          About
        </ANavigationMenuLink>
      </ANavigationMenuItem>
    </ANavigationMenuList>
  </ANavigationMenuRoot>
</template>
```

### Advanced animation

We expose `--akar-navigation-menu-viewport-[width|height]` and `data-motion['from-start'|'to-start'|'from-end'|'to-end']` attributes to allow you to animate `Viewport` size and `Content` position based on the enter/exit direction.

Combining these with `position: absolute;` allows you to create smooth overlapping animation effects when moving between items.

```vue {17,23,29}
<script setup lang="ts">
import {
  ANavigationMenuContent,
  ANavigationMenuItem,
  ANavigationMenuList,
  ANavigationMenuRoot,
  ANavigationMenuTrigger,
  ANavigationMenuViewport,
} from 'akar'
</script>

<template>
  <ANavigationMenuRoot>
    <ANavigationMenuList>
      <ANavigationMenuItem>
        <ANavigationMenuTrigger>Item one</ANavigationMenuTrigger>
        <ANavigationMenuContent class="ANavigationMenuContent">
          Item one content
        </ANavigationMenuContent>
      </ANavigationMenuItem>
      <ANavigationMenuItem>
        <ANavigationMenuTrigger>Item two</ANavigationMenuTrigger>
        <ANavigationMenuContent class="ANavigationMenuContent">
          Item two content
        </ANavigationMenuContent>
      </ANavigationMenuItem>
    </ANavigationMenuList>

    <ANavigationMenuViewport class="ANavigationMenuViewport" />
  </ANavigationMenuRoot>
</template>
```



```css {9-20,24,25}
/* styles.css */
.ANavigationMenuContent {
  position: absolute;
  top: 0;
  left: 0;
  animation-duration: 250ms;
  animation-timing-function: ease;
}
.ANavigationMenuContent[data-motion="from-start"] {
  animation-name: enterFromLeft;
}
.ANavigationMenuContent[data-motion="from-end"] {
  animation-name: enterFromRight;
}
.ANavigationMenuContent[data-motion="to-start"] {
  animation-name: exitToLeft;
}
.ANavigationMenuContent[data-motion="to-end"] {
  animation-name: exitToRight;
}

.ANavigationMenuViewport {
  position: relative;
  width: var(--akar-navigation-menu-viewport-width);
  height: var(--akar-navigation-menu-viewport-height);
  transition: width, height, 250ms ease;
}

@keyframes enterFromRight {
  from {
    opacity: 0;
    transform: translateX(200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes enterFromLeft {
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes exitToRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(200px);
  }
}

@keyframes exitToLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-200px);
  }
}
```

## Accessibility

Adheres to the [`navigation` role requirements](https://www.w3.org/TR/wai-aria-1.2/#navigation).

### Differences to menubar

`ANavigationMenu` should not be confused with `menubar`, although this primitive shares the name `menu` in the colloquial sense to refer to a set of navigation links, it does not use the WAI-ARIA `menu` role.
This is because `menu` and `menubars` behave like native operating system menus most commonly found in desktop application windows, as such they feature complex functionality like composite focus management and first-character navigation.

These features are often considered [unnecessary for website navigation](https://github.com/w3c/aria-practices/issues/353) and at worst can confuse users who are familiar with established website patterns.

See the W3C [Disclosure Navigation Menu](https://w3c.github.io/aria-practices/examples/disclosure/disclosure-navigation.html) example for more information.

### Link usage and aria-current

It's important to use `ANavigationMenuLink` for all navigational links within a menu, this not only applies to the main list
but also within any content rendered via `ANavigationMenuContent`. This will ensure consistent keyboard interactions and accessibility
while also giving access to the `active` prop for setting `aria-current` and the active styles.
See [this example](/docs/akar/components/navigation-menu#with-client-side-routing) for more information on usage with third party routing components.

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-navigation-menu
data:
  - keys: ['Space', 'Enter']
    description: '<span>When focus is on <code>ANavigationMenuTrigger</code>, opens the content.</span>'
  - keys: ['Tab']
    description: 'Moves focus to the next focusable element.'
  - keys: ['ArrowDown']
    description: '<span> When <code>horizontal</code> and focus is on an open <code>ANavigationMenuTrigger</code>, moves focus into <code>ANavigationMenuContent</code>. <br /> Moves focus to the next <code>ANavigationMenuTrigger</code> or <code>ANavigationMenuLink</code>.</span>'
  - keys: ['ArrowUp']
    description: '<span>Moves focus to the previous <code>ANavigationMenuTrigger</code> or <code>ANavigationMenuLink</code>.</span>'
  - keys: ['ArrowRight', 'ArrowLeft']
    description: '<span> When <code>vertical</code> and focus is on an open <code>ANavigationMenuTrigger</code>, moves focus into its <code>ANavigationMenuContent</code>. <br /> Moves focus to the next / previous <code> ANavigationMenuTrigger </code> or <code>ANavigationMenuLink</code>.</span>'
  - keys: ['Home', 'End']
    description: '<span>Moves focus to the first/last <code>ANavigationMenu.Trigger</code> or <code>ANavigationMenu.Link</code>.</span>'
  - keys: ['Esc']
    description: '<span>Closes open <code>ANavigationMenu.Content</code> and moves focus to its<code>ANavigationMenu.Trigger</code>.</span>'
---
::
