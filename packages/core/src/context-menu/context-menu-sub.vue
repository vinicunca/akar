<script lang="ts">
import type { Ref } from 'vue';
import type { AMenuSubEmits, AMenuSubProps } from '~~/menu';

export type AContextMenuSubEmits = AMenuSubEmits;
export interface AContextMenuSubProps extends AMenuSubProps {
  /** The open state of the submenu when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
}
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { AMenuSub } from '~~/menu';
import { useForwardExpose } from '~~/shared';

const props = withDefaults(
  defineProps<AContextMenuSubProps>(),
  {
    open: undefined,
  },
);
const emit = defineEmits<AContextMenuSubEmits>();

defineSlots<{
  default: (props: {
    /** Current open state */
    open: typeof open.value;
  }) => any;
}>();

useForwardExpose();

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false,
}) as Ref<boolean>;
</script>

<template>
  <AMenuSub v-model:open="open">
    <slot :open="open" />
  </AMenuSub>
</template>
