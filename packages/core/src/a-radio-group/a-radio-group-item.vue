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
import { isDeepEqual, isIncludedIn, KEY_CODES } from '@vinicunca/perkakas';
import { useEventListener } from '@vueuse/core';
import { computed, ref } from 'vue';

import { ARovingFocusItem } from '~~/a-roving-focus';
import { useForwardExpose } from '~~/shared';

import ARadio from './a-radio.vue';
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
const ARROW_KEYS = [KEY_CODES.ARROW_UP, KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_LEFT, KEY_CODES.ARROW_RIGHT];

useEventListener(
  'keydown',
  (event) => {
    if (isIncludedIn(event.key, ARROW_KEYS)) {
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
    <ARadio
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
    </ARadio>
  </ARovingFocusItem>
</template>
