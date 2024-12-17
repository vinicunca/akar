<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose, useId } from '~~/shared';

export interface APopoverTriggerProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { onMounted } from 'vue';
import { APopperAnchor } from '~~/popper';
import { APrimitive } from '~~/primitive';
import { injectAPopoverRootContext } from './popover-root.vue';

const props = withDefaults(defineProps<APopoverTriggerProps>(), {
  as: 'button',
});

const rootContext = injectAPopoverRootContext();

const { forwardRef, currentElement: triggerElement } = useForwardExpose();

rootContext.triggerId ||= useId(undefined, 'akar-popover-trigger');
onMounted(() => {
  rootContext.triggerElement.value = triggerElement.value;
});
</script>

<template>
  <component
    :is="rootContext.hasCustomAnchor.value ? APrimitive : APopperAnchor"
    as-child
  >
    <APrimitive
      :id="rootContext.triggerId"
      :ref="forwardRef"
      :type="as === 'button' ? 'button' : undefined"
      aria-haspopup="dialog"
      :aria-expanded="rootContext.open.value"
      :aria-controls="rootContext.contentId"
      :data-state="rootContext.open.value ? 'open' : 'closed'"
      :as="as"
      :as-child="props.asChild"
      @click="rootContext.onOpenToggle"
    >
      <slot />
    </APrimitive>
  </component>
</template>
