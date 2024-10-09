<script lang="ts">
import { useId } from 'vue';

import type { AComboboxContentImplEmits, AComboboxContentImplProps } from './a-combobox-content-impl.vue';

export type AComboboxContentEmits = AComboboxContentImplEmits;
export interface AComboboxContentProps extends AComboboxContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '~~/a-presence';
import { useForwardExpose, useForwardPropsEmits } from '~~/shared';

import AComboboxContentImpl from './a-combobox-content-impl.vue';
import { injectAComboboxRootContext } from './a-combobox-root.vue';

const props = defineProps<AComboboxContentProps>();
const emits = defineEmits<AComboboxContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
const { forwardRef } = useForwardExpose();

const rootContext = injectAComboboxRootContext();

rootContext.contentId ||= useId();
</script>

<template>
  <APresence :present="forceMount || rootContext.open.value">
    <AComboboxContentImpl
      v-bind="{ ...forwarded, ...$attrs }"
      :ref="forwardRef"
    >
      <slot />
    </AComboboxContentImpl>
  </APresence>
</template>
