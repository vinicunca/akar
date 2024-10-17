<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ATagsInputClearProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectATagsInputRootContext } from './a-tags-input-root.vue';

const props = withDefaults(
  defineProps<ATagsInputClearProps>(),
  {
    as: 'button',
  },
);

useForwardExpose();

const context = injectATagsInputRootContext();

function handleCancel() {
  if (context.disabled.value) {
    return;
  }
  context.modelValue.value = [];
}
</script>

<template>
  <APrimitive
    v-bind="props"
    :type="as === 'button' ? 'button' : undefined"
    :data-disabled="context.disabled.value ? '' : undefined"
    @click="handleCancel"
  >
    <slot />
  </APrimitive>
</template>
