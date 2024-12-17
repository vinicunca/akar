<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface AComboboxCancelProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import { useForwardExpose } from '~~/shared';
import { injectAComboboxRootContext } from './combobox-root.vue';

const props = withDefaults(defineProps<AComboboxCancelProps>(), {
  as: 'button',
});

useForwardExpose();
const rootContext = injectAComboboxRootContext();

function handleClick() {
  if (rootContext.inputElement.value) {
    rootContext.inputElement.value.value = '';
    rootContext.inputElement.value.focus();
  }
}
</script>

<template>
  <APrimitive
    :type="as === 'button' ? 'button' : undefined"
    v-bind="props"
    tabindex="-1"
    @click="handleClick"
  >
    <slot />
  </APrimitive>
</template>
