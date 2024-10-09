<script lang="ts">
import type { APopperArrowProps } from '~~/a-popper';

export interface AComboboxArrowProps extends APopperArrowProps {}
</script>

<script setup lang="ts">
import { APopperArrow } from '~~/a-popper';
import { useForwardExpose } from '~~/shared';

import { injectAComboboxContentContext } from './a-combobox-content-impl.vue';
import { injectAComboboxRootContext } from './a-combobox-root.vue';

const props = withDefaults(
  defineProps<AComboboxArrowProps>(),
  {
    width: 10,
    height: 5,
    as: 'svg',
  },
);

const rootContext = injectAComboboxRootContext();
const contentContext = injectAComboboxContentContext();

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
