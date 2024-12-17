<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

export interface ASwitchThumbProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import { injectASwitchRootContext } from './switch-root.vue';

withDefaults(defineProps<ASwitchThumbProps>(), { as: 'span' });

const rootContext = injectASwitchRootContext();

useForwardExpose();
</script>

<template>
  <APrimitive
    :data-state="rootContext.modelValue?.value ? 'checked' : 'unchecked'"
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </APrimitive>
</template>
