<script lang="ts">
import type { ComputedRef, Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

import { createContext } from '~~/shared';

import type { AcceptableInputValue } from './a-tags-input-root.vue';

export interface ATagsInputItemProps extends APrimitiveProps {
  /** When `true`, prevents the user from interacting with the tags input. */
  disabled?: boolean;
  /** Value associated with the tags */
  value: AcceptableInputValue;
}

export interface ATagsInputItemContext {
  disabled?: Ref<boolean>;
  displayValue: ComputedRef<string>;
  isSelected: Ref<boolean>;
  textId: string;
  value: Ref<AcceptableInputValue>;
}

export const [injectATagsInputItemContext, provideATagsInputItemContext]
  = createContext<ATagsInputItemContext>('ATagsInputItem');
</script>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useCollection } from '~~/collection';
import { useForwardExpose } from '~~/shared';

import { injectATagsInputRootContext } from './a-tags-input-root.vue';

const props = defineProps<ATagsInputItemProps>();
const { value } = toRefs(props);

const context = injectATagsInputRootContext();
const { forwardRef, currentElement } = useForwardExpose();
const { ACollectionItem } = useCollection();

const isSelected = computed(() => context.selectedElement.value === currentElement.value);

const disabled = computed(() => props.disabled || context.disabled.value);

const itemContext = provideATagsInputItemContext({
  value,
  isSelected,
  disabled,
  textId: '',
  displayValue: computed(() => context.displayValue(value.value)),
});
</script>

<template>
  <ACollectionItem>
    <APrimitive
      :ref="forwardRef"
      :as="as"
      :as-child="asChild"
      :aria-labelledby="itemContext.textId"
      :aria-current="isSelected"
      :data-disabled="disabled ? '' : undefined"
      :data-state="isSelected ? 'active' : 'inactive'"
    >
      <slot />
    </APrimitive>
  </ACollectionItem>
</template>
