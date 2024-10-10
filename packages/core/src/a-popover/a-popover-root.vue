<script lang="ts">
import type { Ref } from 'vue';

import { createContext } from '~~/shared';

export interface APopoverRootProps {
  /**
   * The open state of the popover when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: boolean;
  /**
   * The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.
   *
   * @defaultValue false
   */
  modal?: boolean;
  /**
   * The controlled open state of the popover.
   */
  open?: boolean;
}
export type APopoverRootEmits = {
  /**
   * Event handler called when the open state of the popover changes.
   */
  'update:open': [value: boolean];
};

export interface APopoverRootContext {
  contentId: string;
  hasCustomAnchor: Ref<boolean>;
  modal: Ref<boolean>;
  onOpenChange: (value: boolean) => void;
  onOpenToggle: () => void;
  open: Ref<boolean>;
  triggerElement: Ref<HTMLElement | undefined>;
  triggerId: string;
}

export const [
  injectAPopoverRootContext,
  provideAPopoverRootContext,
] = createContext<APopoverRootContext>('APopoverRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { ref, toRefs } from 'vue';

import { APopperRoot } from '~~/a-popper';

const props = withDefaults(
  defineProps<APopoverRootProps>(),
  {
    defaultOpen: false,
    open: undefined,
    modal: false,
  },
);

const emit = defineEmits<APopoverRootEmits>();

defineSlots<{
  default: (props: {
    /** Current open state */
    open: typeof open.value;
  }) => any;
}>();

const { modal } = toRefs(props);

const open = useVModel(
  props,
  'open',
  emit,
  {
    defaultValue: props.defaultOpen,
    passive: (props.open === undefined) as false,
  },
) as Ref<boolean>;

const triggerElement = ref<HTMLElement>();
const hasCustomAnchor = ref(false);

provideAPopoverRootContext({
  contentId: '',
  triggerId: '',
  modal,
  open,
  onOpenChange: (value) => {
    open.value = value;
  },
  onOpenToggle: () => {
    open.value = !open.value;
  },
  triggerElement,
  hasCustomAnchor,
});
</script>

<template>
  <APopperRoot>
    <slot :open="open" />
  </APopperRoot>
</template>
