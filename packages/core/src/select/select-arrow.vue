<script lang="ts">
import type { APopperArrowProps } from '~~/popper';

export interface ASelectArrowProps extends APopperArrowProps {}
</script>

<script setup lang="ts">
import { APopperArrow } from '~~/popper';
import { injectSelectContentContext, SelectContentDefaultContextValue } from './select-content-impl.vue';
import { injectASelectRootContext } from './select-root.vue';

const props = withDefaults(defineProps<ASelectArrowProps>(), {
  width: 10,
  height: 5,
  as: 'svg',
});
const rootContext = injectASelectRootContext();
const contentContext = injectSelectContentContext(SelectContentDefaultContextValue);
</script>

<template>
  <APopperArrow
    v-if="rootContext.open.value && contentContext.position === 'popper'"
    v-bind="props"
  >
    <slot />
  </APopperArrow>
</template>
