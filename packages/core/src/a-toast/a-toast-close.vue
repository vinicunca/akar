<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AToastCloseProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import AToastAnnounceExclude from './a-toast-announce-exclude.vue';
import { injectAToastRootContext } from './a-toast-root-impl.vue';

const props = withDefaults(
  defineProps<AToastCloseProps>(),
  {
    as: 'button',
  },
);

const rootContext = injectAToastRootContext();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <AToastAnnounceExclude as-child>
    <APrimitive
      v-bind="props"
      :ref="forwardRef"
      :type="as === 'button' ? 'button' : undefined "
      @click="rootContext.onClose()"
    >
      <slot />
    </APrimitive>
  </AToastAnnounceExclude>
</template>
