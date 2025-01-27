<script lang="ts">
import type { APopoverContentEmits, APopoverContentProps } from '..';
import { APopoverContent, APopoverPortal, useForwardPropsEmits } from '..';

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
