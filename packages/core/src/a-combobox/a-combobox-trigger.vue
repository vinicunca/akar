<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AComboboxTriggerProps extends APrimitiveProps {
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectAComboboxRootContext } from './a-combobox-root.vue';

const props = withDefaults(
  defineProps<AComboboxTriggerProps>(),
  {
    as: 'button',
  },
);

useForwardExpose();

const rootContext = injectAComboboxRootContext();
const disabled = computed(() =>
  props.disabled || rootContext.disabled.value || false,
);
</script>

<template>
  <APrimitive
    v-bind="props"
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
