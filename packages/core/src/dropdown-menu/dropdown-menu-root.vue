<script lang="ts">
import type { Ref } from 'vue';
import type { AMenuEmits, AMenuProps } from '~~/menu';
import type { Direction } from '../shared/types';
import { createContext, useDirection, useForwardExpose } from '~~/shared';

export interface ADropdownMenuRootProps extends AMenuProps {
  /** The open state of the dropdown menu when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
}
export type ADropdownMenuRootEmits = AMenuEmits;

export interface DropdownMenuRootContext {
  open: Readonly<Ref<boolean>>;
  onOpenChange: (open: boolean) => void;
  onOpenToggle: () => void;
  triggerId: string;
  triggerElement: Ref<HTMLElement | undefined>;
  contentId: string;
  modal: Ref<boolean>;
  dir: Ref<Direction>;
}

export const [injectADropdownMenuRootContext, provideDropdownMenuRootContext]
  = createContext<DropdownMenuRootContext>('ADropdownMenuRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { ref, toRefs } from 'vue';
import { AMenuRoot } from '~~/menu';

const props = withDefaults(defineProps<ADropdownMenuRootProps>(), {
  modal: true,
  open: undefined,
});
const emit = defineEmits<ADropdownMenuRootEmits>();

defineSlots<{
  default?: (props: {
    /** Current open state */
    open: typeof open.value;
  }) => any;
}>();

useForwardExpose();
const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false,
}) as Ref<boolean>;

const triggerElement = ref<HTMLElement>();

const { modal, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);
provideDropdownMenuRootContext({
  open,
  onOpenChange: (value) => {
    open.value = value;
  },
  onOpenToggle: () => {
    open.value = !open.value;
  },
  triggerId: '',
  triggerElement,
  contentId: '',
  modal,
  dir,
});
</script>

<template>
  <AMenuRoot
    v-model:open="open"
    :dir="dir"
    :modal="modal"
  >
    <slot :open="open" />
  </AMenuRoot>
</template>
