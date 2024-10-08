<script lang="ts">
import { useId } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

export interface AAccordionTriggerProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { ACollapsibleTrigger } from '~~/a-collapsible';

import { injectAAccordionItemContext } from './a-accordion-item.vue';
import { injectAAccordionRootContext } from './a-accordion-root.vue';

const props = defineProps<AAccordionTriggerProps>();

const rootContext = injectAAccordionRootContext();
const itemContext = injectAAccordionItemContext();

itemContext.triggerId ||= useId();
function changeItem() {
  if (itemContext.disabled.value) {
    return;
  }
  rootContext.changeModelValue(itemContext.value.value);
}
</script>

<template>
  <ACollapsibleTrigger
    :id="itemContext.triggerId"
    :ref="itemContext.currentRef"
    data-akar-collection-item
    :as="props.as"
    :as-child="props.asChild"
    :aria-disabled="itemContext.disabled.value || undefined"
    :aria-expanded="itemContext.open.value || false"
    :data-disabled="itemContext.dataDisabled.value"
    :data-orientation="rootContext.orientation"
    :data-state="itemContext.dataState.value"
    :disabled="itemContext.disabled.value"
    @click="changeItem"
  >
    <slot />
  </ACollapsibleTrigger>
</template>
