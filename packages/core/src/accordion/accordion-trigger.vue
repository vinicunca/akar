<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface AAccordionTriggerProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { ACollapsibleTrigger } from '~~/collapsible';
import { useId } from '~~/shared';
import { injectAAccordionItemContext } from './accordion-item.vue';
import { injectAAccordionRootContext } from './accordion-root.vue';

const props = defineProps<AAccordionTriggerProps>();

const rootContext = injectAAccordionRootContext();
const itemContext = injectAAccordionItemContext();

itemContext.triggerId ||= useId(undefined, 'akar-accordion-trigger');

function changeItem() {
  const triggerDisabled = rootContext.isSingle.value && itemContext.open.value && !rootContext.collapsible;

  if (itemContext.disabled.value || triggerDisabled) {
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
