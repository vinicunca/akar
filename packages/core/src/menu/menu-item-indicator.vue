<script lang="ts">
import type { Ref } from 'vue';
import type { APrimitiveProps } from '~~/primitive';
import type { CheckedState } from './utils';
import { createContext } from '~~/shared';

interface MenuItemIndicatorContext {
  modelValue: Ref<CheckedState>;
}

export interface AMenuItemIndicatorProps extends APrimitiveProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}

export const [injectMenuItemIndicatorContext, provideMenuItemIndicatorContext]
  = createContext<MenuItemIndicatorContext>(
    ['AMenuCheckboxItem', 'AMenuRadioItem'],
    'MenuItemIndicatorContext',
  );
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { APresence } from '~~/presence';
import { APrimitive } from '~~/primitive';
import { getCheckedState, isIndeterminate } from './utils';

withDefaults(defineProps<AMenuItemIndicatorProps>(), {
  as: 'span',
});

const indicatorContext = injectMenuItemIndicatorContext({
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
