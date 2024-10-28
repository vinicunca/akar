<script lang="ts">
import type { ReferenceElement } from '@floating-ui/vue';
import type { Ref } from 'vue';

import { createContext } from '~~/shared';

interface APopperRootContext {
  anchor: Ref<ReferenceElement | undefined >;
  onAnchorChange: (element: ReferenceElement | undefined) => void;
}

export const [
  injectAPopperRootContext,
  provideAPopperRootContext,
] = createContext<APopperRootContext>('APopperRoot');
</script>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const anchor = ref<ReferenceElement>();

provideAPopperRootContext({
  anchor,
  onAnchorChange: (element) => {
    anchor.value = element;
  },
});
</script>

<template>
  <slot />
</template>
