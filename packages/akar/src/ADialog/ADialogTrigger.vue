<script lang="ts">
import type { APrimitiveProps } from '~~/APrimitive';

export interface ADialogTriggerProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { onMounted } from 'vue';

import { APrimitive } from '~~/APrimitive';
import { useForwardExpose, useId } from '~~/shared';

import { injectADialogRootContext } from './ADialogRoot.vue';

const props = withDefaults(defineProps<ADialogTriggerProps>(), {
  as: 'button',
});
const rootContext = injectADialogRootContext();
const { currentElement, forwardRef } = useForwardExpose();

rootContext.contentId ||= useId(undefined, 'akar-dialog-content');
onMounted(() => {
  rootContext.triggerElement.value = currentElement.value;
});
</script>

<template>
  <APrimitive
    v-bind="props"
    :ref="forwardRef"
    :type="as === 'button' ? 'button' : undefined"
    aria-haspopup="dialog"
    :aria-expanded="rootContext.open.value || false"
    :aria-controls="rootContext.open.value ? rootContext.contentId : undefined"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    @click="rootContext.onOpenToggle"
  >
    <slot />
  </APrimitive>
</template>
