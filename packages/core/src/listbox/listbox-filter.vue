<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { injectAListboxRootContext } from './listbox-root.vue';

export interface AListboxFilterProps extends APrimitiveProps {
  /** The controlled value of the filter. Can be binded with with v-model. */
  modelValue?: string;
  /** Focus on element when mounted. */
  autoFocus?: boolean;
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean;
}

export type AListboxFilterEmits = {
  'update:modelValue': [string];
};
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, onMounted, onUnmounted, ref, watchSyncEffect } from 'vue';
import { APrimitive, usePrimitiveElement } from '~~/primitive';

const props = withDefaults(defineProps<AListboxFilterProps>(), {
  as: 'input',
});
const emits = defineEmits<AListboxFilterEmits>();

defineSlots<{
  default?: (props: {
    /** Current input values */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: '',
  passive: (props.modelValue === undefined) as false,
});

const rootContext = injectAListboxRootContext();

const { primitiveElement, currentElement } = usePrimitiveElement();
const disabled = computed(() => props.disabled || rootContext.disabled.value || false);

const activedescendant = ref<string | undefined>();
watchSyncEffect(() => {
  activedescendant.value = rootContext.highlightedElement.value?.id;
});

onMounted(() => {
  rootContext.focusable.value = false;

  setTimeout(() => {
    // make sure all DOM was flush then only capture the focus
    if (props.autoFocus) {
      currentElement.value?.focus();
    }
  }, 1);
});

onUnmounted(() => {
  rootContext.focusable.value = true;
});
</script>

<template>
  <APrimitive
    ref="primitiveElement"
    :as="as"
    :as-child="asChild"
    :value="modelValue"
    :disabled="disabled ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :aria-disabled="disabled ?? undefined"
    :aria-activedescendant="activedescendant"
    type="text"
    @keydown.down.up.home.end.prevent="rootContext.onKeydownNavigation"
    @keydown.enter="rootContext.onKeydownEnter"
    @input="(event: InputEvent) => {
      modelValue = (event.target as HTMLInputElement).value;
      rootContext.highlightFirstItem();
    }"
    @compositionstart="rootContext.onCompositionStart"
    @compositionend="rootContext.onCompositionEnd"
  >
    <slot :model-value="modelValue" />
  </APrimitive>
</template>
