<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ACollapsibleTriggerProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectACollapsibleRootContext } from './a-collapsible-root.vue';

const props = withDefaults(
  defineProps<ACollapsibleTriggerProps>(),
  {
    as: 'button',
  },
);

useForwardExpose();
const rootContext = injectACollapsibleRootContext();
</script>

<template>
  <APrimitive
    :type="as === 'button' ? 'button' : undefined"
    :as="as"
    :as-child="props.asChild"
    :aria-controls="rootContext.contentId"
    :aria-expanded="rootContext.open.value"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    :data-disabled="rootContext.disabled?.value ? '' : undefined"
    :disabled="rootContext.disabled?.value"
    @click="rootContext.onOpenToggle"
  >
    <slot />
  </APrimitive>
</template>
