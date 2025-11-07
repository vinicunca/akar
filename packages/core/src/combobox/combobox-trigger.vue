<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AComboboxTriggerProps extends APrimitiveProps {
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean;
}
</script>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { APrimitive } from '../primitive';
import { useForwardExpose } from '../shared';
import { injectAComboboxRootContext } from './combobox-root.vue';

const props = withDefaults(defineProps<AComboboxTriggerProps>(), {
  as: 'button',
});

const { forwardRef, currentElement } = useForwardExpose();
const rootContext = injectAComboboxRootContext();
const disabled = computed(() => props.disabled || rootContext.disabled.value || false);

onMounted(() => {
  if (currentElement.value) {
    rootContext.onTriggerElementChange(currentElement.value);
  }
});
</script>

<template>
  <APrimitive
    v-bind="props"
    :ref="forwardRef"
    :type="as === 'button' ? 'button' : undefined"
    tabindex="-1"
    aria-label="Show popup"
    aria-haspopup="listbox"
    :aria-expanded="rootContext.open.value"
    :aria-controls="rootContext.contentId"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    :disabled="disabled"
    :data-disabled="disabled ? '' : undefined"
    :aria-disabled="disabled ?? undefined"
    @click="rootContext.onOpenChange(!rootContext.open.value)"
  >
    <slot />
  </APrimitive>
</template>
