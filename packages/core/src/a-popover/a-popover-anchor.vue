<script lang="ts">
import type { APopperAnchorProps } from '~~/a-popper';

import { useForwardExpose } from '~~/shared';

export interface APopoverAnchorProps extends APopperAnchorProps {}
</script>

<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue';

import { APopperAnchor } from '~~/a-popper';

import { injectAPopoverRootContext } from './a-popover-root.vue';

const props = defineProps<APopoverAnchorProps>();

useForwardExpose();
const rootContext = injectAPopoverRootContext();

onBeforeMount(() => {
  rootContext.hasCustomAnchor.value = true;
});
onUnmounted(() => {
  rootContext.hasCustomAnchor.value = false;
});
</script>

<template>
  <APopperAnchor v-bind="props">
    <slot />
  </APopperAnchor>
</template>
