<script lang="ts">
import type { Ref } from 'vue';
import type { APrimitiveProps } from '../primitive';
import { toRefs } from 'vue';
import { createContext, useForwardExpose } from '../shared';

export interface ACollapsibleRootProps extends APrimitiveProps {
  /** The open state of the collapsible when it is initially rendered. <br> Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /** The controlled open state of the collapsible. Can be binded with `v-model`. */
  open?: boolean;
  /** When `true`, prevents the user from interacting with the collapsible. */
  disabled?: boolean;
  /** When `true`, the element will be unmounted on closed state. */
  unmountOnHide?: boolean;
}

export type ACollapsibleRootEmits = {
  /** Event handler called when the open state of the collapsible changes. */
  'update:open': [value: boolean];
};

interface ACollapsibleRootContext {
  contentId: string;
  disabled?: Ref<boolean>;
  open: Ref<boolean>;
  unmountOnHide: Ref<boolean>;
  onOpenToggle: () => void;
}

export const [
  injectACollapsibleRootContext,
  provideACollapsibleRootContext,
] = createContext<ACollapsibleRootContext>('ACollapsibleRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { APrimitive } from '../primitive';

const props = withDefaults(
  defineProps<ACollapsibleRootProps>(),
  {
    open: undefined,
    defaultOpen: false,
    unmountOnHide: true,
  },
);

const emit = defineEmits<ACollapsibleRootEmits>();

defineSlots<{
  default?: (props: {
    /** Current open state */
    open: typeof open.value;
  }) => any;
}>();

const open = useVModel(
  props,
  'open',
  emit,
  {
    defaultValue: props.defaultOpen,
    passive: (props.open === undefined) as false,
  },
) as Ref<boolean>;

const { disabled, unmountOnHide } = toRefs(props);

provideACollapsibleRootContext({
  contentId: '',
  disabled,
  open,
  unmountOnHide,
  onOpenToggle: () => {
    if (disabled.value) {
      return;
    }

    open.value = !open.value;
  },
});

defineExpose({ open });
useForwardExpose();
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="props.asChild"
    :data-state="open ? 'open' : 'closed'"
    :data-disabled="disabled ? '' : undefined"
  >
    <slot :open="open" />
  </APrimitive>
</template>
