<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface AAccordionHeaderProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import { useForwardExpose } from '~~/shared';
import { injectAAccordionItemContext } from './accordion-item.vue';
import { injectAAccordionRootContext } from './accordion-root.vue';

const props = withDefaults(
  defineProps<AAccordionHeaderProps>(),
  {
    as: 'h3',
  },
);

const rootContext = injectAAccordionRootContext();
const itemContext = injectAAccordionItemContext();

useForwardExpose();
</script>

<template>
  <APrimitive
    :as="props.as"
    :as-child="props.asChild"
    :data-orientation="rootContext.orientation"
    :data-state="itemContext.dataState.value"
    :data-disabled="itemContext.dataDisabled.value"
  >
    <slot />
  </APrimitive>
</template>
