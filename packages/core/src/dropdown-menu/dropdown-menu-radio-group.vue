<script lang="ts">
import type {
  AMenuRadioGroupEmits,
  AMenuRadioGroupProps,
} from '../menu';

export type ADropdownMenuRadioGroupEmits = AMenuRadioGroupEmits;

export interface ADropdownMenuRadioGroupProps extends AMenuRadioGroupProps {}
</script>

<script setup lang="ts">
import { AMenuRadioGroup } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../shared';

const props = defineProps<AMenuRadioGroupProps>();
const emits = defineEmits<AMenuRadioGroupEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <AMenuRadioGroup v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </AMenuRadioGroup>
</template>
