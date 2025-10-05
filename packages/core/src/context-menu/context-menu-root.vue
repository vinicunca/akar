<script lang="ts">
import type { Ref } from 'vue';
import type {
  AMenuEmits,
  AMenuProps,
} from '~~/menu';
import type { Direction } from '~~/shared/types';
import { createContext, useDirection, useForwardExpose } from '~~/shared';

type ContextMenuRootContext = {
  open: Ref<boolean>;
  onOpenChange: (open: boolean) => void;
  modal: Ref<boolean>;
  dir: Ref<Direction>;
  triggerElement: Ref<HTMLElement | undefined>;
  pressOpenDelay: Ref<number>;
};

export interface AContextMenuRootProps extends Omit<AMenuProps, 'open'> {
  /**
   * The duration from when the trigger is pressed until the menu opens.
   *
   * @defaultValue 700
   */
  pressOpenDelay?: number;
}
export type AContextMenuRootEmits = AMenuEmits;

export const [
  injectAContextMenuRootContext,
  provideContextMenuRootContext,
] = createContext<ContextMenuRootContext>('ContextMenuRoot');
</script>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import { AMenuRoot } from '~~/menu';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<AContextMenuRootProps>(),
  {
    modal: true,
    pressOpenDelay: 700,
  },
);
const emits = defineEmits<AContextMenuRootEmits>();
const { dir: propDir, modal, pressOpenDelay } = toRefs(props);
useForwardExpose();
const dir = useDirection(propDir);

const open = ref(false);
const triggerElement = ref<HTMLElement>();

provideContextMenuRootContext({
  open,
  onOpenChange: (value: boolean) => {
    open.value = value;
  },
  dir,
  modal,
  triggerElement,
  pressOpenDelay,
});

watch(open, (value) => {
  emits('update:open', value);
});
</script>

<template>
  <AMenuRoot
    v-model:open="open"
    :dir="dir"
    :modal="modal"
  >
    <slot />
  </AMenuRoot>
</template>
