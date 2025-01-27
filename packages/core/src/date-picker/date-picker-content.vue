<script lang="ts">
import type { APopoverContentEmits, APopoverContentProps } from '..';
import { APopoverContent, APopoverPortal, useForwardPropsEmits } from '..';

export interface ADatePickerContentProps extends APopoverContentProps {}
export interface DatePickerContentEmits extends APopoverContentEmits {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerContentProps>();
const emits = defineEmits<DatePickerContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <APopoverPortal>
    <APopoverContent
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot />
    </APopoverContent>
  </APopoverPortal>
</template>
