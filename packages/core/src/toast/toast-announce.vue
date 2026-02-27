<script setup lang="ts">
import { useRafFn } from '@vueuse/core';
import { useTimeout } from '@vueuse/shared';
import { ref } from 'vue';
import { AVisuallyHidden } from '../visually-hidden';
import { injectAToastProviderContext } from './toast-provider.vue';

const providerContext = injectAToastProviderContext();

const isAnnounced = useTimeout(1000);
const renderAnnounceText = ref(false);

useRafFn(() => {
  renderAnnounceText.value = true;
});
</script>

<template>
  <AVisuallyHidden
    v-if="isAnnounced || renderAnnounceText"
    feature="fully-hidden"
  >
    {{ providerContext.label.value }}
    <slot />
  </AVisuallyHidden>
</template>
