<script lang="ts">
import type {
  DismissableLayerEmits,
  DismissableLayerProps,
} from '~~/dismissable-layer';
import type { FocusScopeProps } from '~~/focus-scope';
import type { APopperContentProps } from '~~/popper';
import { reactiveOmit } from '@vueuse/shared';

export type PopoverContentImplEmits = DismissableLayerEmits & {
  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  openAutoFocus: [event: Event];
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: Event];
};

export interface PopoverContentImplProps
  extends APopperContentProps,
  DismissableLayerProps {
  /**
   * Whether focus should be trapped within the `AMenuContent`
   * @defaultValue false
   */
  trapFocus?: FocusScopeProps['trapped'];
}
</script>

<script setup lang="ts">
import { DismissableLayer } from '~~/dismissable-layer';
import { AFocusScope } from '~~/focus-scope';
import { APopperContent } from '~~/popper';
import { useFocusGuards, useForwardExpose, useForwardProps } from '~~/shared';
import { injectAPopoverRootContext } from './popover-root.vue';

const props = defineProps<PopoverContentImplProps>();
const emits = defineEmits<PopoverContentImplEmits>();

const forwarded = useForwardProps(reactiveOmit(props, 'trapFocus', 'disableOutsidePointerEvents'));
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
    <DismissableLayer
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
    </DismissableLayer>
  </AFocusScope>
</template>
