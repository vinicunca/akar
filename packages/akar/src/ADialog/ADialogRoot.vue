<script lang="ts">
import type { Ref } from 'vue';

import { createContext } from '~~/shared';
export type ADialogRootProps = {
  /** The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /**
   * The modality of the dialog  When set to `true`, <br>
   * interaction with outside elements will be disabled and only dialog content will be visible to screen readers.
   */
  modal?: boolean;
  /** The controlled open state of the dialog. Can be binded as `v-model:open`. */
  open?: boolean;
};

export type ADialogRootEmits = {
  /** Event handler called when the open state of the dialog changes. */
  'update:open': [value: boolean];
};
export interface ADialogRootContext {
  contentElement: Ref<HTMLElement | undefined>;
  contentId: string;
  descriptionId: string;
  modal: Ref<boolean>;
  onOpenChange: (value: boolean) => void;
  onOpenToggle: () => void;
  open: Readonly<Ref<boolean>>;
  openModal: () => void;
  titleId: string;
  triggerElement: Ref<HTMLElement | undefined>;
}
export const [injectADialogRootContext, provideADialogRootContext]
  = createContext<ADialogRootContext>('ADialogRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { ref, toRefs } from 'vue';
const props = withDefaults(defineProps<ADialogRootProps>(), {
  defaultOpen: false,
  modal: true,
  open: undefined,
});
const emit = defineEmits<ADialogRootEmits>();
defineSlots<{
  default: (props: {
    /** Current open state */
    open: typeof open.value;
  }) => any;
}>();
const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false,
}) as Ref<boolean>;
const triggerElement = ref<HTMLElement>();
const contentElement = ref<HTMLElement>();
const { modal } = toRefs(props);
provideADialogRootContext({
  contentElement,
  contentId: '',
  descriptionId: '',
  modal,
  onOpenChange: (value: boolean) => {
    open.value = value;
  },
  onOpenToggle: () => {
    open.value = !open.value;
  },
  open,
  openModal: () => {
    open.value = true;
  },
  titleId: '',
  triggerElement,
});
</script>

<template>
  <slot :open="open" />
</template>
