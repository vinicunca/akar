<script lang="ts">
import type {
  AMenuRadioGroupEmits,
  AMenuRadioGroupProps,
} from '~~/a-menu';

export type ADropdownMenuRadioGroupEmits = AMenuRadioGroupEmits;

export interface ADropdownMenuRadioGroupProps extends AMenuRadioGroupProps {}
</script>

<script setup lang="ts">
import { AMenuRadioGroup } from '~~/a-menu';
import { useEmitAsProps, useForwardExpose } from '~~/shared';

const props = defineProps<ADropdownMenuRadioGroupProps>();
const emits = defineEmits<ADropdownMenuRadioGroupEmits>();

const emitsAsProps = useEmitAsProps(emits);

useForwardExpose();
</script>

<template>
  <AMenuRadioGroup v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </AMenuRadioGroup>
</template>
