<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { toRefs } from 'vue';
import { useForwardExpose } from '../shared';
import { useNonce } from '../shared/use-nonce';
import { injectAComboboxRootContext } from './combobox-root.vue';

export interface AComboboxViewportProps extends APrimitiveProps {
  /**
   * Will add `nonce` attribute to the style tag which can be used by Content Security Policy. <br> If omitted, inherits globally from `AConfigProvider`.
   */
  nonce?: string;
}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

const props = defineProps<AComboboxViewportProps>();
const { forwardRef } = useForwardExpose();

const { nonce: propNonce } = toRefs(props);
const nonce = useNonce(propNonce);

const rootContext = injectAComboboxRootContext();
</script>

<template>
  <APrimitive
    v-bind="{ ...$attrs, ...props }"
    :ref="forwardRef"
    data-akar-combobox-viewport
    role="presentation"
    :style="{
      // we use position: 'relative' here on the `viewport` so that when we call
      // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
      // (independent of the scrollUpButton).
      position: 'relative',
      flex: rootContext.isVirtual.value ? undefined : 1,
      overflow: 'auto',
    }"
  >
    <slot />
  </APrimitive>
  <APrimitive
    as="style"
    :nonce="nonce"
  >
    /* Hide scrollbars cross-browser and enable momentum scroll for touch
    devices */ [data-akar-combobox-viewport] { scrollbar-width:none; -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch; }
    [data-akar-combobox-viewport]::-webkit-scrollbar { display: none; }
  </APrimitive>
</template>
