<script lang="ts">
import type { ComputedRef, VNodeRef } from 'vue';
import type { ACollapsibleRootProps } from '~~/collapsible';
import { createContext, useArrowNavigation, useForwardExpose } from '~~/shared';
import { injectAAccordionRootContext } from './accordion-root.vue';

enum AccordionItemState {
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

interface AccordionItemContext {
  open: ComputedRef<boolean>;
  dataState: ComputedRef<AccordionItemState>;
  disabled: ComputedRef<boolean>;
  dataDisabled: ComputedRef<'' | undefined>;
  triggerId: string;
  currentRef: VNodeRef;
  currentElement: ComputedRef<HTMLElement | undefined>;
  value: ComputedRef<string>;
}

export const [
  injectAAccordionItemContext,
  provideAccordionItemContext,
] = createContext<AccordionItemContext>('AAccordionItem');
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { ACollapsibleRoot } from '~~/collapsible';

const props = defineProps<AAccordionItemProps>();

defineSlots<{
  default?: (props: {
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
  return (rootContext.disabled.value || props.disabled);
});

const dataDisabled = computed(() => (disabled.value ? '' : undefined));

const dataState = computed(() =>
  open.value ? AccordionItemState.Open : AccordionItemState.Closed,
);

defineExpose({ open, dataDisabled });
const { currentRef, currentElement } = useForwardExpose();

provideAccordionItemContext({
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
  const target = event.target as HTMLElement;
  const allCollectionItems: Array<HTMLElement> = Array.from(rootContext.parentElement.value?.querySelectorAll('[data-akar-collection-item]') ?? []);

  const collectionItemIndex = allCollectionItems.findIndex((item) => item === target);

  if (collectionItemIndex === -1) {
    return null;
  }

  useArrowNavigation({
    event,
    currentElement: target,
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
