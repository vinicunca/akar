<script lang="ts">
import type { ComboboxContentImplEmits, ComboboxContentImplProps } from './combobox-content-impl.vue';

export type AComboboxContentEmits = ComboboxContentImplEmits;
export interface AComboboxContentProps extends ComboboxContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '../presence';
import { useForwardExpose, useForwardPropsEmits, useId } from '../shared';
import ComboboxContentImpl from './combobox-content-impl.vue';
import { injectAComboboxRootContext } from './combobox-root.vue';

const props = defineProps<AComboboxContentProps>();
const emits = defineEmits<AComboboxContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
const { forwardRef } = useForwardExpose();

const rootContext = injectAComboboxRootContext();

rootContext.contentId ||= useId(undefined, 'akar-combobox-content');
</script>

<template>
  <APresence :present="forceMount || rootContext.open.value">
    <ComboboxContentImpl
      v-bind="{ ...forwarded, ...$attrs }"
      :ref="forwardRef"
    >
      <slot />
    </ComboboxContentImpl>
  </APresence>
</template>
