<script lang="ts">
import { APopoverContent, type APopoverContentEmits, type APopoverContentProps, APopoverPortal, useForwardPropsEmits } from '..';

export interface ADateRangePickerContentProps extends APopoverContentProps {}
export interface DateRangePickerContentEmits extends APopoverContentEmits {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerContentProps>();
const emits = defineEmits<DateRangePickerContentEmits>();

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
