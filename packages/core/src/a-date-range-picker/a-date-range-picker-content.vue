<script lang="ts">
import { APopoverContent, type APopoverContentEmits, type APopoverContentProps, APopoverPortal } from '~~/a-popover';

export interface ADateRangePickerContentProps extends APopoverContentProps {}
export interface ADateRangePickerContentEmits extends APopoverContentEmits {}
</script>

<script setup lang="ts">
import { useForwardPropsEmits } from '~~/shared';

const props = defineProps<ADateRangePickerContentProps>();
const emits = defineEmits<ADateRangePickerContentEmits>();

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
