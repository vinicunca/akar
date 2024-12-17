<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';
import { injectATagsInputRootContext } from './tags-input-root.vue';

export interface ATagsInputClearProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';

const props = withDefaults(defineProps<ATagsInputClearProps>(), {
  as: 'button',
});

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
