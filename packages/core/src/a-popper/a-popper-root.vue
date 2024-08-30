<script lang="ts">
import type { Ref } from 'vue';

import { createContext } from '~~/shared';

export interface Measurable {
  getBoundingClientRect: () => DOMRect;
}

interface PopperRootContext {
  anchor: Ref<HTMLElement | Measurable | undefined>;
  onAnchorChange: (element: HTMLElement | Measurable | undefined) => void;
}

export const [injectPopperRootContext, providePopperRootContext]
  = createContext<PopperRootContext>('PopperRoot');
</script>

<script setup lang="ts">
import { ref } from 'vue';

const anchor = ref<HTMLElement | Measurable>();

providePopperRootContext({
  anchor,
  onAnchorChange: (element) => {
    anchor.value = element;
  },
});
</script>

<template>
  <slot />
</template>
