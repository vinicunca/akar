<script lang="ts">
export interface ATeleportProps {
  /**
   * Disable teleport and render the component inline
   *
   * {@link https://vuejs.org/guide/built-ins/teleport.html#disabling-teleport}
   */
  disabled?: boolean;
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
  /**
   * Vue native teleport component prop `:to`
   *
   * {@link https://vuejs.org/guide/built-ins/teleport.html#basic-usage}
   */
  to?: HTMLElement | string;
}
</script>

<script setup lang="ts">
import { useMounted } from '@vueuse/core';

withDefaults(
  defineProps<ATeleportProps>(),
  {
    to: 'body',
  },
);

const isMounted = useMounted();
</script>

<template>
  <Teleport
    v-if="isMounted || forceMount"
    :to="to"
    :disabled="disabled"
  >
    <slot />
  </Teleport>
</template>
