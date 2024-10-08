<script lang="ts">
import type { ComputedRef, VNodeRef } from 'vue';

import { createContext } from '~~/shared';

import type { ACollapsibleRootProps } from '../a-collapsible';

import { injectAAccordionRootContext } from './a-accordion-root.vue';

enum AAccordionItemState {
  Closed = 'closed',
  Open = 'open',
}

export interface AAccordionItemProps
  extends Omit<ACollapsibleRootProps, 'defaultOpen' | 'onOpenChange' | 'open'> {
  /**
   * Whether or not an accordion item is disabled from user interaction.
   * When `true`, prevents the user from interacting with the item.
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * A string value for the accordion item. All items within an accordion should use a unique value.
   */
  value: string;
}

interface AAccordionItemContext {
  currentElement: ComputedRef<HTMLElement | undefined>;
  currentRef: VNodeRef;
  dataDisabled: ComputedRef<'' | undefined>;
  dataState: ComputedRef<AAccordionItemState>;
  disabled: ComputedRef<boolean>;
  open: ComputedRef<boolean>;
  triggerId: string;
  value: ComputedRef<string>;
}

export const [
  injectAAccordionItemContext,
  provideAAccordionItemContext,
] = createContext<AAccordionItemContext>('AAccordionItem');
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { ACollapsibleRoot } from '~~/a-collapsible';
import { useArrowNavigation, useForwardExpose } from '~~/shared';

const props = defineProps<AAccordionItemProps>();

defineSlots<{
  default: (props: {
    /** Current open state */
    open: typeof open.value;
  }) => any;
}>();

const rootContext = injectAAccordionRootContext();

const open = computed(() =>
  rootContext.isSingle.value
    ? props.value === rootContext.modelValue.value
    : Array.isArray(rootContext.modelValue.value)
      && rootContext.modelValue.value.includes(props.value),
);

const disabled = computed(() => {
  return (
    rootContext.disabled.value
    || props.disabled
    || (rootContext.isSingle.value && open.value && !rootContext.collapsible)
  );
});

const dataDisabled = computed(() => (disabled.value ? '' : undefined));

const dataState = computed(() =>
  open.value ? AAccordionItemState.Open : AAccordionItemState.Closed,
);

defineExpose({ open, dataDisabled });
const { currentRef, currentElement } = useForwardExpose();

provideAAccordionItemContext({
  open,
  dataState,
  disabled,
  dataDisabled,
  triggerId: '',
  currentRef,
  currentElement,
  value: computed(() => props.value),
});

function handleArrowKey(event: KeyboardEvent) {
  useArrowNavigation({
    event,
    currentElement: currentElement.value,
    parentElement: rootContext.parentElement.value!,
    options: {
      arrowKeyOptions: rootContext.orientation,
      dir: rootContext.direction.value,
      focus: true,
    },
  });
}
</script>

<template>
  <ACollapsibleRoot
    :data-orientation="rootContext.orientation"
    :data-disabled="dataDisabled"
    :data-state="dataState"
    :disabled="disabled"
    :open="open"
    :as="props.as"
    :as-child="props.asChild"
    :unmount-on-hide="rootContext.unmountOnHide.value"
    @keydown.up.down.left.right.home.end="handleArrowKey"
  >
    <slot :open="open" />
  </ACollapsibleRoot>
</template>
