<script lang="ts">
import type { Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

import { createContext } from '~~/shared';

import type { CheckedState } from './utils';

interface AMenuItemIndicatorContext {
  modelValue: Ref<CheckedState>;
}

export interface AMenuItemIndicatorProps extends APrimitiveProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}

export const [
  injectAMenuItemIndicatorContext,
  provideAMenuItemIndicatorContext,
] = createContext<AMenuItemIndicatorContext>(
  ['AMenuCheckboxItem', 'AMenuRadioItem'],
  'AMenuItemIndicatorContext',
);
</script>

<script setup lang="ts">
import { ref } from 'vue';

import { APresence } from '~~/a-presence';
import { APrimitive } from '~~/a-primitive';

import { getCheckedState, isIndeterminate } from './utils';

withDefaults(defineProps<AMenuItemIndicatorProps>(), {
  as: 'span',
});

const indicatorContext = injectAMenuItemIndicatorContext({
  modelValue: ref(false),
});
</script>

<template>
  <APresence
    :present="
      forceMount
        || isIndeterminate(indicatorContext.modelValue.value)
        || indicatorContext.modelValue.value === true
    "
  >
    <APrimitive
      :as="as"
      :as-child="asChild"
      :data-state="getCheckedState(indicatorContext.modelValue.value)"
    >
      <slot />
    </APrimitive>
  </APresence>
</template>
