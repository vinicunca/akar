<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { isDeepEqual } from '@vinicunca/perkakas';
import { computed } from 'vue';
import { useForwardExpose } from '~~/shared';
import { injectATagsInputItemContext } from './tags-input-item.vue';
import { injectATagsInputRootContext } from './tags-input-root.vue';

export interface ATagsInputItemDeleteProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';

const props = withDefaults(defineProps<ATagsInputItemDeleteProps>(), {
  as: 'button',
});

useForwardExpose();
const context = injectATagsInputRootContext();
const itemContext = injectATagsInputItemContext();

const disabled = computed(() => itemContext.disabled?.value || context.disabled.value);

function handleDelete() {
  if (disabled.value) {
    return;
  }
  const index = context.modelValue.value.findIndex((i) => isDeepEqual(i === itemContext.value.value));
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
