<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { computed, type ComputedRef, type Ref, toRefs } from 'vue';
import { createContext, useForwardExpose } from '~~/shared';
import { type AcceptableInputValue, injectATagsInputRootContext } from './tags-input-root.vue';

export interface ATagsInputItemProps extends APrimitiveProps {
  /** Value associated with the tags */
  value: AcceptableInputValue;
  /** When `true`, prevents the user from interacting with the tags input. */
  disabled?: boolean;
}

export interface TagsInputItemContext {
  value: Ref<AcceptableInputValue>;
  displayValue: ComputedRef<string>;
  isSelected: Ref<boolean>;
  disabled?: Ref<boolean>;
  textId: string;
}

export const [injectATagsInputItemContext, provideTagsInputItemContext]
  = createContext<TagsInputItemContext>('ATagsInputItem');
</script>

<script setup lang="ts">
import { useCollection } from '~~/collection';
import { APrimitive } from '~~/primitive';

const props = defineProps<ATagsInputItemProps>();
const { value } = toRefs(props);

const context = injectATagsInputRootContext();
const { forwardRef, currentElement } = useForwardExpose();
const { ACollectionItem } = useCollection();

const isSelected = computed(() => context.selectedElement.value === currentElement.value);

const disabled = computed(() => props.disabled || context.disabled.value);

const itemContext = provideTagsInputItemContext({
  value,
  isSelected,
  disabled,
  textId: '',
  displayValue: computed(() => context.displayValue(value.value)),
});
</script>

<template>
  <ACollectionItem :value="value">
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
