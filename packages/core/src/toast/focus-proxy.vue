<script setup lang="ts">
import { AVisuallyHidden } from '../visually-hidden';
import { injectAToastProviderContext } from './toast-provider.vue';

const emits = defineEmits<{
  focusFromOutsideViewport: [void];
}>();

const providerContext = injectAToastProviderContext();
</script>

<template>
  <AVisuallyHidden
    aria-hidden="true"
    tabindex="0"
    style="position: fixed"
    @focus="(event: FocusEvent) => {
      const prevFocusedElement = event.relatedTarget as HTMLElement | null;
      const isFocusFromOutsideViewport = !providerContext.viewport.value?.contains(prevFocusedElement);
      if (isFocusFromOutsideViewport) emits('focusFromOutsideViewport');
    }"
  >
    <slot />
  </AVisuallyHidden>
</template>
