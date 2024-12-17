<script setup lang="ts">
import { useForwardExpose, useForwardProps, useGraceArea } from '~~/shared';
import TooltipContentImpl, { type TooltipContentImplProps } from './tooltip-content-impl.vue';
import { injectATooltipProviderContext } from './tooltip-provider.vue';
import { injectATooltipRootContext } from './tooltip-root.vue';

const props = defineProps<TooltipContentImplProps>();
const forwardedProps = useForwardProps(props);
const { forwardRef, currentElement } = useForwardExpose();

const { trigger, onClose } = injectATooltipRootContext();
const providerContext = injectATooltipProviderContext();

const { isPointerInTransit, onPointerExit } = useGraceArea({
  triggerElement: trigger,
  containerElement: currentElement,
});

providerContext.isPointerInTransitRef = isPointerInTransit;
onPointerExit(() => {
  onClose();
});
</script>

<template>
  <TooltipContentImpl
    :ref="forwardRef"
    v-bind="forwardedProps"
  >
    <slot />
  </TooltipContentImpl>
</template>
