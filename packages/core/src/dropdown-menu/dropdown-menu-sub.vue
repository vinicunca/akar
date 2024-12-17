<script lang="ts">
import type { Ref } from 'vue';
import type { AMenuSubEmits, AMenuSubProps } from '~~/menu';

export type ADropdownMenuSubEmits = AMenuSubEmits;
export interface ADropdownMenuSubProps extends AMenuSubProps {
  /** The open state of the dropdown menu when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
}
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { AMenuSub } from '~~/menu';
import { useForwardExpose } from '~~/shared';

const props = withDefaults(defineProps<ADropdownMenuSubProps>(), {
  open: undefined,
});
const emit = defineEmits<ADropdownMenuSubEmits>();

defineSlots<{
  default: (props: {
    /** Current open state */
    open: typeof open.value;
  }) => any;
}>();

const open = useVModel(props, 'open', emit, {
  passive: (props.open === undefined) as false,
  defaultValue: props.defaultOpen ?? false,
}) as Ref<boolean>;

useForwardExpose();
</script>

<template>
  <AMenuSub v-model:open="open">
    <slot :open="open" />
  </AMenuSub>
</template>
