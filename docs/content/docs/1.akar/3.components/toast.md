---
category: overlay
description: A succinct message to provide information or feedback to the user.
links:
  - label: Pohon
    to: /docs/pohon/components/toast
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/toast/index.ts
---

:docs-component-example{name="a-toast"}

## Features

::docs-highlights
---
features:
  - Automatically closes.
  - Pauses closing on hover, focus and window blur.
  - Supports hotkey to jump to toast viewport.
  - Supports closing via swipe gesture.
  - Exposes CSS variables for swipe gesture animations.
  - Can be controlled or uncontrolled.
---
::

## Anatomy

Import the component.

```vue
<script setup lang="ts">
import { AToastAction, AToastClose, AToastDescription, AToastProvider, AToastRoot, AToastTitle, AToastViewport } from 'akar';
</script>

<template>
  <AToastProvider>
    <AToastRoot>
      <AToastTitle />
      <AToastDescription />
      <AToastAction />
      <AToastClose />
    </AToastRoot>

    <AToastViewport />
  </AToastProvider>
</template>
```

## Pohon

:docs-akar-to-pohon{to="/docs/pohon/components/toast"}

## API Reference

### Provider

The provider that wraps your toasts and toast viewport. It usually wraps the application.

:docs-component-meta{name="a-toast-provider"}

### Viewport

The fixed area where toasts appear. Users can jump to the viewport by pressing a hotkey. It is up to you to ensure the discoverability of the hotkey for keyboard users.

:docs-component-meta{name="a-toast-viewport"}

### Root

