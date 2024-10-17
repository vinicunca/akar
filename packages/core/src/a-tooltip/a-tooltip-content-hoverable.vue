<script setup lang="ts">
import { useForwardExpose, useForwardProps, useGraceArea } from '~~/shared';

import ATooltipContentImpl, { type ATooltipContentImplProps } from './a-tooltip-content-impl.vue';
import { injectATooltipProviderContext } from './a-tooltip-provider.vue';
import { injectATooltipRootContext } from './a-tooltip-root.vue';

const props = defineProps<ATooltipContentImplProps>();
const forwardedProps = useForwardProps(props);
const { forwardRef, currentElement } = useForwardExpose();

const { trigger, onClose } = injectATooltipRootContext();
const providerContext = injectATooltipProviderContext();

const { isPointerInTransit, onPointerExit } = useGraceArea({ triggerElement: trigger, containerElement: currentElement });

providerContext.isPointerInTransitRef = isPointerInTransit;

onPointerExit(() => {
  onClose();
});
</script>

<template>
  <ATooltipContentImpl
    :ref="forwardRef"
    v-bind="forwardedProps"
  >
    <slot />
  </ATooltipContentImpl>
</template>
