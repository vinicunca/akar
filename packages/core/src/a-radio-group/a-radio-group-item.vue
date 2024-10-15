<script lang="ts">
import type { ComputedRef } from 'vue';

import { createContext } from '~~/shared';

import type { ARadioProps } from './a-radio.vue';
import type { SelectEvent } from './utils';

export interface ARadioGroupItemProps extends Omit<ARadioProps, 'checked'> {}

export type ARadioGroupItemEmits = {
  select: [event: SelectEvent];
};

interface ARadioGroupItemContext {
  checked: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
}

export const [
  injectARadioGroupItemContext,
  provideRadiogroupItemContext,
] = createContext<ARadioGroupItemContext>('ARadioGroupItem');
</script>

<script setup lang="ts">
import { isDeepEqual } from '@vinicunca/perkakas';
import { useEventListener } from '@vueuse/core';
import { computed, ref } from 'vue';

import { ARovingFocusItem } from '~~/a-roving-focus';
import { useForwardExpose } from '~~/shared';

import Radio from './a-radio.vue';
import { injectARadioGroupRootContext } from './a-radio-group-root.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ARadioGroupItemProps>(),
  {
    disabled: false,
    as: 'button',
  },
);

const emits = defineEmits<ARadioGroupItemEmits>();

const { forwardRef, currentElement } = useForwardExpose();

const rootContext = injectARadioGroupRootContext();

const disabled = computed(() => rootContext.disabled.value || props.disabled);
const required = computed(() => rootContext.required.value || props.required);
const checked = computed(() => isDeepEqual(rootContext.modelValue?.value, props.value));

provideRadiogroupItemContext({ disabled, checked });

const isArrowKeyPressed = ref(false);
const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

useEventListener(
  'keydown',
  (event) => {
    if (ARROW_KEYS.includes(event.key)) {
      isArrowKeyPressed.value = true;
    }
  },
);

useEventListener(
  'keyup',
  () => {
    isArrowKeyPressed.value = false;
  },
);

function handleFocus() {
  setTimeout(() => {
    /**
     * Our `ARovingFocusGroup` will focus the radio when navigating with arrow keys
     * and we need to 'check' it in that case. We click it to 'check' it (instead
     * of updating `context.value`) so that the radio change event fires.
     */
    if (isArrowKeyPressed.value) {
      currentElement.value?.click();
    }
  }, 0);
}
</script>

<template>
  <ARovingFocusItem
    :checked="checked"
    :disabled="disabled"
    as-child
    :focusable="!disabled"
    :active="checked"
  >
    <Radio
      v-bind="{ ...$attrs, ...props }"
      :ref="forwardRef"
      :checked="checked"
      :required="required"
      :disabled="disabled"
      @update:checked="rootContext.changeModelValue(value)"
      @select="emits('select', $event)"
      @keydown.enter.prevent
      @focus="handleFocus"
    >
      <slot />
    </Radio>
  </ARovingFocusItem>
</template>
