<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

export interface AToastCloseProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import ToastAnnounceExclude from './toast-announce-exclude.vue';
import { injectToastRootContext } from './toast-root-impl.vue';

const props = withDefaults(defineProps<AToastCloseProps>(), {
  as: 'button',
});

const rootContext = injectToastRootContext();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <ToastAnnounceExclude as-child>
    <APrimitive
      v-bind="props"
      :ref="forwardRef"
      :type="as === 'button' ? 'button' : undefined "
      @click="rootContext.onClose()"
    >
      <slot />
    </APrimitive>
  </ToastAnnounceExclude>
</template>
