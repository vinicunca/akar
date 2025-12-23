<script lang="ts">
import type { APopperArrowProps } from '../popper';

export interface ASelectArrowProps extends APopperArrowProps {}
</script>

<script setup lang="ts">
import { APopperArrow } from '../popper';
import { injectSelectContentContext, SelectContentDefaultContextValue } from './select-content-impl.vue';

const props = withDefaults(defineProps<ASelectArrowProps>(), {
  width: 10,
  height: 5,
  as: 'svg',
});
const contentContext = injectSelectContentContext(SelectContentDefaultContextValue);
</script>

<template>
  <APopperArrow
    v-if="contentContext.position === 'popper'"
    v-bind="props"
  >
    <slot />
  </APopperArrow>
</template>
