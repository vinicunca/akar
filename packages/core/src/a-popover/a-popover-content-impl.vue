<script lang="ts">
import { reactiveOmit } from '@vueuse/shared';

import type {
  ADismissableLayerEmits,
  ADismissableLayerProps,
} from '~~/a-dismissable-layer';
import type { AFocusScopeProps } from '~~/a-focus-scope';
import type { APopperContentProps } from '~~/a-popper';

export type APopoverContentImplEmits = {
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: Event];
  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  openAutoFocus: [event: Event];
} & ADismissableLayerEmits;

export interface APopoverContentImplProps
  extends APopperContentProps,
  ADismissableLayerProps {
  /**
   * Whether focus should be trapped within the `MenuContent`
   * @defaultValue false
   */
  trapFocus?: AFocusScopeProps['trapped'];
}
</script>

<script setup lang="ts">
import { ADismissableLayer } from '~~/a-dismissable-layer';
import { AFocusScope } from '~~/a-focus-scope';
import { APopperContent } from '~~/a-popper';
import { useFocusGuards, useForwardExpose, useForwardProps } from '~~/shared';

import { injectAPopoverRootContext } from './a-popover-root.vue';

const props = defineProps<APopoverContentImplProps>();
const emits = defineEmits<APopoverContentImplEmits>();

const forwarded = useForwardProps(
  reactiveOmit(
    props,
    'trapFocus',
    'disableOutsidePointerEvents',
  ),
);
const { forwardRef } = useForwardExpose();

const rootContext = injectAPopoverRootContext();

useFocusGuards();
</script>

<template>
  <AFocusScope
    as-child
    loop
    :trapped="trapFocus"
    @mount-auto-focus="emits('openAutoFocus', $event)"
    @unmount-auto-focus="emits('closeAutoFocus', $event)"
  >
    <ADismissableLayer
      as-child
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      @pointer-down-outside="emits('pointerDownOutside', $event)"
      @interact-outside="emits('interactOutside', $event)"
      @escape-key-down="emits('escapeKeyDown', $event)"
      @focus-outside="emits('focusOutside', $event)"
      @dismiss="rootContext.onOpenChange(false)"
    >
      <APopperContent
        v-bind="forwarded"
        :id="rootContext.contentId"
        :ref="forwardRef"
        :data-state="rootContext.open.value ? 'open' : 'closed'"
        :aria-labelledby="rootContext.triggerId"
        :style="{
          '--akar-popover-content-transform-origin':
            'var(--akar-popper-transform-origin)',
          '--akar-popover-content-available-width':
            'var(--akar-popper-available-width)',
          '--akar-popover-content-available-height':
            'var(--akar-popper-available-height)',
          '--akar-popover-trigger-width': 'var(--akar-popper-anchor-width)',
          '--akar-popover-trigger-height': 'var(--akar-popper-anchor-height)',
        }"
        role="dialog"
      >
        <slot />
      </APopperContent>
    </ADismissableLayer>
  </AFocusScope>
</template>
