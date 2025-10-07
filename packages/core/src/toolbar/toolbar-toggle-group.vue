<script lang="ts">
import type {
  AToggleGroupRootEmits,
  AToggleGroupRootProps,
} from '~~/toggle-group';

export type AToolbarToggleGroupEmits = AToggleGroupRootEmits;

export interface AToolbarToggleGroupProps extends AToggleGroupRootProps {}
</script>

<script setup lang="ts">
import { useEmitAsProps, useForwardExpose } from '~~/shared';
import { AToggleGroupRoot } from '~~/toggle-group';
import { injectAToolbarRootContext } from './toolbar-root.vue';

const props = defineProps<AToolbarToggleGroupProps>();
const emits = defineEmits<AToolbarToggleGroupEmits>();

const rootContext = injectAToolbarRootContext();

const emitsAsProps = useEmitAsProps(emits);

useForwardExpose();
</script>

<template>
  <AToggleGroupRoot
    v-bind="{ ...props, ...emitsAsProps }"
    :data-orientation="rootContext.orientation.value"
    :dir="rootContext.dir.value"
    :roving-focus="false"
  >
    <slot />
  </AToggleGroupRoot>
</template>
