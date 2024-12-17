<script lang="ts">
import type { ACollapsibleContentProps } from '~~/collapsible';

export interface AAccordionContentProps extends ACollapsibleContentProps {}
</script>

<script setup lang="ts">
import { ACollapsibleContent } from '~~/collapsible';
import { useForwardExpose } from '~~/shared';
import { injectAAccordionItemContext } from './accordion-item.vue';
import { injectAAccordionRootContext } from './accordion-root.vue';

const props = defineProps<AAccordionContentProps>();

const rootContext = injectAAccordionRootContext();
const itemContext = injectAAccordionItemContext();

useForwardExpose();
</script>

<template>
  <ACollapsibleContent
    role="region"
    :as-child="props.asChild"
    :force-mount="props.forceMount"
    :aria-labelledby="itemContext.triggerId"
    :data-state="itemContext.dataState.value"
    :data-disabled="itemContext.dataDisabled.value"
    :data-orientation="rootContext.orientation"
    style="
      --akar-accordion-content-width: var(--akar-collapsible-content-width);
      --akar-accordion-content-height: var(--akar-collapsible-content-height);
    "
    @content-found="rootContext.changeModelValue(itemContext.value.value)"
  >
    <slot />
  </ACollapsibleContent>
</template>
