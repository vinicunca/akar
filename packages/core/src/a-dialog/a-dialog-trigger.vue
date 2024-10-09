<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ADialogTriggerProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { onMounted, useId } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectADialogRootContext } from './a-dialog-root.vue';

const props = withDefaults(
  defineProps<ADialogTriggerProps>(),
  {
    as: 'button',
  },
);
const rootContext = injectADialogRootContext();
const { forwardRef, currentElement } = useForwardExpose();

rootContext.contentId ||= useId();

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
