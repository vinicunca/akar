<script lang="ts">
import type { APopperArrowProps } from '~~/popper';

export interface AComboboxArrowProps extends APopperArrowProps {}
</script>

<script setup lang="ts">
import { APopperArrow } from '~~/popper';
import { useForwardExpose } from '~~/shared';
import { injectComboboxContentContext } from './combobox-content-impl.vue';
import { injectAComboboxRootContext } from './combobox-root.vue';

const props = withDefaults(defineProps<AComboboxArrowProps>(), {
  width: 10,
  height: 5,
  as: 'svg',
});
const rootContext = injectAComboboxRootContext();
const contentContext = injectComboboxContentContext();

useForwardExpose();
</script>

<template>
  <APopperArrow
    v-if="rootContext.open.value && contentContext.position.value === 'popper'"
    v-bind="props"
  >
    <slot />
  </APopperArrow>
</template>
