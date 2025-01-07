<script lang="ts">
import type {
  AMenuRadioGroupEmits,
  AMenuRadioGroupProps,
} from '~~/menu';

export type AContextMenuRadioGroupEmits = AMenuRadioGroupEmits;

export interface AContextMenuRadioGroupProps extends AMenuRadioGroupProps {}
</script>

<script setup lang="ts">
import { AMenuRadioGroup } from '~~/menu';
import { useEmitAsProps, useForwardExpose } from '~~/shared';

const props = defineProps<AContextMenuRadioGroupProps>();
const emits = defineEmits<AContextMenuRadioGroupEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <AMenuRadioGroup v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </AMenuRadioGroup>
</template>
