<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface ADropdownMenuFilterProps extends APrimitiveProps {
  /** The controlled value of the filter. Can be binded with v-model. */
  modelValue?: string;
  /** Focus on element when mounted. */
  autoFocus?: boolean;
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean;
}

export type ADropdownMenuFilterEmits = {
  'update:modelValue': [string];
};
</script>

<script setup lang="ts">
import { isIncludedIn, KEY_CODES } from '@vinicunca/perkakas';
import { useVModel } from '@vueuse/core';
import { computed, onMounted, onUnmounted, ref, watch, watchSyncEffect } from 'vue';
import { injectMenuContentContext } from '../menu/menu-content-impl.vue';
import { injectAMenuRootContext } from '../menu/menu-root.vue';
import { injectMenuSubContext } from '../menu/menu-sub.vue';
import { APrimitive, usePrimitiveElement } from '../primitive';

const props = withDefaults(defineProps<ADropdownMenuFilterProps>(), {
  as: 'input',
});
const emits = defineEmits<ADropdownMenuFilterEmits>();

defineSlots<{
  default?: (props: {
    /** Current input values */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: '',
    passive: (props.modelValue === undefined) as false,
  },
);

const rootContext = injectAMenuRootContext();
const contentContext = injectMenuContentContext();
const subContext = injectMenuSubContext(null);

// Keep searchRef in sync with modelValue changes
watch(
  modelValue,
  (v) => {
    contentContext.searchRef.value = v ?? '';
  },
  { immediate: true },
);

const { primitiveElement, currentElement } = usePrimitiveElement();
const disabled = computed(() => props.disabled || false);

const activedescendant = ref<string | undefined>();
watchSyncEffect(() => {
  activedescendant.value = contentContext.highlightedElement.value?.id;
});

onMounted(() => {
  contentContext.onFilterElementChange(currentElement.value);
  setTimeout(() => {
    // make sure all DOM was flush then only capture the focus
    if (props.autoFocus) {
      const isSubmenu = !!subContext;
      if (!isSubmenu || rootContext.isUsingKeyboardRef.value) {
        currentElement.value?.focus();
      }
    }
  }, 1);
});

onUnmounted(() => {
  contentContext.onFilterElementChange(undefined);
  // Clean up search when unmounting
  contentContext.searchRef.value = '';
});

function handleInput(event: InputEvent) {
  if (disabled.value) {
    return;
  }
  const target = event.target as HTMLInputElement;
  modelValue.value = target.value;
  // Update the menu's search ref to help with filtering
  contentContext.searchRef.value = target.value;
}

function handleKeyDown(event: KeyboardEvent) {
  if (disabled.value) {
    return;
  }
  if (isIncludedIn(event.key, [KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_UP, KEY_CODES.HOME, KEY_CODES.END])) {
    event.preventDefault();
    contentContext.onKeydownNavigation(event);
  } else if (event.key === KEY_CODES.ENTER) {
    event.preventDefault();
    contentContext.onKeydownEnter(event);
  }
}
</script>

<template>
  <APrimitive
    ref="primitiveElement"
    :as="as"
    :as-child="asChild"
    :value="modelValue"
    :disabled="disabled ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :aria-disabled="disabled ? true : undefined"
    :aria-activedescendant="activedescendant"
    type="text"
    role="searchbox"
    @input="handleInput"
    @keydown="handleKeyDown"
  >
    <slot :model-value="modelValue" />
  </APrimitive>
</template>
