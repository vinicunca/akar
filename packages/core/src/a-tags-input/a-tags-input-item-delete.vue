<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ATagsInputItemDeleteProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectATagsInputItemContext } from './a-tags-input-item.vue';
import { injectATagsInputRootContext } from './a-tags-input-root.vue';

const props = withDefaults(
  defineProps<ATagsInputItemDeleteProps>(),
  {
    as: 'button',
  },
);

useForwardExpose();

const context = injectATagsInputRootContext();
const itemContext = injectATagsInputItemContext();

const disabled = computed(() => itemContext.disabled?.value || context.disabled.value);

function handleDelete() {
  if (disabled.value) {
    return;
  }
  const index = context.modelValue.value.findIndex((i) => i === itemContext.value.value);
  context.onRemoveValue(index);
}
</script>

<template>
  <APrimitive
    tabindex="-1"
    v-bind="props"
    :aria-labelledby="itemContext.textId"
    :aria-current="itemContext.isSelected.value"
    :data-state="itemContext.isSelected.value ? 'active' : 'inactive'"
    :data-disabled="disabled ? '' : undefined"
    :type="as === 'button' ? 'button' : undefined"
    @click="handleDelete"
  >
    <slot />
  </APrimitive>
</template>
