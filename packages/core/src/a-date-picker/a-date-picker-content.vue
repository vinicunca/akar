<script lang="ts">
import type {
  APopoverContentEmits,
  APopoverContentProps,
} from '~~/a-popover';

export interface ADatePickerContentProps extends APopoverContentProps {}
export interface ADatePickerContentEmits extends APopoverContentEmits {}
</script>

<script setup lang="ts">
import { APopoverContent, APopoverPortal } from '~~/a-popover';
import { useForwardPropsEmits } from '~~/shared';

const props = defineProps<ADatePickerContentProps>();
const emits = defineEmits<ADatePickerContentEmits>();

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