The toast that automatically closes. It should not be held open to [acquire a user response](/docs/akar/components/toast#action).

:docs-presence-tip

:docs-component-meta{name="a-toast-root"}

::docs-data-attributes-table
---
data:
  - attribute: '[data-state]'
    values:
      - open
      - closed
  - attribute: '[data-swipe-direction]'
    values:
      - up
      - down
      - left
      - right
  - attribute: '[data-swipe]'
    values:
      - start
      - move
      - cancel
      - end
---
::

::docs-css-variables-table
---
data:
  - cssVariable: '--akar-toast-swipe-move-x'
    description: 'The offset position of the toast when horizontally swiping'
  - cssVariable: '--akar-toast-swipe-move-y'
    description: 'The offset position of the toast when vertically swiping'
  - cssVariable: '--akar-toast-swipe-end-x'
    description: 'The offset end position of the toast after horizontally swiping'
  - cssVariable: '--akar-toast-swipe-end-y'
    description: 'The offset end position of the toast after vertically swiping'
---
::

### Portal

When used, portals the content part into the `body`.

:docs-component-meta{name="a-toast-portal"}

### Title

An optional title for the toast

:docs-component-meta{name="a-toast-title"}

### Description

The toast message.

:docs-component-meta{name="a-toast-description"}

### Action

An action that is safe to ignore to ensure users are not expected to complete tasks with unexpected side effects as a result of a [time limit](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-required-behaviors.html).

When obtaining a user response is necessary, portal an ["AlertDialog"](/docs/akar/components/alert-dialog) styled as a toast into the viewport instead.

:docs-component-meta{name="a-toast-action"}

### Close

A button that allows users to dismiss the toast before its duration has elapsed.

:docs-component-meta{name="a-toast-close"}

## Examples

### Custom hotkey

Override the default hotkey using the `event.code` value for each key from [keycode.info](https://keycode.info/).

```vue {4}
<template>
  <AToastProvider>
    ...
    <AToastViewport :hotkey="['altKey', 'KeyT']" />
  </AToastProvider>
</template>
```

### Custom duration

Customise the duration of a toast to override the provider value.

```vue {2}
<template>
  <AToastRoot :duration="3000">
    <AToastDescription>Saved!</AToastDescription>
  </AToastRoot>
</template>
```

### Duplicate toasts

When a toast must appear every time a user clicks a button, use state to render multiple instances of the same toast (see below). Alternatively, you can abstract the parts to create your own [imperative API](/docs/akar/components/toast#imperative-api).

```vue {3,8}
<template>
  <div>
    <form @submit="count++">
      ...
      <button>save</button>
    </form>

    <AToastRoot
      v-for="(_, index) in count"
      :key="index"
    >
      <AToastDescription>Saved!</AToastDescription>
    </AToastRoot>
  </div>
</template>
```

### Animating swipe gesture

Combine `--akar-toast-swipe-move-[x|y]` and `--akar-toast-swipe-end-[x|y]` CSS variables with `data-swipe="[start|move|cancel|end]"` attributes to animate a swipe to close gesture. Here's an example:

```vue {2}
<template>
  <AToastProvider swipe-direction="right">
    <AToastRoot class="AToastRoot">
      ...
    </AToastRoot>
    <AToastViewport />
  </AToastProvider>
</template>
```

```css {2,3,5,9,15}
/* styles.css */
.AToastRoot[data-swipe='move'] {
  transform: translateX(var(--akar-toast-swipe-move-x));
}
.AToastRoot[data-swipe='cancel'] {
  transform: translateX(0);
  transition: transform 200ms ease-out;
}
.AToastRoot[data-swipe='end'] {
  animation: slideRight 100ms ease-out;
}

@keyframes slideRight {
  from {
    transform: translateX(var(--akar-toast-swipe-end-x));
  }
  to {
    transform: translateX(100%);
  }
}
```

## Accessibility

Adheres to the [`aria-live` requirements](https://www.w3.org/TR/wai-aria/#aria-live).

### Sensitivity

Control the sensitivity of the toast for screen readers using the `type` prop.

For toasts that are the result of a user action, choose `foreground`. AToasts generated from background tasks should use `background`.

#### Foreground

Foreground toasts are announced immediately. Assistive technologies may choose to clear previously queued messages when a foreground toast appears. Try to avoid stacking distinct foreground toasts at the same time.

#### Background

Background toasts are announced at the next graceful opportunity, for example, when the screen reader has finished reading its current sentence. They do not clear queued messages so overusing them can be perceived as a laggy user experience for screen reader users when used in response to a user interaction.

```vue {2,7}
<template>
  <AToastRoot type="foreground">
    <AToastDescription>File removed successfully.</AToastDescription>
    <AToastClose>Dismiss</AToastClose>
  </AToastRoot>

  <AToastRoot type="background">
    <AToastDescription>We've just released akar</AToastDescription>
    <AToastClose>Dismiss</AToastClose>
  </AToastRoot>
</template>
```

### Alternative action

Use the `altText` prop on the `Action` to instruct an alternative way of actioning the toast to screen reader users.

You can direct the user to a permanent place in your application where they can action it or implement your own custom hotkey logic. If implementing the latter, use `foreground` type to announce immediately and increase the duration to give the user ample time.

```vue {5,11,13}
<template>
  <AToastRoot type="background">
    <AToastTitle>Upgrade Available!</AToastTitle>
    <AToastDescription>We've just released akar</AToastDescription>
    <AToastAction alt-text="Goto account settings to upgrade">
      Upgrade
    </AToastAction>
    <AToastClose>Dismiss</AToastClose>
  </AToastRoot>

  <AToastRoot
    type="foreground"
    :duration="10000"
  >
    <AToastDescription>File removed successfully.</AToastDescription>
    <AToastAction alt-text="Undo (Alt+U)">
      Undo <kbd>Alt</kbd>+<kbd>U</kbd>
    </AToastAction>
    <AToastClose>Dismiss</AToastClose>
  </AToastRoot>
</template>
```

### Close icon button

When providing an icon (or font icon), remember to label it correctly for screen reader users.

```vue {4-5}
<template>
  <AToastRoot type="foreground">
    <AToastDescription>Saved!</AToastDescription>
    <AToastClose aria-label="Close">
      <span aria-hidden="true">×</span>
    </AToastClose>
  </AToastRoot>
</template>
```

### Keyboard Interactions

::docs-keyboard-table
---
name: keyboard-a-toast
data:
  - keys: ['F8']
    description: Focuses toasts viewport.
  - keys: ['Tab']
    description: Moves focus to the next focusable element.
  - keys: ['Shift + Tab']
    description: Moves focus to the previous focusable element.
  - keys: ['Space']
    description: When focus is on a `AToastAction` or `AToastClose`, closes the toast.
  - keys: ['Enter']
    description: When focus is on a `AToastAction` or `AToastClose`, closes the toast.
  - keys: ['Esc']
    description: When focus is on a `AToast`, closes the toast.
---
::

## Custom APIs

### Abstract parts

Create your own API by abstracting the primitive parts into your own component.

#### Usage

```vue
<script setup lang="ts">
import AToast from './your-toast.vue';
</script>

<template>
  <AToast
    title="Upgrade available"
    content="We've just released Radix 3.0!"
  >
    <button @click="handleUpgrade">
      Upgrade
    </button>
  </AToast>
</template>
```

#### Implementation

```vue
// your-toast.vue
<script setup lang="ts">
import { AToastAction, AToastClose, AToastDescription, AToastRoot, AToastTitle } from 'akar';

defineProps<{
  title: string;
  content: string;
}>();
</script>

<template>
  <AToastRoot>
    <AToastTitle v-if="title">
      {{ title }}
    </AToastTitle>
    <AToastDescription v-if="content">
      {{ content }}
    </AToastDescription>
    <AToastAction
      as-child
      alt-text="toast"
    >
      <slot />
    </AToastAction>
    <AToastClose aria-label="Close">
      <span aria-hidden="true">×</span>
    </AToastClose>
  </AToastRoot>
</template>
```

### Imperative API

Create your own imperative API to allow [toast duplication](/docs/akar/components/toast#duplicate-toasts) if preferred.

#### Usage

```vue
<script setup lang="ts">
import AToast from './your-toast.vue';

const savedRef = ref<InstanceType<typeof AToast>>();
</script>

<template>
  <div>
    <form @submit="savedRef.publish()">
      ...
    </form>
    <AToast ref="savedRef">
      Saved successfully!
    </AToast>
  </div>
</template>
```

#### Implementation

```vue
// your-toast.vue
<script setup lang="ts">
import { AToastClose, AToastDescription, AToastRoot } from 'akar';
import { ref } from 'vue';

const count = ref(0);

function publish() {
  count.value++;
}

defineExpose({
  publish
});
</script>

<template>
  <AToastRoot
    v-for="index in count"
    :key="index"
  >
    <AToastDescription>
      <slot />
    </AToastDescription>
    <AToastClose>Dismiss</AToastClose>
  </AToastRoot>
</template>
```
